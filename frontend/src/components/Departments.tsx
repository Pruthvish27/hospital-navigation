import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { supabase } from "@/utils/supabaseClient"; // Import your Supabase client

// Import the default image
import defaultImage from "@/assets/doctor-cabin.jpg"; // Default image for all departments

type Department = {
  id: number;
  name: string;
};

type Doctor = {
  id: number;
  name: string;
  age: number;
  experience: string;
  department: number; // Department ID
  image: string; // Image path for each doctor
};

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<{
    title: string;
    info: string;
    doctors: Doctor[];
  } | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .range((page - 1) * 10, page * 10 - 1);

    if (error) {
      console.error("Error fetching departments:", error);
    } else {
      setDepartments(data || []);
    }
    setLoading(false);
  };

  const fetchDoctors = async (departmentId: number) => {
    setLoading(true); // Start loading
    console.log("Fetching doctors for department:", departmentId);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("department", departmentId);

    if (error) {
      console.error("Error fetching doctors:", error);
    } else {
      console.log("Fetched doctors:", data);
      setSelectedDept((prev) => ({
        ...prev!,
        doctors: data || [],
      }));
    }
    setLoading(false); // Stop loading
  };

  const showDetails = async (dept: Department) => {
    setSelectedDept({
      title: dept.name,
      info: `Information about ${dept.name} department.`, // You can fetch or set this info as needed
      doctors: [], // Initialize with empty array
    });
    await fetchDoctors(dept.id); // Fetch doctors after setting the department
  };

  const closeDetails = () => {
    setSelectedDept(null);
  };

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  useEffect(() => {
    fetchDepartments();
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] p-4 relative overflow-hidden"
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#2E8B57",
            },
            links: {
              color: "#2E8B57",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      <h1 className="text-5xl font-bold text-[#2E8B57] uppercase mb-8 text-center z-10">
        HOSPITAL DEPARTMENTS
      </h1>

      <div className="bg-white/10 backdrop-blur-md w-full max-w-[1200px] p-10 border-4 border-[#8FBC8F] rounded-2xl shadow-lg z-10">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-6">
            {departments.slice(0, 5).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Button
                  onClick={() => showDetails(dept)}
                  className="w-[400px] py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-2xl font-bold rounded-xl shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu transition-all duration-300"
                >
                  {dept.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {departments.slice(5, 10).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 5) * 0.1, duration: 0.5 }}
              >
                <Button
                  onClick={() => showDetails(dept)}
                  className="w-[400px] py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-2xl font-bold rounded-xl shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu transition-all duration-300"
                >
                  {dept.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 z-10 flex gap-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-8 py-4 bg-[#2E8B57] text-white text-xl font-bold rounded-xl hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-8 py-4 bg-[#2E8B57] text-white text-xl font-bold rounded-xl hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
          disabled={departments.length < 10}
        >
          Next
        </Button>
      </div>

      {/* Overlay with Blur Effect */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            className="fixed inset-0 bg-blue-500/30 backdrop-blur-sm z-40"
            onClick={closeDetails}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Details Box with Pop-Up Animation */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1200px] min-h-[600px] bg-white p-12 rounded-2xl border-4 border-[#8FBC8F] shadow-lg z-50 flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Side: Doctor's Cabin Image */}
            <div className="w-1/2 pr-8">
              <img
                src={defaultImage} // Use the default image for all departments
                alt="Doctor's Cabin"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Right Side: Doctor Details */}
            <div className="w-1/2 pl-8">
              <Button
                onClick={closeDetails}
                className="absolute top-6 right-6 bg-transparent text-black hover:bg-transparent"
              >
                ✖
              </Button>
              <h2 className="text-4xl font-bold text-[#2E8B57] mb-8">
                {selectedDept.title}
              </h2>
              <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                {selectedDept.info}
              </p>

              {/* Scrollable Doctor Details Box */}
              <div className="bg-[#F5FFFA] p-6 rounded-lg border-2 border-[#8FBC8F] max-h-[400px] overflow-y-auto">
                <h3 className="text-3xl font-bold text-[#2E8B57] mb-4">
                  Doctor Details
                </h3>
                {loading ? (
                  <p className="text-xl text-gray-700">Loading doctors...</p>
                ) : selectedDept.doctors.length === 0 ? (
                  <p className="text-xl text-gray-700">No doctors found for this department.</p>
                ) : (
                  <ul className="text-xl text-gray-700 space-y-2">
                    {selectedDept.doctors.map((doctor, index) => (
                      <li key={index}>
                        <p>👨‍⚕ <strong>Name:</strong> {doctor.name}</p>
                        <p>🎂 <strong>Age:</strong> {doctor.age}</p>
                        <p>🏥 <strong>Experience:</strong> {doctor.experience}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <div className="mt-8 z-10">
        <Button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-[#2E8B57] text-white text-xl font-bold rounded-xl hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Departments;