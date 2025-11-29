import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "../types/profile";
import { createOrUpdateProfile, getProfile, deleteProfile } from "../api/mockProfileApi";

const LOCAL_KEY = "profileData";

// Helpers for localStorage <-> state sync
function loadProfileFromLocalStorage(): Profile | null {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

function saveProfileToLocalStorage(profile: Profile | null) {
  if (!profile) {
    localStorage.removeItem(LOCAL_KEY);
  } else {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(profile));
  }
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: loadProfileFromLocalStorage(),
  loading: false,
  error: null,
};

// GET profile (from localStorage first, then API)
export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const local = loadProfileFromLocalStorage();
    if (local) {
      return local;
    }
    const profile = await getProfile();
    saveProfileToLocalStorage(profile);
    return profile;
  } catch (err: any) {
    if (err?.status === 404) {
      return rejectWithValue("Profile not found");
    }
    return rejectWithValue(err?.message || "Failed to fetch profile");
  }
});

// POST/PUT profile
export const saveProfile = createAsyncThunk<
  Profile,
  Profile,
  { rejectValue: string }
>("profile/saveProfile", async (profile, { rejectWithValue }) => {
  try {
    const saved = await createOrUpdateProfile(profile);
    saveProfileToLocalStorage(saved);
    return saved;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to save profile");
  }
});

// DELETE profile
export const removeProfile = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("profile/removeProfile", async (_, { rejectWithValue }) => {
  try {
    await deleteProfile();
    saveProfileToLocalStorage(null);
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to delete profile");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setProfileLocally(state, action: PayloadAction<Profile | null>) {
      state.data = action.payload;
      saveProfileToLocalStorage(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching profile";
      })
      // save
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error saving profile";
      })
      // delete
      .addCase(removeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProfile.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(removeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error deleting profile";
      });
  },
});

export const { clearError, setProfileLocally } = profileSlice.actions;

export default profileSlice.reducer;
