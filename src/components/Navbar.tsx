import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function Navbar() {
  const profile = useAppSelector((state) => state.profile.data);

  const profileFormLabel = profile ? "Edit Profile" : "Create Profile";
  const displayName = profile
    ? `${profile.firstName} ${profile.lastName ?? ""}`.trim()
    : "No Profile";

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Profile Manager
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" component={Link} to="/profile-form">
            {profileFormLabel}
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Typography variant="subtitle1">{displayName}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
