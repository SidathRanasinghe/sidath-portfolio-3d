import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

import TitleHeader from "@/components/TitleHeader";
import TechIconGridExperience from "@/components/models/tech-logos/TechIconGridExperience";
import { sectionConfigs, techStackIcons } from "@/constants";

const TechStack = () => {
  // Calculate responsive canvas height based on model count
  const canvasHeight = useMemo(() => {
    const modelCount = techStackIcons.length;
    const baseHeight = 400;
    const heightPerRow = 200;

    // Estimate rows based on typical responsive behavior
    let estimatedColumns = 4;
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) estimatedColumns = 2;
      else if (width < 1024) estimatedColumns = 3;
      else if (width < 1400) estimatedColumns = 4;
      else estimatedColumns = 5;
    }

    const rows = Math.ceil(modelCount / estimatedColumns);
    return Math.max(baseHeight, Math.min(800, baseHeight + (rows - 1) * heightPerRow));
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
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: "transparent" }}>
              <TechIconGridExperience
                models={techStackIcons}
                containerWidth={1200}
                containerHeight={canvasHeight}
              />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                maxDistance={20}
                minDistance={4}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Canvas>

            {/* Instructions overlay */}
            {/* <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex flex-col gap-1">
                <span>• Hover to highlight</span>
                <span>• Click to select and drag to rotate</span>
                <span>• Use mouse/touch to orbit around</span>
              </div>
            </div> */}

            {/* Selected model indicator */}
            {/* <div className="absolute top-4 right-4 text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-blue-400">Interactive 3D Tech Stack</span>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
