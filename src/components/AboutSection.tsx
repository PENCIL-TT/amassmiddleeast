import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const AboutSection: React.FC = () => {
  const location = useLocation();

  // Defensive fallback in case countryDetection returns null/undefined
  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (p: string) =>
    currentCountry?.code === "SG"
      ? p
      : `/${(currentCountry?.name ?? "Singapore")
          .toLowerCase()
          .replace(/\s+/g, "-")}${p}`;

  const [sectionData, setSectionData] = useState({
    aboutSectionTitle: "Who we are",
    aboutSectionP1: "Amass Middle East Shipping Services LLC, a Neutral LCL Consolidation Service Provider to serve the UAE market. Our office is in Oudh Mehta–Dubai and the CFS is in Jebel Ali.",
    aboutSectionP2: "We have expanded globally with branches in Saudi Arabia (Dammam, Riyadh, Jeddah) and bonded warehouses in Jeddah and Dammam. Our team of 40+ professionals brings decades of logistics expertise.",
    aboutSectionP3: "Amass China founded the CWN network with dedicated members worldwide, enabling our phenomenal growth over the last 9 years to become a leading regional consolidator.",
    aboutSectionVideo: "/hero6.mp4",
    aboutSectionPoster: "/hero6-poster.jpg"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_about_us");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSectionData(prev => ({
        ...prev,
        aboutSectionTitle: parsed.aboutSectionTitle || prev.aboutSectionTitle,
        aboutSectionP1: parsed.aboutSectionP1 || prev.aboutSectionP1,
        aboutSectionP2: parsed.aboutSectionP2 || prev.aboutSectionP2,
        aboutSectionP3: parsed.aboutSectionP3 || prev.aboutSectionP3,
        aboutSectionVideo: parsed.aboutSectionVideo || prev.aboutSectionVideo,
        aboutSectionPoster: parsed.aboutSectionPoster || prev.aboutSectionPoster,
      }));
    }
  }, []);

  // --- Video autoplay + visibility handling ---
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Try to kick off autoplay on mount (muted + playsInline required on iOS)
    const tryPlay = async () => {
      try {
        await el.play();
      } catch {
        // If browser blocks autoplay, we keep it muted & will try again when visible.
      }
    };
    tryPlay();

    // Pause when not visible, resume when visible
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!el) return;
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [sectionData.aboutSectionVideo]); // Reinitialize observer if video path changes

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              {sectionData.aboutSectionTitle}
            </h2>

            <p className="mt-5 text-slate-800">
              {sectionData.aboutSectionP1}
            </p>

            <p className="mt-4 text-slate-700">
              {sectionData.aboutSectionP2}
            </p>

            <p className="mt-4 text-slate-700">
              {sectionData.aboutSectionP3}
            </p>

            <div className="mt-6">
              <Link to={getNavLink("/about-us")}>
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">
                  Read More
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: video hero */}
          <div className="order-first lg:order-none">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-slate-100">
              <video
                key={sectionData.aboutSectionVideo} // Force remount if video source changes
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={sectionData.aboutSectionVideo}
                poster={sectionData.aboutSectionPoster}
                muted
                loop
                playsInline
                autoPlay
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
