import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import RealisticStars from "./components/RealistcStars";
import DistantStars from "./components/DistantStars";
import OrbitingAsteroid from "./components/OrbitingAsteroid";
import { AsteroidSmall } from "./components/AsteroidSmall";
import BrightStars from "./components/BrightStars";

const RealisticSpaceScene = () => {
  return (
    <>
      {/* lighting */}
      <ambientLight intensity={0.02} />
      <directionalLight 
        position={[10, 100, 5]} 
        intensity={2} 
        color="#7209b7" 
        castShadow 
      />
      <directionalLight 
        position={[10, 100, 50]} 
        intensity={2} 
        color="#ffffff" 
        castShadow 
      />
      
      {/* star variants */}
      <RealisticStars count={2500} />
      <BrightStars count={2500} />
      <DistantStars count={2500} />
      
      {/* orbiting asteroids using 3D models */}
      <OrbitingAsteroid
        center={[0, 0, -52]}
        radiusX={52}
        radiusZ={42}
        speed={0.005}
        baseSize={1}
        AsteroidComponent={AsteroidSmall}
      />
    </>
  );
};

const BgBanner = () => {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        style={{
          background: "radial-gradient(ellipse at center, #0d00a426 0%, #000000 50%, #000000 100%)",
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Device pixel ratio for better performance
      >
        <Suspense fallback={null}>
          <RealisticSpaceScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BgBanner;