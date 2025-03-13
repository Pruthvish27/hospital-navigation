import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Home from "./components/Home";
import Departments from "./components/Departments";
import ReportMapping from "./components/ReportMapping";
import RoomInfo from "./components/RoomInfo";
import AdminPage from "./components/Admin-page"; // Import the AdminPage component

function App() {
  const location = useLocation(); // Get the current location for AnimatePresence

  return (
    <AnimatePresence mode="wait"> {/* Wrap Routes with AnimatePresence */}
      <Routes location={location} key={location.pathname}> {/* Add key for route transitions */}
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/room_info" element={<RoomInfo />} />
        <Route path="/report_mapping" element={<ReportMapping />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Add Admin Page route */}
      </Routes>
    </AnimatePresence>
  );
}

// Wrap the App component with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;