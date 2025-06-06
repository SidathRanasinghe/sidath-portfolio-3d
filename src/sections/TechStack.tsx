import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

import TitleHeader from "@/components/TitleHeader";
import TechIconGridExperience from "@/components/models/tech-logos/TechIconGridExperience";
import { sectionConfigs, techStackIcons } from "@/constants";

const TechStack = () => {
  // Calculate responsive canvas height based on model count
  const canvasHeight = useMemo(() => {
    const modelCount = techStackIcons.length;
    const baseHeight = 500;
    const heightPerRow = 280; // Increased for virtual box layout

    // Estimate columns based on screen width
    let estimatedColumns = 4;
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 480) estimatedColumns = 1;
      else if (width < 640) estimatedColumns = 2;
      else if (width < 768) estimatedColumns = 3;
      else if (width < 1024) estimatedColumns = 3;
      else if (width < 1280) estimatedColumns = 4;
      else if (width < 1366) estimatedColumns = 4;
      else if (width < 1440) estimatedColumns = 4;
      else if (width < 1680) estimatedColumns = 5;
      else if (width < 1920) estimatedColumns = 6;
      else estimatedColumns = 6;
    }

    const rows = Math.ceil(modelCount / estimatedColumns);
    const calculatedHeight = Math.max(
      baseHeight,
      Math.min(1200, baseHeight + (rows - 1) * heightPerRow)
    );
    return calculatedHeight;
  }, []);

  // Animate the tech stack section
  useGSAP(() => {
    gsap.fromTo(
      ".tech-canvas-container",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <div id="skills" className="relative flex-center z-10 section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />

        {sectionConfigs.techStackIcons && (
          <div
            className="tech-canvas-container mt-32 w-full rounded-lg overflow-hidden card-border relative"
            style={{ height: `${canvasHeight}px` }}
          >
            <Canvas
              camera={{
                position: [0, 0, 15],
                fov: 45,
                near: 0.01,
                far: 1000,
              }}
              style={{ background: "transparent" }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <TechIconGridExperience
                models={techStackIcons}
                containerWidth={1200}
                containerHeight={canvasHeight}
              />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
