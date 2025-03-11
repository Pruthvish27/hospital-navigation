import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default Home;