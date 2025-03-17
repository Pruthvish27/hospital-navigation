import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from '@/utils/supabaseClient'; // Adjust the import path as necessary

const RoomInfo = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [floorRooms, setFloorRooms] = useState([]); // All rooms on the selected floor
  const [floors, setFloors] = useState([]); // All unique floors fetched from Supabase
  const navigate = useNavigate();

  // Fetch all unique floors from Supabase
  const fetchFloors = async () => {
    const { data: floorsData, error: floorsError } = await supabase
      .from('rooms')
      .select('floor')
      .order('floor', { ascending: true });

    if (floorsError) {
      console.error('Error fetching floors:', floorsError);
      alert('Failed to fetch floors.');
      return;
    }

    if (floorsData) {
      // Extract unique floors
      const uniqueFloors = [...new Set(floorsData.map((room) => room.floor))];
      setFloors(uniqueFloors);
    }
  };

  // Fetch all rooms on a specific floor
  const fetchFloorRooms = async (floor) => {
    const { data: floorRoomsData, error: floorRoomsError } = await supabase
      .from('rooms')
      .select('*')
      .eq('floor', floor);

    if (floorRoomsError) {
      console.error('Error fetching floor rooms:', floorRoomsError);
      alert('Failed to fetch floor rooms.');
      return;
    }

    if (floorRoomsData) {
      console.log('Fetched floor rooms:', floorRoomsData); // Debugging log
      setFloorRooms(floorRoomsData); // Set all rooms on the floor
    }
  };

  // Handle room search
  const handleSearch = async () => {
    if (!roomNumber) return;

    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_number', roomNumber)
      .single();

    if (roomError) {
      console.error('Error fetching room info:', roomError);
      alert('Failed to fetch room information.');
      return;
    }

    if (roomData) {
      setRoomInfo(roomData);
      setFloorRooms([]); // Clear floor rooms
      handleShowDetails(roomData.floor); // Show details for the floor
    } else {
      alert('Room not found.');
    }
  };

  // Handle floor click
  const handleFloorClick = async (floor) => {
    setSelectedFloor(floor);
    setRoomInfo(null); // Clear room info
    await fetchFloorRooms(floor); // Fetch rooms for the selected floor
    handleShowDetails(floor); // Show details for the floor
  };

  // Show details modal
  const handleShowDetails = (floor) => {
    setSelectedFloor(floor);
    setShowDetails(true);
    setIsAnimating(true);
    document.body.classList.add("overflow-hidden");
  };

  // Close details modal
  const handleCloseDetails = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowDetails(false);
      document.body.classList.remove("overflow-hidden");
    }, 300);
  };

  // Fetch floors on component mount
  useEffect(() => {
    fetchFloors();
  }, []);

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
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] p-4 transition-all duration-300 ${showDetails ? "backdrop-blur-lg" : ""}`}
    >
      <div className="bg-[#F5FFFA] w-full max-w-[700px] p-6 border-3 border-[#8FBC8F] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#2E8B57] text-center mb-4">
          Rooms Information
        </h2>

        <div className="flex flex-col items-center gap-3 mb-6">
          <label htmlFor="room-number" className="text-lg font-semibold">
            Enter Room No.:
          </label>
          <input
            type="text"
            id="room-number"
            placeholder="Enter room no."
            className="w-[60%] p-2 border-2 border-[#8FBC8F] rounded-lg text-lg"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <Button 
            onClick={handleSearch}
            className="px-5 py-2 bg-white text-[#2E8B57] text-lg font-bold border-2 border-[#2E8B57] rounded-lg hover:bg-[#3CB371] hover:text-white transition-all duration-300"
          >
            Search
          </Button>
        </div>

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
                    onClick={() => handleFloorClick(floor)}
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

      {showDetails && (
        <div
          className={`fixed inset-0 backdrop-blur-lg transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"} z-50`}
          onClick={handleCloseDetails}
        ></div>
      )}

      {showDetails && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-75"
          } w-[90%] max-w-[800px] h-[70vh] bg-[#F5FFFA] p-8 border-3 border-[#8FBC8F] rounded-xl shadow-lg z-50 overflow-y-auto`}
        >
          <Button
            onClick={handleCloseDetails}
            className="absolute top-4 right-4 bg-transparent text-black hover:bg-transparent"
          >
            ✖
          </Button>
          <h2 className="text-3xl font-bold text-[#2E8B57] mb-6 text-center">
            {selectedFloor} Floor Details
          </h2>
          {roomInfo && (
            <div className="text-lg text-gray-700 mb-6">
              <p><strong>Room Number:</strong> {roomInfo.room_number}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    roomInfo.available === 1 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {roomInfo.available === 1 ? "Room is Available" : "Room is Occupied"}
                </span>
              </p>
            </div>
          )}
          {!roomInfo && (
            <div className="text-lg text-gray-700">
              <h3 className="text-2xl font-bold text-[#2E8B57] mb-4">Rooms on {selectedFloor} Floor:</h3>
              <ul className="space-y-2">
                {floorRooms.map((room) => (
                  <li
                    key={room.room_number}
                    className={`p-2 rounded-lg ${
                      room.available === 1 ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <strong>Room Number:</strong> {room.room_number} |{" "}
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        room.available === 1 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {room.available === 1 ? "Room is Available" : "Room is Occupied"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

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