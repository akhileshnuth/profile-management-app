import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProfile, removeProfile, clearError } from "../store/profileSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useAppSelector((state) => state.profile);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleCreateProfile = () => {
    dispatch(clearError());
    navigate("/profile-form");
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    await dispatch(removeProfile());
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  if (loading && !data) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }} elevation={3}>
        <Typography variant="h5" mb={2}>
          Profile
        </Typography>

        {error && (
          <Alert
            severity={error.toLowerCase().includes("not found") ? "info" : "error"}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {!data && !loading && (
          <Stack spacing={2}>
            <Typography>No profile exists. Please create one.</Typography>
            <Button variant="contained" onClick={handleCreateProfile}>
              Create Profile
            </Button>
          </Stack>
        )}

        {data && (
          <Stack spacing={2}>
            <Typography>
              <strong>Name:</strong> {data.firstName} {data.lastName}
            </Typography>
            <Typography>
              <strong>Email:</strong> {data.email}
            </Typography>
            {data.age !== undefined && (
              <Typography>
                <strong>Age:</strong> {data.age}
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile-form")}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete Profile
              </Button>
            </Box>
          </Stack>
        )}

        {loading && data && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        <Dialog open={confirmOpen} onClose={handleCancelDelete}>
          <DialogTitle>Delete Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your profile? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
