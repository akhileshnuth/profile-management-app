import type { Profile } from "../types/profile";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const PROFILE_URL = `${API_BASE_URL}/profile`;
const LOCAL_KEY = "profileData";

// LocalStorage helpers
function saveToLocal(profile: Profile | null) {
  if (profile) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(LOCAL_KEY);
  }
}

function loadFromLocal(): Profile | null {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

/**
 * Get profile from API (json-server) with localStorage fallback.
 *
 * json-server example db.json:
 * {
 *   "profile": {
 *     "firstName": "Demo",
 *     "lastName": "User",
 *     "email": "demo@example.com",
 *     "age": 25
 *   }
 * }
 *
 * Run:
 * npx json-server --watch db.json --port 3001
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(PROFILE_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 404) {
      saveToLocal(null);
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = (await res.json()) as Profile;
    saveToLocal(data);
    return data;
  } catch (error) {
    // Fallback to localStorage if API fails
    return loadFromLocal();
  }
}

/**
 * Create or update profile using PUT on /profile.
 * json-server will replace the "profile" object.
 */
export async function createOrUpdateProfile(
  profile: Profile
): Promise<Profile> {
  try {
    const res = await fetch(PROFILE_URL, {
      method: "PUT", // PUT because we manage a single profile resource
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (!res.ok) {
      throw new Error("Failed to save profile");
    }

    const data = (await res.json()) as Profile;
    saveToLocal(data);
    return data;
  } catch (error) {
    // Still persist locally even if API fails
    saveToLocal(profile);
    return profile;
  }
}

/**
 * Delete profile from API and localStorage.
 */
export async function deleteProfile(): Promise<void> {
  try {
    const res = await fetch(PROFILE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok && res.status !== 404) {
      throw new Error("Failed to delete profile");
    }

    saveToLocal(null);
  } catch (error) {
    // At least clear local copy
    saveToLocal(null);
  }
}
