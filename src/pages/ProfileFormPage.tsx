import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveProfile, clearError } from "../store/profileSlice";
import type { Profile } from "../types/profile";

type FieldErrors = {
  firstName?: string;
  email?: string;
  age?: string;
};

export default function ProfileFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: existingProfile, loading, error } = useAppSelector(
    (state) => state.profile
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const isEditMode = !!existingProfile;

  // Prefill form if profile exists
  useEffect(() => {
    if (existingProfile) {
      setFirstName(existingProfile.firstName ?? "");
      setLastName(existingProfile.lastName ?? "");
      setEmail(existingProfile.email ?? "");
      setAge(
        existingProfile.age !== undefined && existingProfile.age !== null
          ? String(existingProfile.age)
          : ""
      );
    }
  }, [existingProfile]);

  // Clear redux error when typing
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [firstName, lastName, email, age, error, dispatch]);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required.";
    } else if (firstName.trim().length < 3) {
      errors.firstName = "First name must be at least 3 characters.";
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (age.trim() !== "") {
      const num = Number(age);
      if (Number.isNaN(num) || num <= 0) {
        errors.age = "Age must be a valid positive number.";
      }
    }

    setFieldErrors(errors);
    setFormMessage(null);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Profile = {
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      email: email.trim(),
      age: age.trim() ? Number(age) : undefined,
    };

    try {
      await dispatch(saveProfile(payload)).unwrap();
      setFormMessage(isEditMode ? "Profile updated successfully." : "Profile created successfully.");
      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    } catch (err) {
      setFormMessage("Something went wrong while saving the profile.");
    }
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
        }}
        elevation={3}
      >
        <Typography variant="h5" mb={2}>
          {isEditMode ? "Edit Profile" : "Create Profile"}
        </Typography>

        {formMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {formMessage}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
              error={!!fieldErrors.firstName}
              helperText={fieldErrors.firstName}
            />

            <TextField
              label="Last Name (optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />

            <TextField
              label="Age (optional)"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              error={!!fieldErrors.age}
              helperText={fieldErrors.age}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {isEditMode ? "Update Profile" : "Create Profile"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
