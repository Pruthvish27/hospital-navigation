import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RoomInfo = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("");
  const navigate = useNavigate();

  const handleShowDetails = (floor: string) => {
    setSelectedFloor(floor);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] p-4">
      {/* Container */}
      <div className="bg-[#F5FFFA] w-full max-w-[800px] p-8 border-3 border-[#8FBC8F] rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-4xl font-bold text-[#2E8B57] text-center mb-6">
          Rooms Information
        </h2>

        {/* Search Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <label htmlFor="room-number" className="text-xl font-semibold">
            Enter Room No.:
          </label>
          <input
            type="text"
            id="room-number"
            placeholder="Enter room no."
            className="w-[60%] p-2 border-2 border-[#8FBC8F] rounded-lg text-lg"
          />
          <Button className="px-6 py-3 bg-white text-[#2E8B57] text-lg font-bold border-2 border-[#2E8B57] rounded-lg hover:bg-[#3CB371] hover:text-white transition-all duration-300">
            Search
          </Button>
        </div>

        {/* Information Block */}
        <div className="bg-white border-3 border-[#8FBC8F] rounded-lg p-6 shadow-md">
          <h2 className="text-3xl font-bold text-[#2E8B57] underline mb-6">
            INFORMATION :-
          </h2>
          <div className="space-y-4">
            {["1st", "2nd", "3rd"].map((floor) => (
              <div
                key={floor}
                className="flex justify-between items-center p-4 border-b-2 border-[#2E8B57] hover:bg-[#E0F8E0] transition-all duration-300"
              >
                <span className="text-2xl">{floor} Floor</span>
                <Button
                  onClick={() => handleShowDetails(floor)}
                  className="px-6 py-2 bg-white text-[#2E8B57] text-lg font-bold border-2 border-[#2E8B57] rounded-lg hover:bg-[#3CB371] hover:text-white transition-all duration-300"
                >
                  Detail
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50"
          onClick={handleCloseDetails}
        ></div>
      )}

      {/* Details Box */}
      {showDetails && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-[#F5FFFA] p-8 border-3 border-[#8FBC8F] rounded-xl shadow-lg z-50">
          <Button
            onClick={handleCloseDetails}
            className="absolute top-4 right-4 bg-transparent text-black hover:bg-transparent"
          >
            ✖
          </Button>
          <h2 className="text-3xl font-bold text-[#2E8B57] mb-4">
            {selectedFloor} Floor Details
          </h2>
          <p className="text-xl text-gray-700">
            Details about {selectedFloor} floor...
          </p>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="mt-8">
        <Button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-[#2E8B57] text-white text-xl font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
};

export default RoomInfo;