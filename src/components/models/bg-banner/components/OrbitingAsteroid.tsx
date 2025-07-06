import { useFrame } from "@react-three/fiber";
import React from "react";
import type * as THREE from "three";

const OrbitingAsteroid = ({
  center,
  radiusX,
  radiusZ,
  speed,
  baseSize,
  AsteroidComponent,
  followingLight,
  subtleFillLight,
}: {
  center: [number, number, number];
  radiusX: number;
  radiusZ: number;
  speed: number;
  baseSize: number;
  AsteroidComponent: React.ComponentType;
  followingLight?: { color: string; intensity: number };
  subtleFillLight?: { color: string; intensity: number };
}) => {
  const ref = React.useRef<THREE.Group>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const [angle, setAngle] = React.useState(Math.random() * Math.PI * 10);

  useFrame(() => {
    if (!ref.current) return;

    const newAngle = angle + speed;
    setAngle(newAngle);

    // Calculate elliptical position
    const x = center[0] + Math.cos(newAngle) * radiusX;
    const y = center[1] + Math.sin(newAngle * 0.3) * 7; // Slight vertical oscillation
    const z = center[2] + Math.sin(newAngle) * radiusZ;

    ref.current.position.set(x, y, z);

    // Scale based on z-depth (distance from camera)
    const distanceFromCamera = Math.abs(z - 10); // Camera is at z=10
    const scale = Math.max(0.1, baseSize * (50 / Math.max(distanceFromCamera, 20)));
    ref.current.scale.setScalar(scale);

    // Rotate the asteroid realistically
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.012;
    ref.current.rotation.z += 0.005;

    // Update lighting intensity based on distance
    if (lightRef.current) {
      // Closer asteroids get more light, distant ones get dimmer
      const lightIntensity = Math.max(0.3, 2 / Math.max(distanceFromCamera / 20, 1));
      lightRef.current.intensity = lightIntensity;

      // Position light slightly in front of asteroid to simulate sunlight
      lightRef.current.position.set(x + 5, y + 5, z + 10);
    }
  });

  return (
    <group ref={ref}>
      {/* Point light that follows the asteroid for additional illumination */}
      <pointLight
        ref={lightRef}
        intensity={followingLight?.intensity ?? 100}
        distance={30}
        decay={2}
        color={followingLight?.color ?? "#ffffff"}
        castShadow
      />

      {/* Ambient light for subtle fill lighting */}
      <ambientLight
        intensity={subtleFillLight?.intensity ?? 1}
        color={subtleFillLight?.color ?? "#4a90e2"}
      />

      {/* The asteroid component */}
      <AsteroidComponent />
    </group>
  );
};

export default OrbitingAsteroid;
