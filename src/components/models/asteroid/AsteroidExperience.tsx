import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { OrbitControls } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { AsteroidLarge } from "./AsteroidLarge";
import type { AutoRotationConfigs, CameraConfig, ControlsConfig, ResponsiveConfig } from "./types";
import AutoRotationController from "./AutoRotationController";
import { Officer } from "./Officer";

interface SceneConfig {
  asteroidScale: number;
  asteroidPosition: [number, number, number];
  outerModelScale: number;
  outerModelPosition: [number, number, number];
  outerModelRotation: [number, number, number];
}

interface SceneObjectsProps {
  config: SceneConfig;
  responsiveConfig: ResponsiveConfig;
  groupRef: RefObject<THREE.Group | null>;
}

const CONTROLS_CONFIG: ControlsConfig = {
  enablePan: false,
  enableZoom: true,
  maxDistance: 30,
  minDistance: 1,
  maxPolarAngle: Math.PI / 0.1,
  minPolarAngle: Math.PI / 8,
  enableDamping: true,
  dampingFactor: 0.05,
};

const INITIAL_CAMERA_CONFIG: CameraConfig = {
  position: [1.385, -1.641, -5.972],
  rotation: [2.873, 0.22, -3.082],
  fov: 50,
  target: [0, 0, 0],
  distance: 0,
};

const SCENE_CONFIG: SceneConfig = {
  asteroidScale: 1,
  asteroidPosition: [0, -2, 0], // [0, -1.5, 0],
  outerModelScale: 0.4,
  outerModelPosition: [0.25, -0.615, -0.7], // [0.25, -0.115, -0.7],
  outerModelRotation: [-0.4, 4, 0.115],
};

const AUTO_ROTATION_CONFIG: AutoRotationConfigs = {
  speed: 0.001, // Rotation speed
  pauseDuration: 3000, // Pause duration after user interaction (ms)
  resetDuration: 2000, // Duration for smooth reset animation (ms)
};

const SceneObjects = ({ config, responsiveConfig, groupRef }: SceneObjectsProps) => {
  const groupScale = responsiveConfig.isMobile ? responsiveConfig.mobileScale : 1;

  return (
    <group ref={groupRef} scale={groupScale} position={[0, 0, 0]}>
      {/* Officer setup on asteroid surface */}
      <group
        scale={config.outerModelScale}
        position={config.outerModelPosition}
        rotation={config.outerModelRotation}
        castShadow
        receiveShadow
      >
        <Officer
          animationSequence={[
            { name: "DEEP_SEE", duration: 17.23, fadeInTime: 0.5 },
            { name: "SHOOT", duration: 15.08, fadeInTime: 0.5 },
            { name: "RELAX", duration: 21.96, fadeInTime: 0.5 },
            { name: "IDEL", duration: 10.56, fadeInTime: 0.5 },
          ]}
          loop={true}
          // onSequenceComplete={() => console.log("Sequence completed!")}
          // onAnimationChange={(anim, index) => console.log(`Now playing: ${anim} (${index})`)}
        />
      </group>

      {/* Asteroid Surface */}
      <group scale={config.asteroidScale} position={config.asteroidPosition}>
        <AsteroidLarge />
      </group>
    </group>
  );
};

const SceneLighting = () => {
  return (
    <>
      {/* ============= ambient light for whole 3d model group ============= */}
      {/* dark blue */}
      <ambientLight intensity={0.5} color="#1a1a2e" />

      {/* ============= directional lights ============ */}
      {/* navy blue from left */}
      <directionalLight
        position={[10, 0, -0.5]}
        intensity={5}
        color="#003566"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      {/* amber from bottom */}
      <directionalLight
        position={[4.002, -9.93, 3.144]}
        intensity={1}
        color="#fff8dc"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      {/* ============= point lights ============ */}
      {/* amber */}
      <pointLight position={[0, 0, -1]} intensity={0.25} color="#fff8dc" />
      {/* cyan */}
      <pointLight position={[-2, -1, -2]} intensity={5} color="#00ffff" />
      {/* purple */}
      <pointLight position={[0, 1, -1]} intensity={10} color="#7209b7" />
      {/* deep blue */}
      <pointLight position={[2, 1, -2]} intensity={10} color="#0d00a4" />

      {/* ============= spot lights ============ */}
      {/* amber from top */}
      <spotLight
        position={[1.385, 0, -4]}
        angle={0.8}
        penumbra={0.5}
        intensity={10}
        color="#0d00a4"
        target-position={[0, 0, 0]}
        castShadow
      />
      {/* amber from bottom */}
      <spotLight
        position={[4.002, -9.93, 3.144]}
        angle={0.8}
        penumbra={0.5}
        intensity={10}
        color="#fff8dc"
        target-position={[0, 0, 0]}
        castShadow
      />
    </>
  );
};

const AsteroidExperience = () => {
  const isTablet: boolean = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile: boolean = useMediaQuery({ query: "(max-width: 768px)" });

  const groupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<any>(null);

  const responsiveConfig: ResponsiveConfig = {
    isMobile,
    isTablet,
    mobileScale: 0.8,
  };

  return (
    <Canvas
      camera={{
        position: INITIAL_CAMERA_CONFIG.position,
        fov: INITIAL_CAMERA_CONFIG.fov,
      }}
    >
      <OrbitControls
        ref={controlsRef}
        enablePan={CONTROLS_CONFIG.enablePan}
        enableZoom={CONTROLS_CONFIG.enableZoom && !isTablet}
        maxDistance={CONTROLS_CONFIG.maxDistance}
        minDistance={CONTROLS_CONFIG.minDistance}
        maxPolarAngle={CONTROLS_CONFIG.maxPolarAngle}
        minPolarAngle={CONTROLS_CONFIG.minPolarAngle}
        target={INITIAL_CAMERA_CONFIG.target}
        enableDamping={CONTROLS_CONFIG.enableDamping}
        dampingFactor={CONTROLS_CONFIG.dampingFactor}
      />

      <AutoRotationController
        groupRef={groupRef}
        controlsRef={controlsRef}
        responsiveConfig={responsiveConfig}
        autoRotationConfigs={AUTO_ROTATION_CONFIG}
        initialCameraConfigs={INITIAL_CAMERA_CONFIG}
      />

      <SceneLighting />
      <SceneObjects config={SCENE_CONFIG} responsiveConfig={responsiveConfig} groupRef={groupRef} />
    </Canvas>
  );
};

export default AsteroidExperience;
