import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons for navigation

const ReportMapping = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const pages = [
    {
      title: " Hematology",
      emoji: "🩸",
      items: [
        "Complete Blood Count (CBC)",
        "Hemoglobin (Hb)",
        "Erythrocyte Sedimentation Rate (ESR)",
      ],
    },
    {
      title: " Biochemistry",
      emoji: "🧪",
      items: [
        "Blood Sugar (Fasting & PP)",
        "Liver Function Test (LFT)",
        "Kidney Function Test (KFT)",
      ],
    },
    {
      title: " Microbiology",
      emoji: "🦠",
      items: ["Blood Culture", "Urine Culture", "Sputum Culture"],
    },
    {
      title: " Serology & Immunology",
      emoji: "🧬",
      items: ["HIV Test", "Hepatitis B & C", "C-Reactive Protein (CRP)"],
    },
    {
      title: " Pathology",
      emoji: "🔬",
      items: ["Urine Routine & Microscopy", "Stool Examination", "Biopsy"],
    },
    {
      title: " Radiology & Imaging",
      emoji: "📷",
      items: ["X-Ray", "Ultrasound (USG)", "CT Scan"],
    },
    {
      title: " Cardiology",
      emoji: "❤️",
      items: [
        "Electrocardiogram (ECG/EKG)",
        "2D Echocardiography (Echo)",
        "Treadmill Test (TMT)",
      ],
    },
    {
      title: " Endocrinology",
      emoji: "🧠",
      items: [
        "Thyroid Function Test (T3, T4, TSH)",
        "Insulin Test",
        "Parathyroid Hormone (PTH)",
      ],
    },
    {
      title: " Infectious Disease",
      emoji: "🦠",
      items: ["COVID-19 RT-PCR", "Dengue NS1 & IgM", "Malaria Parasite Test"],
    },
  ];

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Calculate the number of pages
  const itemsPerPage = 3;
  const totalPages = Math.ceil(pages.length / itemsPerPage);

  // Get the current page's blocks
  const currentBlocks = pages.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle navigation to the previous page
  const handlePrevious = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
      setIsLoading(false);
    }, 300); // Simulate a 300ms delay
  };

  // Handle navigation to the next page
  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
      setIsLoading(false);
    }, 300); // Simulate a 300ms delay
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] p-6"
    >
      <h1 className="text-6xl font-bold text-[#2E8B57] text-center mt-8">
        Hospital Test Categories
      </h1>

      {/* Main Container with Arrows Outside */}
      <div className="w-full max-w-[1400px] flex items-center justify-center gap-4 mt-12">
        {/* Left Navigation Button */}
        <Button
          onClick={handlePrevious}
          className={`bg-white/50 backdrop-blur-md text-[#2E8B57] p-3 rounded-full shadow-lg hover:bg-[#2E8B57] hover:text-white transition-all duration-300 ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Current Page Blocks */}
        <motion.div
          key={currentPage} // Add a key to trigger animations when the page changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          {currentBlocks.map((box, index) => (
            <motion.div
              key={index}
              variants={blockVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-[360px] min-w-[360px] h-[260px] p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-md border-3 border-[#8FBC8F] flex flex-col transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:skew-x-2 transform-gpu">
                <h3 className="text-2xl font-bold text-[#2E8B57] mb-4 flex items-center">
                  <span className="mr-2 text-3xl">{box.emoji}</span> {box.title}
                </h3>
                <ul className="list-none p-0">
                  {box.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-lg mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Navigation Button */}
        <Button
          onClick={handleNext}
          className={`bg-white/50 backdrop-blur-md text-[#2E8B57] p-3 rounded-full shadow-lg hover:bg-[#2E8B57] hover:text-white transition-all duration-300 ${
            currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Page Indicator */}
      <div className="mt-6 text-xl font-bold text-[#2E8B57]">
        Page {currentPage + 1} of {totalPages}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E8B57]"></div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="mt-12">
        <Button
          onClick={() => navigate("/")}
          className="px-12 py-5 bg-[#2E8B57] text-white text-2xl font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default ReportMapping;