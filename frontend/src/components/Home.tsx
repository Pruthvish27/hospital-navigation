import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showAddDataPopup, setShowAddDataPopup] = useState(false);
  const [showSeeDataPopup, setShowSeeDataPopup] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);

  const handleAddData = async () => {
    const response = await fetch("http://localhost:8000/api/test/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, number }),
    });
    const result = await response.json();
    alert(result.message);
    setShowAddDataPopup(false);
    setName("");
    setNumber("");
  };

  const handleSeeData = async () => {
    const response = await fetch("http://localhost:8000/api/test/get/");
    const result = await response.json();
    setData(result.entries);
    setShowSeeDataPopup(true);
  };

  return (
    <div className="min-h-screen flex justify-between items-center bg-white px-[10%]">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Test Database</h2>
            <Button
              onClick={() => setShowAddDataPopup(true)}
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

      {/* Popup for Add Data */}
      {showAddDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Add Data</h2>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              placeholder="Enter Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <Button
              onClick={handleAddData}
              className="bg-green-500 text-white px-4 py-2 m-2 rounded"
            >
              Submit
            </Button>
            <Button
              onClick={() => setShowAddDataPopup(false)}
              className="bg-red-500 text-white px-4 py-2 m-2 rounded"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Popup for See Data */}
      {showSeeDataPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Data Entries</h2>
            <ul>
              {data.map((entry, index) => (
                <li key={index} className="mb-2">
                  {entry.name} - {entry.number} - {new Date(entry.created_at).toLocaleString()}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => setShowSeeDataPopup(false)}
              className="bg-red-500 text-white px-4 py-2 m-2 rounded"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;