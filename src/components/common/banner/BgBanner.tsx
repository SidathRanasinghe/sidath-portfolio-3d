import { Canvas } from "@react-three/fiber";
import RealisticStars from "./components/RealistcStars";
import BrightStars from "./components/BrightStars";
import DistantStars from "./components/DistantStars";
import RealisticGalaxy from "./components/RealisticGalaxy";
import OrbitingAsteroid from "./components/OrbitingAsteroid";
import { AsteroidSmall } from "@/components/models/asteroids/AsteroidSmall";

const RealisticSpaceScene = () => {
  return (
    <>
      {/* lighting */}
      <ambientLight intensity={0.02} />
      <directionalLight position={[10, 100, 5]} intensity={2} color="#7209b7" castShadow />
      <directionalLight position={[10, 100, 50]} intensity={2} color="#ffffff" castShadow />

      {/* star variants */}
      <RealisticStars count={2500} />
      <BrightStars count={2500} />
      <DistantStars count={2500} />

      {/* galaxies */}
      <RealisticGalaxy scale={0.3} />

      {/* orbiting asteroids using 3D models */}
      <OrbitingAsteroid
        center={[-28, 0, -90]}
        radiusX={52}
        radiusZ={72}
        speed={0.0005}
        baseSize={1}
        AsteroidComponent={AsteroidSmall}
      />
    </>
  );
};

const BgBanner = () => {
  return (
    <div className="fixed inset-0 h-screen w-full z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        style={{
          background: "radial-gradient(ellipse at center, #0d00a426 0%, #000000 50%, #000000 100%)",
        }}
      >
        <RealisticSpaceScene />
      </Canvas>
    </div>
  );
};

export default BgBanner;
