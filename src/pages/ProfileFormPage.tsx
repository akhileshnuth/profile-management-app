import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Profile } from "../types/profile";
import type { AppDispatch } from "../store/store";
import { saveProfile, clearError } from "../store/profileSlice";

export default function ProfileFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: existingProfile, loading, error } = useSelector(
    (state: any) => state.profile
  );

  const [firstName, setFirstName] = useState(existingProfile?.firstName || "");
  const [lastName, setLastName] = useState(existingProfile?.lastName || "");
  const [email, setEmail] = useState(existingProfile?.email || "");
  const [age, setAge] = useState(
    existingProfile?.age !== undefined ? String(existingProfile.age) : ""
  );

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormError(null);
    setSuccessMessage(null);
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch]);

  const validate = (): boolean => {
    if (!firstName.trim()) {
      setFormError("First name is required.");
      return false;
    }
    if (firstName.trim().length < 3) {
      setFormError("First name must be at least 3 characters.");
      return false;
    }
    if (!email.trim()) {
      setFormError("Email is required.");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    if (age.trim() !== "") {
      const num = Number(age);
      if (Number.isNaN(num) || num <= 0) {
        setFormError("Age must be a valid positive number.");
        return false;
      }
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Profile = {
      id: existingProfile?.id || uuidv4(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      age: age.trim() === "" ? undefined : Number(age.trim()),
    };

    const resultAction = await dispatch(saveProfile(payload));

    if (saveProfile.fulfilled.match(resultAction)) {
      setSuccessMessage("Profile saved successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } else {
      setFormError(
        (resultAction as any).payload || "Failed to save profile."
      );
    }
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, maxWidth: 500, width: "100%" }} elevation={3}>
        <Typography variant="h5" mb={2}>
          {existingProfile ? "Edit Profile" : "Create Profile"}
        </Typography>

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          {formError && <Alert severity="error">{formError}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && (
            <Alert severity="success">{successMessage}</Alert>
          )}

          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
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
          />
          <TextField
            label="Age (optional)"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {existingProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
