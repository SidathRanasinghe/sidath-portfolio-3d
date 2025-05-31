import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { OrbitControls } from "@react-three/drei";
import SceneLighting from "./SceneLighting";
import { Programmer } from "./Programmer";

const ContactExperience = () => {
  const isTablet: boolean = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile: boolean = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas
      camera={{
        position: [-6, 4, 8],
        // rotation: [0.2, 0, 0],
        fov: 50,
      }}
      performance={{ min: 0.5 }}
      dpr={[1, 2]}
      shadows
    >
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={30}
        minDistance={1}
        maxPolarAngle={Math.PI / 1.1}
        minPolarAngle={Math.PI / 8}
        enableDamping={true}
        dampingFactor={0.05}
        target={[0, 0, 0]}
      />
      <SceneLighting />
      <group
        scale={isMobile || isTablet ? 0.4 : 0.6}
        position={isMobile || isTablet ? [0, -0.8, 0] : [0, -1.5, 0]}
      >
        <Programmer animationName="WORK" loop={true} />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
