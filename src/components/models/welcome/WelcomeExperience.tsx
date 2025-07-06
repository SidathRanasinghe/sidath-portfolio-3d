import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import { ComputerDesk } from "./ComputerDesk";
import type * as THREE from "three";
import AutoRotationController from "./AutoRotationController";
import LightingController from "./LightingController";

const WelcomeExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  const config = useMemo(
    () => ({
      // Camera settings
      cameraPosition: [0, 0, 8] as [number, number, number],
      cameraTarget: [0, 0, 0] as [number, number, number],
      cameraFov: 50,

      // Controls
      enableZoom: true,
      maxDistance: 30,
      minDistance: 1,
      maxPolarAngle: Math.PI / 1.1,
      minPolarAngle: Math.PI / 8,

      // Responsive
      mobileScale: 0.8,
      isMobile,

      // ComputerDesk transform settings (responsive)
      deskPosition: (isMobile ? [0, -1, 0] : [0, -0.8, 0]) as [number, number, number],
      deskRotation: (isMobile ? [0, 0, 0] : [0, Math.PI / 12, 0]) as [number, number, number],
      deskScale: [1.5, 1.5, 1.5] as [number, number, number],

      // Auto rotation with floating (integrated)
      rotationSpeed: 0.001,
      floatAmplitude: 0.1,
      floatSpeed: 0.8,
      orbitRadius: 0.05,
      orbitSpeed: 0.1,

      // Timing
      pauseDuration: 3000,
      resetDuration: 2500,
    }),
    [isMobile]
  );

  return (
    <Canvas
      camera={{
        position: config.cameraPosition,
        fov: config.cameraFov,
      }}
      performance={{ min: 0.5 }}
      dpr={[1, 2]}
    >
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={config.enableZoom && !isTablet}
        maxDistance={config.maxDistance}
        minDistance={config.minDistance}
        maxPolarAngle={config.maxPolarAngle}
        minPolarAngle={config.minPolarAngle}
        target={config.cameraTarget}
        enableDamping={true}
        dampingFactor={0.05}
      />

      {/* Single integrated controller for both auto-rotation and floating */}
      <AutoRotationController
        groupRef={groupRef}
        controlsRef={controlsRef}
        isAutoRotating={isAutoRotating}
        isResetting={isResetting}
        setIsAutoRotating={setIsAutoRotating}
        setIsResetting={setIsResetting}
        config={{
          cameraPosition: config.cameraPosition,
          cameraTarget: config.cameraTarget,
          pauseDuration: config.pauseDuration,
          resetDuration: config.resetDuration,
          mobileScale: config.mobileScale,
          isMobile: config.isMobile,
          rotationSpeed: config.rotationSpeed,
          floatAmplitude: config.floatAmplitude,
          floatSpeed: config.floatSpeed,
          orbitRadius: config.orbitRadius,
          orbitSpeed: config.orbitSpeed,
          deskPosition: config.deskPosition,
          deskRotation: config.deskRotation,
          deskScale: config.deskScale,
        }}
      />

      <LightingController />

      <group ref={groupRef}>
        <group
          position={config.deskPosition}
          rotation={config.deskRotation}
          scale={config.deskScale}
        >
          <ComputerDesk />
        </group>
      </group>
    </Canvas>
  );
};

export default WelcomeExperience;
