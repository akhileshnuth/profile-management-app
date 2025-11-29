import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
      <Typography>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/profile")}>
        Go to Profile
      </Button>
    </Box>
  );
}
