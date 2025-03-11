import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Departments from "./components/Departments";
import ReportMapping from "./components/ReportMapping";
import RoomInfo from "./components/RoomInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/room_info" element={<RoomInfo />} />
        <Route path="/report_mapping" element={<ReportMapping />} />
      </Routes>
    </Router>
  );
}

export default App;