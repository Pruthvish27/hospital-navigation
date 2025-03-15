import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleThemeChange = () => {
    console.log("Theme changed");
  };

  const handleLanguageChange = () => {
    console.log("Language changed");
  };

  const handleAdminPage = () => {
    navigate("/admin"); // Navigate to the Admin Page
  };

  const handleDevOptions = () => {
    console.log("Dev options");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-between items-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] px-[10%] relative"
    >
      {/* Hospital Name */}
      <div className="text-6xl font-bold text-[#2E8B57] uppercase">
        HOSPITAL NAME
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-6">
        <Button
          onClick={() => navigate("/departments")}
          className="w-[400px] px-10 py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-3xl font-bold rounded-lg shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 transition-all duration-300"
        >
          Departments
        </Button>
        <Button
          onClick={() => navigate("/room_info")}
          className="w-[400px] px-10 py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-3xl font-bold rounded-lg shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 transition-all duration-300"
        >
          Rooms Information
        </Button>
        <Button
          onClick={() => navigate("/report_mapping")}
          className="w-[400px] px-10 py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-3xl font-bold rounded-lg shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 transition-all duration-300"
        >
          Report Mapping
        </Button>
      </div>

      {/* Settings Button */}
      <Button
        onClick={toggleSettings}
        className="fixed bottom-6 left-6 p-4 bg-[#2E8B57] text-white text-xl font-bold rounded-full shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
      >
        ⚙️
      </Button>

      {/* Settings Menu */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-6 bg-white p-6 rounded-lg shadow-lg border border-[#8FBC8F] z-50"
          >
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleThemeChange}
                className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Change Theme
              </Button>
              <Button
                onClick={handleLanguageChange}
                className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Change Language
              </Button>
              <Button
                onClick={handleAdminPage} // Navigates to the Admin Page
                className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Admin Page
              </Button>
              <Button
                onClick={handleDevOptions}
                className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
              >
                Dev Options
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;