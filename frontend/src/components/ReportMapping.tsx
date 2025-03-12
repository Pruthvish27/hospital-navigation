import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ReportMapping = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const pages = [
    {
      boxes: [
        {
          title: "🩸 Hematology",
          items: [
            "Complete Blood Count (CBC)",
            "Hemoglobin (Hb)",
            "Erythrocyte Sedimentation Rate (ESR)",
          ],
        },
        {
          title: "🧪 Biochemistry",
          items: [
            "Blood Sugar (Fasting & PP)",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)",
          ],
        },
        {
          title: "🦠 Microbiology",
          items: ["Blood Culture", "Urine Culture", "Sputum Culture"],
        },
      ],
    },
    {
      boxes: [
        {
          title: "🧬 Serology & Immunology",
          items: ["HIV Test", "Hepatitis B & C", "C-Reactive Protein (CRP)"],
        },
        {
          title: "🔬 Pathology",
          items: [
            "Urine Routine & Microscopy",
            "Stool Examination",
            "Biopsy",
          ],
        },
        {
          title: "📷 Radiology & Imaging",
          items: ["X-Ray", "Ultrasound (USG)", "CT Scan"],
        },
      ],
    },
    {
      boxes: [
        {
          title: "❤️ Cardiology",
          items: [
            "Electrocardiogram (ECG/EKG)",
            "2D Echocardiography (Echo)",
            "Treadmill Test (TMT)",
          ],
        },
        {
          title: "🧠 Endocrinology",
          items: [
            "Thyroid Function Test (T3, T4, TSH)",
            "Insulin Test",
            "Parathyroid Hormone (PTH)",
          ],
        },
        {
          title: "🦠 Infectious Disease",
          items: [
            "COVID-19 RT-PCR",
            "Dengue NS1 & IgM",
            "Malaria Parasite Test",
          ],
        },
      ],
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      {/* Hospital Name */}
      <h1 className="text-6xl font-bold text-[#2E8B57] text-center mt-8">
        Hospital Test Categories
      </h1>

      {/* Book Container */}
      <div className="w-full max-w-[1411px] relative flex justify-center items-center mt-24">
        {/* Previous Button */}
        <Button
          onClick={handlePrev}
          className={`absolute left-[-102px] top-1/2 transform -translate-y-1/2 bg-[#2E8B57] text-white rounded-full w-16 h-16 flex items-center justify-center ${
            currentPage === 0 ? "hidden" : "flex"
          }`}
        >
          <span className="text-3xl leading-none">‹</span>
        </Button>

        {/* Pages */}
        <div className="w-full flex justify-center">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`flex gap-12 ${currentPage === index ? "block" : "hidden"}`}
            >
              {page.boxes.map((box, boxIndex) => (
                <div
                  key={boxIndex}
                  className="w-[403px] min-w-[403px] h-[252px] p-7 bg-white rounded-2xl shadow-lg border-4 border-[#8FBC8F] flex flex-col justify-center transition-transform duration-300 hover:scale-105"
                >
                  <h3 className="text-3xl font-bold text-[#2E8B57] mb-5">
                    {box.title}
                  </h3>
                  <ul className="list-none p-0">
                    {box.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-xl mb-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          className={`absolute right-[-144px] top-1/2 transform -translate-y-1/2 bg-[#2E8B57] text-white rounded-full w-16 h-16 flex items-center justify-center ${
            currentPage === pages.length - 1 ? "hidden" : "flex"
          }`}
        >
          <span className="text-3xl leading-none">›</span>
        </Button>
      </div>

      {/* Back to Home Button */}
      <div className="mt-12">
        <Button
          onClick={() => navigate("/")}
          className="px-10 py-5 bg-[#2E8B57] text-white text-2xl font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ReportMapping;
