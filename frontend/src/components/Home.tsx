import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddData = async () => {
    const response = await fetch("http://localhost:8000/api/test/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Test Entry" }),
    });
    const data = await response.json();
    alert(data.message);
  };

  const handleSeeData = async () => {
    const response = await fetch("http://localhost:8000/api/test/get/");
    const data = await response.json();
    console.log(data);
    alert("Check console for data!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-between items-center bg-white px-[10%]"
    >
      {/* Hospital Name */}
      <div className="text-6xl font-bold text-[#2E8B57] uppercase">
        HOSPITAL NAME
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-5">
        <Button
          onClick={() => navigate("/departments")}
          className="w-[350px] px-8 py-6 bg-[#F5FFFA] text-[#556B2F] text-2xl font-bold rounded-lg shadow-md border-2 border-[#8FBC8F] transition-all duration-300 hover:bg-[#98FB98] hover:scale-105 hover:border-[#556B2F] text-center"
        >
          Departments
        </Button>
        <Button
          onClick={() => navigate("/room_info")}
          className="w-[350px] px-8 py-6 bg-[#F5FFFA] text-[#556B2F] text-2xl font-bold rounded-lg shadow-md border-2 border-[#8FBC8F] transition-all duration-300 hover:bg-[#98FB98] hover:scale-105 hover:border-[#556B2F] text-center"
        >
          Rooms Information
        </Button>
        <Button
          onClick={() => navigate("/report_mapping")}
          className="w-[350px] px-8 py-6 bg-[#F5FFFA] text-[#556B2F] text-2xl font-bold rounded-lg shadow-md border-2 border-[#8FBC8F] transition-all duration-300 hover:bg-[#98FB98] hover:scale-105 hover:border-[#556B2F] text-center"
        >
          Report Mapping
        </Button>

        {/* Test Button */}
        <Button
          onClick={() => setShowPopup(true)}
          className="w-[150px] px-4 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600"
        >
          Test
        </Button>
      </div>

      {/* Popup for Test */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Test Database</h2>
            <Button
              onClick={handleAddData}
              className="bg-green-500 text-white px-4 py-2 m-2 rounded"
            >
              Add Data
            </Button>
            <Button
              onClick={handleSeeData}
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
            >
              See Data
            </Button>
            <Button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white px-4 py-2 m-2 rounded"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;