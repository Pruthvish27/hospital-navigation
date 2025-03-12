import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ReportMapping = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      {/* Hospital Name */}
      <h1 className="text-6xl font-bold text-[#2E8B57] text-center mt-8">
        Hospital Test Categories
      </h1>

      {/* BIGGER SCROLLABLE CONTAINER */}
      <div className="w-full max-w-[1200px] h-[400px] bg-[#F5FFFA] p-10 border-4 border-[#8FBC8F] rounded-xl shadow-lg mt-12 overflow-x-auto whitespace-nowrap">
        {/* Flex container for horizontal scrolling */}
        <div className="flex space-x-6 w-max">
          {pages.map((box, index) => (
            <div
              key={index}
              className="w-[360px] min-w-[360px] h-[260px] p-6 bg-white rounded-2xl shadow-md border-3 border-[#8FBC8F] flex flex-col transition-transform duration-300 hover:scale-105"
            >
              {/* Category Title with Emoji */}
              <h3 className="text-3xl font-bold text-[#2E8B57] mb-4 flex items-center">
                <span className="mr-2 text-4xl">{box.emoji}</span> {box.title}
              </h3>
              <ul className="list-none p-0">
                {box.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-xl mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-12">
        <Button
          onClick={() => navigate("/")}
          className="px-12 py-5 bg-[#2E8B57] text-white text-2xl font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ReportMapping;