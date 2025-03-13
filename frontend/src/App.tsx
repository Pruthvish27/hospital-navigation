import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Departments from "./components/Departments";
import ReportMapping from "./components/ReportMapping";
import RoomInfo from "./components/RoomInfo";
import Database from "./pages/Database";

function App() {
  return (
    <Router>
<<<<<<< Updated upstream
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/room_info" element={<RoomInfo />} />
        <Route path="/report_mapping" element={<ReportMapping />} />
      </Routes>
=======
      <AnimatePresence mode="wait"> {/* Wrap Routes with AnimatePresence */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/room_info" element={<RoomInfo />} />
          <Route path="/report_mapping" element={<ReportMapping />} />
          <Route path="/database" element={<Database />} />
        </Routes>
      </AnimatePresence>
>>>>>>> Stashed changes
    </Router>
  );
}

export default App;