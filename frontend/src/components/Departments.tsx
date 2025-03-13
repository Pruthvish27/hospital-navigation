import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Import images for each department (replace with your actual image paths)
import pediatricsImage from "@/assets/doctor-cabin.jpg"; // Image for Pediatrics
import gynecologyImage from "@/assets/doctor-cabin.jpg"; // Image for Gynecology
import orthopedicsImage from "@/assets/doctor-cabin.jpg"; // Image for Orthopedics
import neurologyImage from "@/assets/doctor-cabin.jpg"; // Image for Neurology
import nephrologyImage from "@/assets/doctor-cabin.jpg"; // Image for Nephrology
import cardiologyImage from "@/assets/doctor-cabin.jpg"; // Image for Cardiology
import gastroenterologyImage from "@/assets/doctor-cabin.jpg"; // Image for Gastroenterology
import oncologyImage from "@/assets/doctor-cabin.jpg"; // Image for Oncology
import entImage from "@/assets/doctor-cabin.jpg"; // Image for ENT
import opdImage from "@/assets/doctor-cabin.jpg"; // Image for O.P.D

type DepartmentDetails = {
  Pediatrics: string;
  Gynecology: string;
  Orthopedics: string;
  Neurology: string;
  Nephrology: string;
  Cardiology: string;
  Gastroenterology: string;
  Oncology: string;
  "O.P.D": string;
  "Otolaryngology (ENT)": string;
};

type Doctor = {
  name: string;
  specialization: string;
  experience: string;
  contact: string;
  image: string; // Image path for each doctor
};

const Departments = () => {
  const [selectedDept, setSelectedDept] = useState<{
    title: string;
    info: string;
    doctors: Doctor[];
  } | null>(null);

  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  const navigate = useNavigate();

  const departmentDetails: DepartmentDetails = {
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

  const doctorsByDepartment: Record<string, Doctor[]> = {
    Pediatrics: [
      {
        name: "Dr. John Doe",
        specialization: "Pediatrics",
        experience: "10+ years",
        contact: "+123 456 7890",
        image: pediatricsImage,
      },
      {
        name: "Dr. Jane Smith",
        specialization: "Pediatrics",
        experience: "8+ years",
        contact: "+123 456 7891",
        image: pediatricsImage,
      },
      {
        name: "Dr. Emily Davis",
        specialization: "Pediatrics",
        experience: "12+ years",
        contact: "+123 456 7892",
        image: pediatricsImage,
      },
      {
        name: "Dr. Michael Brown",
        specialization: "Pediatrics",
        experience: "9+ years",
        contact: "+123 456 7893",
        image: pediatricsImage,
      },
    ],
    Gynecology: [
      {
        name: "Dr. Emily Johnson",
        specialization: "Gynecology",
        experience: "12+ years",
        contact: "+123 456 7892",
        image: gynecologyImage,
      },
      {
        name: "Dr. Sarah Wilson",
        specialization: "Gynecology",
        experience: "9+ years",
        contact: "+123 456 7894",
        image: gynecologyImage,
      },
      {
        name: "Dr. Laura Martinez",
        specialization: "Gynecology",
        experience: "7+ years",
        contact: "+123 456 7897",
        image: gynecologyImage,
      },
    ],
    Orthopedics: [
      {
        name: "Dr. Michael Brown",
        specialization: "Orthopedics",
        experience: "15+ years",
        contact: "+123 456 7893",
        image: orthopedicsImage,
      },
      {
        name: "Dr. David Lee",
        specialization: "Orthopedics",
        experience: "11+ years",
        contact: "+123 456 7895",
        image: orthopedicsImage,
      },
      {
        name: "Dr. Robert Taylor",
        specialization: "Orthopedics",
        experience: "14+ years",
        contact: "+123 456 7896",
        image: orthopedicsImage,
      },
    ],
    Neurology: [
      {
        name: "Dr. Sarah Wilson",
        specialization: "Neurology",
        experience: "9+ years",
        contact: "+123 456 7894",
        image: neurologyImage,
      },
      {
        name: "Dr. James Anderson",
        specialization: "Neurology",
        experience: "13+ years",
        contact: "+123 456 7898",
        image: neurologyImage,
      },
      {
        name: "Dr. Olivia Clark",
        specialization: "Neurology",
        experience: "10+ years",
        contact: "+123 456 7899",
        image: neurologyImage,
      },
    ],
    Nephrology: [
      {
        name: "Dr. David Lee",
        specialization: "Nephrology",
        experience: "11+ years",
        contact: "+123 456 7895",
        image: nephrologyImage,
      },
      {
        name: "Dr. William White",
        specialization: "Nephrology",
        experience: "16+ years",
        contact: "+123 456 7800",
        image: nephrologyImage,
      },
      {
        name: "Dr. Emily Davis",
        specialization: "Nephrology",
        experience: "12+ years",
        contact: "+123 456 7892",
        image: nephrologyImage,
      },
    ],
    Cardiology: [
      {
        name: "Dr. Robert Taylor",
        specialization: "Cardiology",
        experience: "14+ years",
        contact: "+123 456 7896",
        image: cardiologyImage,
      },
      {
        name: "Dr. John Doe",
        specialization: "Cardiology",
        experience: "10+ years",
        contact: "+123 456 7890",
        image: cardiologyImage,
      },
      {
        name: "Dr. Jane Smith",
        specialization: "Cardiology",
        experience: "8+ years",
        contact: "+123 456 7891",
        image: cardiologyImage,
      },
    ],
    Gastroenterology: [
      {
        name: "Dr. Laura Martinez",
        specialization: "Gastroenterology",
        experience: "7+ years",
        contact: "+123 456 7897",
        image: gastroenterologyImage,
      },
      {
        name: "Dr. Michael Brown",
        specialization: "Gastroenterology",
        experience: "15+ years",
        contact: "+123 456 7893",
        image: gastroenterologyImage,
      },
      {
        name: "Dr. Sarah Wilson",
        specialization: "Gastroenterology",
        experience: "9+ years",
        contact: "+123 456 7894",
        image: gastroenterologyImage,
      },
    ],
    Oncology: [
      {
        name: "Dr. James Anderson",
        specialization: "Oncology",
        experience: "13+ years",
        contact: "+123 456 7898",
        image: oncologyImage,
      },
      {
        name: "Dr. Olivia Clark",
        specialization: "Oncology",
        experience: "10+ years",
        contact: "+123 456 7899",
        image: oncologyImage,
      },
      {
        name: "Dr. William White",
        specialization: "Oncology",
        experience: "16+ years",
        contact: "+123 456 7800",
        image: oncologyImage,
      },
    ],
    "O.P.D": [
      {
        name: "Dr. Olivia Clark",
        specialization: "General Medicine",
        experience: "10+ years",
        contact: "+123 456 7899",
        image: opdImage,
      },
      {
        name: "Dr. John Doe",
        specialization: "General Medicine",
        experience: "10+ years",
        contact: "+123 456 7890",
        image: opdImage,
      },
      {
        name: "Dr. Jane Smith",
        specialization: "General Medicine",
        experience: "8+ years",
        contact: "+123 456 7891",
        image: opdImage,
      },
    ],
    "Otolaryngology (ENT)": [
      {
        name: "Dr. William White",
        specialization: "ENT",
        experience: "16+ years",
        contact: "+123 456 7800",
        image: entImage,
      },
      {
        name: "Dr. Emily Davis",
        specialization: "ENT",
        experience: "12+ years",
        contact: "+123 456 7892",
        image: entImage,
      },
      {
        name: "Dr. Michael Brown",
        specialization: "ENT",
        experience: "15+ years",
        contact: "+123 456 7893",
        image: entImage,
      },
    ],
  };

  const showDetails = (dept: keyof DepartmentDetails) => {
    setSelectedDept({
      title: dept,
      info: departmentDetails[dept],
      doctors: doctorsByDepartment[dept] || [],
    });
    setCurrentDoctorIndex(0); // Reset to the first doctor when a department is selected
  };

  const closeDetails = () => {
    setSelectedDept(null);
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  // Animation variants for the details box
  const detailsBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

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
            {["Pediatrics", "Gynecology", "Orthopedics", "Neurology", "Nephrology"].map((dept, index) => (
              <motion.div
                key={dept}
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Button
                  onClick={() => showDetails(dept as keyof DepartmentDetails)}
                  className="w-[400px] py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-2xl font-bold rounded-xl shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu transition-all duration-300"
                >
                  {dept}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {["Cardiology", "Gastroenterology", "Oncology", "O.P.D", "Otolaryngology (ENT)"].map((dept, index) => (
              <motion.div
                key={dept}
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: (index + 5) * 0.1, duration: 0.5 }}
              >
                <Button
                  onClick={() => showDetails(dept as keyof DepartmentDetails)}
                  className="w-[400px] py-8 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white text-2xl font-bold rounded-xl shadow-md hover:from-[#3CB371] hover:to-[#2E8B57] hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu transition-all duration-300"
                >
                  {dept}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
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
            variants={detailsBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Left Side: Doctor's Cabin Image */}
            <div className="w-1/2 pr-8">
              <img
                src={selectedDept.doctors[currentDoctorIndex].image}
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
                <ul className="text-xl text-gray-700 space-y-2">
                  {selectedDept.doctors.map((doctor, index) => (
                    <li key={index}>
                      <p>👨‍⚕️ <strong>Name:</strong> {doctor.name}</p>
                      <p>🏥 <strong>Specialization:</strong> {doctor.specialization}</p>
                      <p>📅 <strong>Experience:</strong> {doctor.experience}</p>
                      <p>📞 <strong>Contact:</strong> {doctor.contact}</p>
                    </li>
                  ))}
                </ul>
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