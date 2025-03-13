import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-between items-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] px-[10%]"
    >
      {/* Hospital Name */}
      <div className="text-6xl font-bold text-[#2E8B57] uppercase">
        HOSPITAL NAME
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-6"> {/* Increased gap between buttons */}
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
    </motion.div>
  );
};

export default Home;