import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileFormPage from "./pages/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "@mui/material";



function App() {
  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Routes>
          {/* Redirect root to /profile */}
          <Route path="/" element={<Navigate to="/profile" replace />} />

          {/* Main pages */}
          <Route path="/profile-form" element={<ProfileFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 page */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Any unknown route → /404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
