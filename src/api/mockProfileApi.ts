import type { Profile } from "../types/profile";

const MODE = import.meta.env.MODE;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Dev = use real HTTP (json-server)
// Prod or missing base URL = use local mock only
const useHttpApi = MODE === "development" && !!API_BASE_URL;

const PROFILE_URL = API_BASE_URL ? `${API_BASE_URL}/profile` : "";

// Common localStorage helpers
const LOCAL_KEY = "profileData";

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

function simulateDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ------------------------------------------------------------------
   HTTP IMPLEMENTATION (used in DEVELOPMENT with json-server)
   ------------------------------------------------------------------ */
async function httpGetProfile(): Promise<Profile | null> {
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
}

async function httpSaveProfile(profile: Profile): Promise<Profile> {
  const res = await fetch(PROFILE_URL, {
    method: "PUT", // single resource
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    throw new Error("Failed to save profile");
  }

  const data = (await res.json()) as Profile;
  saveToLocal(data);
  return data;
}

async function httpDeleteProfile(): Promise<void> {
  const res = await fetch(PROFILE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok && res.status !== 404) {
    throw new Error("Failed to delete profile");
  }

  saveToLocal(null);
}

/* ------------------------------------------------------------------
   LOCAL MOCK IMPLEMENTATION (used in PRODUCTION or no base URL)
   ------------------------------------------------------------------ */
async function localGetProfile(): Promise<Profile | null> {
  await simulateDelay();
  return loadFromLocal();
}

async function localSaveProfile(profile: Profile): Promise<Profile> {
  await simulateDelay();
  saveToLocal(profile);
  return profile;
}

async function localDeleteProfile(): Promise<void> {
  await simulateDelay();
  saveToLocal(null);
}

/* ------------------------------------------------------------------
   PUBLIC API (used by Redux thunks)
   ------------------------------------------------------------------ */

export async function getProfile(): Promise<Profile | null> {
  if (useHttpApi && PROFILE_URL) {
    try {
      return await httpGetProfile();
    } catch (error) {
      // fallback to local if server fails
      return loadFromLocal();
    }
  }

  // Production / no backend: use mock only
  return localGetProfile();
}

export async function createOrUpdateProfile(
  profile: Profile
): Promise<Profile> {
  if (useHttpApi && PROFILE_URL) {
    try {
      return await httpSaveProfile(profile);
    } catch (error) {
      // fallback to local if server fails
      saveToLocal(profile);
      return profile;
    }
  }

  // Production / no backend: use mock only
  return localSaveProfile(profile);
}

export async function deleteProfile(): Promise<void> {
  if (useHttpApi && PROFILE_URL) {
    try {
      await httpDeleteProfile();
      return;
    } catch (error) {
      // backend failed but we still clear local
      saveToLocal(null);
      return;
    }
  }

  // Production / no backend: use mock only
  return localDeleteProfile();
}
