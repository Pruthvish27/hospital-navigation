import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home";
import Departments from "./components/Departments";
import ReportMapping from "./components/ReportMapping";
import RoomInfo from "./components/RoomInfo";
import AdminPage from "./components/Admin-page";
import AdminLogin from "./components/AdminLogin";
import { useState } from "react"; // Add useState for authentication state

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/room_info" element={<RoomInfo />} />
        <Route path="/report_mapping" element={<ReportMapping />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? ( // Check if user is authenticated
              <AdminPage />
            ) : (
              <Navigate to="/admin/login" /> // Redirect to login if not authenticated
            )
          }
        />
        <Route
          path="/admin/login"
          element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated to AdminLogin
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
