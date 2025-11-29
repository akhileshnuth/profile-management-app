import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const profile = useSelector((state: any) => state.profile.data);

  // If profile exists -> Edit Profile, else -> Create Profile
  const profileFormLabel = profile ? "Edit Profile" : "Create Profile";

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App Title */}
        <Typography variant="h6" component="div">
          Profile Manager
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* Single button for create/edit form */}
          <Button color="inherit" component={Link} to="/profile-form">
            {profileFormLabel}
          </Button>

          {/* View profile page */}
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>

          {/* User Name from Redux */}
          <Typography variant="subtitle1">
            {profile ? `${profile.firstName} ${profile.lastName}` : "No Profile"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
