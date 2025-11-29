import type { Profile } from "../types/profile";

const PROFILE_KEY = "profileData";

// Read base URL from env (just for assignment requirement)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Randomly fail sometimes to test error handling (10% chance)
function maybeFail() {
  const shouldFail = Math.random() < 0.1;
  if (shouldFail) {
    throw new Error("Server error occurred");
  }
}

export async function createOrUpdateProfile(profile: Profile): Promise<Profile> {
  console.log("Using API base URL:", API_BASE_URL);

  await simulateDelay(500);
  maybeFail();

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export async function getProfile(): Promise<Profile> {
  await simulateDelay(500);
  maybeFail();

  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    const error: any = new Error("Profile not found");
    error.status = 404;
    throw error;
  }

  return JSON.parse(raw) as Profile;
}

export async function deleteProfile(): Promise<void> {
  await simulateDelay(300);
  maybeFail();

  localStorage.removeItem(PROFILE_KEY);
}
