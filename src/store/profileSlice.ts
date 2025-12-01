// src/store/profileSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "../types/profile";
import {
  createOrUpdateProfile,
  deleteProfile,
  getProfile,
} from "../api/mockProfileApi";

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

// Fetch profile (GET)
export const fetchProfile = createAsyncThunk<
  Profile | null,
  void,
  { rejectValue: string }
>("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const profile = await getProfile();
    return profile;
  } catch (error) {
    return rejectWithValue("Failed to fetch profile.");
  }
});

// Save profile (POST/PUT)
export const saveProfile = createAsyncThunk<
  Profile,
  Profile,
  { rejectValue: string }
>("profile/saveProfile", async (profile, { rejectWithValue }) => {
  try {
    const saved = await createOrUpdateProfile(profile);
    return saved;
  } catch (error) {
    return rejectWithValue("Failed to save profile.");
  }
});

// Delete profile (DELETE)
export const removeProfile = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("profile/removeProfile", async (_, { rejectWithValue }) => {
  try {
    await deleteProfile();
  } catch (error) {
    return rejectWithValue("Failed to delete profile.");
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile | null>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading profile.";
      });

    // Save
    builder
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error saving profile.";
      });

    // Delete
    builder
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
        state.error = action.payload || "Error deleting profile.";
      });
  },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;
