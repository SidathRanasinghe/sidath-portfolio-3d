import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";

import TitleHeader from "@/components/TitleHeader";
import TechIconGridExperience, {
  VIRTUAL_BOX_CONFIG,
} from "@/components/models/tech-logos/TechIconGridExperience";
import { sectionConfigs, techStackIcons } from "@/constants";

// Centralized breakpoint and layout configuration
const LAYOUT_CONFIG = {
  breakpoints: {
    xs: 320, // Mobile Portrait
    sm: 480, // Mobile Landscape
    md: 640, // Small Tablet
    lg: 768, // Tablet Portrait
    xl: 1024, // Tablet Landscape / Small Desktop
    "2xl": 1280, // HD Ready
    "3xl": 1366, // Common Laptop
    "4xl": 1536, // Large Laptop
    "5xl": 1920, // Full HD - BASELINE
    "6xl": 2560, // 2K / QHD
    "7xl": 3840, // 4K / UHD
  },
  layouts: {
    xs: { columns: 2, cameraZ: 28, cameraFov: 55 },
    sm: { columns: 3, cameraZ: 30, cameraFov: 52 },
    md: { columns: 3, cameraZ: 40, cameraFov: 50 },
    lg: { columns: 4, cameraZ: 35, cameraFov: 48 },
    xl: { columns: 4, cameraZ: 42, cameraFov: 46 },
    "2xl": { columns: 5, cameraZ: 48, cameraFov: 44 },
    "3xl": { columns: 5, cameraZ: 52, cameraFov: 43 },
    "4xl": { columns: 6, cameraZ: 58, cameraFov: 42 },
    "5xl": { columns: 6, cameraZ: 65, cameraFov: 41 },
    "6xl": { columns: 7, cameraZ: 72, cameraFov: 40 },
    "7xl": { columns: 8, cameraZ: 80, cameraFov: 39 },
  },
};

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1920);

  // Measure actual container width
  useEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    // Initial measurement
    measureWidth();

    // Listen for resize events
    const resizeObserver = new ResizeObserver(measureWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate responsive canvas height based on virtual box dimensions
  const canvasConfig = useMemo(() => {
    const modelCount = techStackIcons.length;
    const actualWidth = containerWidth;

    // Determine layout based on actual container width with proper fallback
    let layout = LAYOUT_CONFIG.layouts["5xl"]; // default
    let breakpointKey = "5xl";

    // Use proper comparison logic for breakpoints
    for (const [key, breakpoint] of Object.entries(LAYOUT_CONFIG.breakpoints)) {
      if (actualWidth <= breakpoint) {
        layout = LAYOUT_CONFIG.layouts[key as keyof typeof LAYOUT_CONFIG.layouts];
        breakpointKey = key;
        break;
      }
    }

    // If container is larger than all breakpoints, use the largest
    if (actualWidth > LAYOUT_CONFIG.breakpoints["7xl"]) {
      layout = LAYOUT_CONFIG.layouts["7xl"];
      breakpointKey = "7xl";
    }

    const { columns, cameraZ, cameraFov } = layout;
    const rows = Math.ceil(modelCount / columns);

    // Get virtual box configuration for current breakpoint
    const virtualBoxConfig =
      VIRTUAL_BOX_CONFIG[breakpointKey as keyof typeof VIRTUAL_BOX_CONFIG] ||
      VIRTUAL_BOX_CONFIG["5xl"];
    const { height: virtualBoxHeight, spacingMultiplierY } = virtualBoxConfig;

    // Calculate 3D grid dimensions
    const spacingY = virtualBoxHeight * spacingMultiplierY;
    const totalGridHeight3D = (rows - 1) * spacingY + virtualBoxHeight;

    // Convert 3D units to screen pixels using camera projection
    const fovRadians = (cameraFov * Math.PI) / 180;
    const visibleHeight3D = 2 * Math.tan(fovRadians / 2) * cameraZ;
    const aspectRatio = actualWidth / Math.max(actualWidth * 0.6, 600); // Improved aspect ratio calculation
    const pixelsPerUnit3D = actualWidth / (visibleHeight3D * aspectRatio);

    // Calculate canvas height with proper padding
    const paddingY = { top: virtualBoxHeight * 0.6, bottom: virtualBoxHeight * 0.8 };
    const totalHeight3D = totalGridHeight3D + paddingY.top + paddingY.bottom;

    // Convert to screen pixels
    const calculatedHeight = Math.round(totalHeight3D * pixelsPerUnit3D);

    return {
      height: calculatedHeight,
      cameraZ,
      cameraFov,
      columns,
      rows,
      screenWidth: actualWidth,
      breakpoint: breakpointKey,
    };
  }, [containerWidth]);

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
      <div ref={containerRef} className="size-full px-5 md:px-10">
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
