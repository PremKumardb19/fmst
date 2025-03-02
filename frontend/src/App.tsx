import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfileForm from "./pages/ProfilePage";
import RelationshipPage from "./pages/RelationshipPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/relationships" element={<RelationshipPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;