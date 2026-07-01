import React, { useEffect, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

/* simple count-up hook */
function useCountUp(end: number, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

const StatsSection: React.FC = () => {
  const [sectionData, setSectionData] = useState({
    titlePrefix: "NO.1",
    titleText: "Domestic LCL Market Undisputed Leader",
    backgroundImage: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png",
    stats: [
      { label: "Countries & Regions", value: 200 },
      { label: "Weekly Direct Service", value: 1000 },
      { label: "Cubic Meters Export", value: 3000000 },
      { label: "Branches & Offices", value: 84 },
      { label: "Destinations", value: 20000 },
      { label: "Shipments / Year", value: 555000 }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_stats_section");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSectionData(prev => ({
        ...prev,
        ...parsed,
        backgroundImage: parsed.backgroundImage || "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
      }));
    }
  }, []);

  return (
    <section className="relative py-10 md:py-14">
      {/* Background image with dark gradient overlay (softer) */}
      <div className="absolute inset-0 z-0">
        <img src={sectionData.backgroundImage} alt="Logistics Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-kargon-dark/70 via-kargon-dark/70 to-kargon-dark/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Smaller responsive title */}
        <h2 className="
            mx-auto mb-6 md:mb-8 text-center font-extrabold leading-tight text-white
            text-[clamp(1.25rem,3vw,2rem)]
          ">
          <span className="opacity-90">{sectionData.titlePrefix}</span>{" "}
          <span className="text-kargon-red">
            {sectionData.titleText}
          </span>
        </h2>

        {/* 1 × 6 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {sectionData.stats.map((item, idx) => {
            const count = useCountUp(item.value);
            return (
              <ScrollAnimation key={idx} delay={idx * 100} className="
                rounded-2xl border border-white/10 bg-white/12 backdrop-blur
                shadow-[0_6px_20px_rgba(0,0,0,.15)] p-4 md:p-5 text-center
                hover:bg-white/16 transition
              ">
                {/* number */}
                <div className="
                  tabular-nums font-extrabold text-white mb-1
                  text-2xl sm:text-3xl lg:text-4xl
                ">
                  {count.toLocaleString()}
                </div>
                {/* label */}
                <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/85 leading-snug">
                  {item.label}
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;