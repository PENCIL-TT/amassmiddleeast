// src/pages/DmaCharges.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// PDF must be at: public/DMA_Charges.pdf
const PDF_PATH = "/DMA_Charges.pdf";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const DmaCharges: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Navigation />

      {/* Make PDF big: full width, tall height, no top padding */}
      <main className="flex-1">
        <div className="w-full h-[calc(100vh-150px)]">
          <iframe
            src={PDF_PATH}
            title="DMA Charges"
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        <div className="mt-2 text-center">
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Open DMA Charges PDF in a new tab
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DmaCharges;
