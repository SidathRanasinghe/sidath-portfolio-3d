import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

import TitleHeader from "@/components/TitleHeader";
import TechIconGridExperience from "@/components/models/tech-logos/TechIconGridExperience";
import { sectionConfigs, techStackIcons } from "@/constants";

// Centralized breakpoint and layout configuration - Optimized based on 5xl baseline
const LAYOUT_CONFIG = {
  breakpoints: {
    xs: 320, // Mobile Portrait
    sm: 480, // Mobile Landscape
    md: 640, // Small Tablet
    lg: 768, // Tablet Portrait
    xl: 1024, // Tablet Landscape / Small Desktop
    "2xl": 1280, // HD Ready (720p equivalent)
    "3xl": 1366, // Common Laptop
    "4xl": 1536, // Large Laptop
    "5xl": 1920, // Full HD (1080p) - BASELINE
    "6xl": 2560, // 2K / QHD
    "7xl": 3840, // 4K / UHD
  },
  layouts: {
    xs: { columns: 1, cameraZ: 25, cameraFov: 50, heightMultiplier: 1 },
    sm: { columns: 2, cameraZ: 40, cameraFov: 47, heightMultiplier: 0.75 },
    md: { columns: 3, cameraZ: 45, cameraFov: 45, heightMultiplier: 0.75 },
    lg: { columns: 3, cameraZ: 50, cameraFov: 43, heightMultiplier: 1 },
    xl: { columns: 4, cameraZ: 55, cameraFov: 42, heightMultiplier: 1.25 },
    "2xl": { columns: 4, cameraZ: 60, cameraFov: 41, heightMultiplier: 1.2 },
    "3xl": { columns: 5, cameraZ: 60, cameraFov: 40, heightMultiplier: 1 },
    "4xl": { columns: 5, cameraZ: 70, cameraFov: 40, heightMultiplier: 1.25 },
    "5xl": { columns: 6, cameraZ: 50, cameraFov: 40, heightMultiplier: 1.4 },
    "6xl": { columns: 7, cameraZ: 70, cameraFov: 40, heightMultiplier: 1.87 },
    "7xl": { columns: 8, cameraZ: 90, cameraFov: 40, heightMultiplier: 2.8 },
  },
};

const TechStack = () => {
  // Calculate responsive canvas height and camera settings based on model count
  const canvasConfig = useMemo(() => {
    const modelCount = techStackIcons.length;

    // Get current screen width
    let screenWidth = 1920;
    if (typeof window !== "undefined") {
      screenWidth = window.innerWidth;
    }

    console.log("Screen Width:", screenWidth);

    // Determine layout based on screen width
    let layout = LAYOUT_CONFIG.layouts["5xl"]; // default
    let breakpointKey = "5xl";

    if (screenWidth <= LAYOUT_CONFIG.breakpoints.xs) {
      layout = LAYOUT_CONFIG.layouts.xs;
      breakpointKey = "xs";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints.sm) {
      layout = LAYOUT_CONFIG.layouts.sm;
      breakpointKey = "sm";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints.md) {
      layout = LAYOUT_CONFIG.layouts.md;
      breakpointKey = "md";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints.lg) {
      layout = LAYOUT_CONFIG.layouts.lg;
      breakpointKey = "lg";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints.xl) {
      layout = LAYOUT_CONFIG.layouts.xl;
      breakpointKey = "xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["2xl"]) {
      layout = LAYOUT_CONFIG.layouts["2xl"];
      breakpointKey = "2xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["3xl"]) {
      layout = LAYOUT_CONFIG.layouts["3xl"];
      breakpointKey = "3xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["4xl"]) {
      layout = LAYOUT_CONFIG.layouts["4xl"];
      breakpointKey = "4xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["5xl"]) {
      layout = LAYOUT_CONFIG.layouts["5xl"];
      breakpointKey = "5xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["6xl"]) {
      layout = LAYOUT_CONFIG.layouts["6xl"];
      breakpointKey = "6xl";
    } else if (screenWidth <= LAYOUT_CONFIG.breakpoints["7xl"]) {
      layout = LAYOUT_CONFIG.layouts["7xl"];
      breakpointKey = "7xl";
    } else {
      layout = LAYOUT_CONFIG.layouts["7xl"];
      breakpointKey = "7xl";
    }

    const { columns, cameraZ, cameraFov, heightMultiplier } = layout;
    const rows = Math.ceil(modelCount / columns);

    // Calculate responsive height based on rows and screen size
    const baseHeight = 400;
    const rowHeight = screenWidth < 768 ? 180 : 200;
    const calculatedHeight = Math.max(
      baseHeight,
      Math.min(1000, baseHeight + (rows - 1) * rowHeight * heightMultiplier)
    );

    return {
      height: calculatedHeight,
      cameraZ,
      cameraFov,
      columns,
      rows,
      screenWidth,
      breakpoint: breakpointKey,
    };
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
    <div id="skills" className="flex-center section-padding relative z-10">
      <div className="h-full w-full px-5 md:px-10">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />

        {sectionConfigs.techStackIcons && (
          <div
            className="tech-canvas-container card-border relative mt-32 w-full overflow-hidden rounded-lg !bg-transparent backdrop-blur-sm"
            style={{ height: `${canvasConfig.height}px` }}
          >
            <Canvas
              camera={{
                position: [0, 0, canvasConfig.cameraZ],
                fov: canvasConfig.cameraFov,
                near: 0.01,
                far: 1000,
              }}
              style={{ background: "transparent", cursor: "grab" }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <TechIconGridExperience
                models={techStackIcons}
                containerWidth={1200}
                containerHeight={canvasConfig.height}
                fixedCameraZ={canvasConfig.cameraZ}
                screenWidth={canvasConfig.screenWidth}
                breakpoint={canvasConfig.breakpoint}
                columns={canvasConfig.columns}
                rows={canvasConfig.rows}
              />
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
