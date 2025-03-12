import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RoomInfo = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleShowDetails = (floor: string) => {
    setSelectedFloor(floor);
    setShowDetails(true);
    setIsAnimating(true);
    document.body.classList.add("overflow-hidden"); // Prevents scrolling
  };

  const handleCloseDetails = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowDetails(false);
      document.body.classList.remove("overflow-hidden"); // Allows scrolling
    }, 300); // Matches animation duration
  };

  useEffect(() => {
    if (showDetails) {
      setIsAnimating(true);
    }
  }, [showDetails]);

  const floors = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

  // Animation variants for the floor blocks
  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] p-4 transition-all duration-300 ${showDetails ? "backdrop-blur-lg" : ""}`}
    >
      {/* Smaller Container */}
      <div className="bg-[#F5FFFA] w-full max-w-[700px] p-6 border-3 border-[#8FBC8F] rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#2E8B57] text-center mb-4">
          Rooms Information
        </h2>

        {/* Search Section */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <label htmlFor="room-number" className="text-lg font-semibold">
            Enter Room No.:
          </label>
          <input
            type="text"
            id="room-number"
            placeholder="Enter room no."
            className="w-[60%] p-2 border-2 border-[#8FBC8F] rounded-lg text-lg"
          />
          <Button className="px-5 py-2 bg-white text-[#2E8B57] text-lg font-bold border-2 border-[#2E8B57] rounded-lg hover:bg-[#3CB371] hover:text-white transition-all duration-300">
            Search
          </Button>
        </div>

        {/* Scrollable Information Box (Vertical Scroll) */}
        <div className="bg-white border-3 border-[#8FBC8F] rounded-lg p-4 shadow-md max-h-[350px] overflow-y-auto">
          <h2 className="text-2xl font-bold text-[#2E8B57] underline mb-3">
            INFORMATION :-
          </h2>
          <div className="space-y-3">
            {floors.map((floor, index) => (
              <motion.div
                key={floor}
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex justify-between items-center p-3 border-b-2 border-[#2E8B57] hover:bg-[#E0F8E0] transition-all duration-300">
                  <span className="text-xl">{floor} Floor</span>
                  <Button
                    onClick={() => handleShowDetails(floor)}
                    className="px-5 py-2 bg-white text-[#2E8B57] text-lg font-bold border-2 border-[#2E8B57] rounded-lg hover:bg-[#3CB371] hover:text-white transition-all duration-300"
                  >
                    Detail
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Blurred Background Effect */}
      {showDetails && (
        <div
          className={`fixed inset-0 backdrop-blur-lg transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"} z-50`}
          onClick={handleCloseDetails}
        ></div>
      )}

      {/* Details Box - Centered with Pop-Up Animation */}
      {showDetails && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-75"
          } w-[90%] max-w-[800px] h-[70vh] bg-[#F5FFFA] p-8 border-3 border-[#8FBC8F] rounded-xl shadow-lg z-50 overflow-y-auto`}
        >
          {/* Close Button */}
          <Button
            onClick={handleCloseDetails}
            className="absolute top-4 right-4 bg-transparent text-black hover:bg-transparent"
          >
            ✖
          </Button>
          <h2 className="text-3xl font-bold text-[#2E8B57] mb-6 text-center">
            {selectedFloor} Floor Details
          </h2>
          <p className="text-lg text-gray-700 text-center">
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
    </motion.div>
  );
};

export default RoomInfo;