import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [selectedDept, setSelectedDept] = useState<{
    title: string;
    info: string;
  } | null>(null);

  const navigate = useNavigate();

  const departmentDetails = {
    Pediatrics: "Pediatrics focuses on medical care for infants, children, and adolescents.",
    Gynecology: "Gynecology is dedicated to women's reproductive health and care.",
    Orthopedics: "Orthopedics deals with bones, joints, and muscles.",
    Neurology: "Neurology focuses on disorders of the nervous system.",
    Nephrology: "Nephrology deals with kidney-related disorders.",
    Cardiology: "Cardiology specializes in heart diseases and conditions.",
    Gastroenterology: "Gastroenterology deals with the digestive system and its disorders.",
    Oncology: "Oncology focuses on the treatment of cancer.",
    "O.P.D": "Outpatient Department (O.P.D) handles general medical consultations.",
    "Otolaryngology (ENT)": "ENT focuses on ear, nose, and throat conditions.",
  };

  const showDetails = (dept: string) => {
    setSelectedDept({ title: dept, info: departmentDetails[dept] });
  };

  const closeDetails = () => {
    setSelectedDept(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8] p-4">
      {/* Hospital Name */}
      <h1 className="text-5xl font-bold text-[#2E8B57] uppercase mb-8 text-center">
        HOSPITAL DEPARTMENTS
      </h1>

      {/* Department Container */}
      <div className="bg-[#F5FFFA] w-full max-w-[900px] p-10 border-4 border-[#8FBC8F] rounded-2xl shadow-lg">
        <div className="flex justify-between gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {["Pediatrics", "Gynecology", "Orthopedics", "Neurology", "Nephrology"].map((dept) => (
              <Button
                key={dept}
                onClick={() => showDetails(dept)}
                className="w-[300px] py-6 bg-white text-[#2E8B57] text-xl font-bold rounded-xl shadow-md border-3 border-[#8FBC8F] hover:bg-[#98FB98] hover:scale-105 hover:text-[#556B2F] transition-all duration-300"
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {["Cardiology", "Gastroenterology", "Oncology", "O.P.D", "Otolaryngology (ENT)"].map((dept) => (
              <Button
                key={dept}
                onClick={() => showDetails(dept)}
                className="w-[300px] py-6 bg-white text-[#2E8B57] text-xl font-bold rounded-xl shadow-md border-3 border-[#8FBC8F] hover:bg-[#98FB98] hover:scale-105 hover:text-[#556B2F] transition-all duration-300"
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay (Fixed: Changed to blue tint) */}
      {selectedDept && (
        <div
          className="fixed inset-0 bg-blue-500 bg-opacity-30 backdrop-blur-sm z-50"
          onClick={closeDetails}
        ></div>
      )}

      {/* Details Box */}
      {selectedDept && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1000px] min-h-[400px] bg-[#F5FFFA] p-10 rounded-2xl border-4 border-[#8FBC8F] shadow-lg z-50">
          <Button
            onClick={closeDetails}
            className="absolute top-3 right-3 bg-transparent text-black hover:bg-transparent"
          >
            ✖
          </Button>
          <h2 className="text-3xl font-bold text-[#2E8B57] mb-6">
            {selectedDept.title}
          </h2>
          <p className="text-xl text-gray-700">{selectedDept.info}</p>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="mt-8">
        <Button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-[#2E8B57] text-white text-xl font-bold rounded-xl hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Departments;
 