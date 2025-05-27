import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type GalaxyCenter = { x: number; y: number; z: number };

type RealisticGalaxyProps = {
  center?: GalaxyCenter;
  coreParticles?: number;
  armParticles?: number;
  flatteningFactor?: number;
  startRadiusFactor?: number;
  scale?: number;
  isPlanet?: boolean;
};

const RealisticGalaxy = ({
  center = { x: -80, y: 20, z: -150 },
  coreParticles = 500,
  armParticles = 2000,
  flatteningFactor = 0.4,
  startRadiusFactor = 8,
  scale = 0.5,
  isPlanet,
}: RealisticGalaxyProps) => {
  const ref = useRef<THREE.Group>(null);

  // Configuration constants
  const CORE_PARTICLES = coreParticles;
  const ARM_PARTICLES = armParticles;
  const GALAXY_CENTER = center;
  const ROTATION_SPEED = 0.0002;
  const GALAXY_SCALE = scale;

  const [positions, colors, sizes] = useMemo(() => {
    const totalParticles = CORE_PARTICLES + ARM_PARTICLES;
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);

    let index = 0;

    // Generate galaxy core particles - make it much fatter and 3D
    for (let i = 0; i < CORE_PARTICLES; i++) {
      // Use spherical distribution for 3D core
      const radius = Math.pow(Math.random(), 0.3) * 8 * GALAXY_SCALE; // Power curve for density falloff
      const theta = Math.random() * Math.PI * 2; // Horizontal angle
      const phi = Math.acos(2 * Math.random() - 1); // Vertical angle for sphere

      // Convert spherical to cartesian, but flatten it to make it more disk-like
      const flatternFactor = flatteningFactor; // Makes it more disk-shaped than sphere
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * flatternFactor;
      const z = radius * Math.cos(phi) * 0.6; // Compress Z for disk shape

      // Position
      positions[index * 3] = GALAXY_CENTER.x + x;
      positions[index * 3 + 1] = GALAXY_CENTER.y + y;
      positions[index * 3 + 2] = GALAXY_CENTER.z + z;

      // Core color (bright warm yellow-white with some variation)
      const brightness = (isPlanet ? 0.1 : 0.8) + Math.random() * 0.2;
      colors[index * 3] = 1.0 * brightness; // R
      colors[index * 3 + 1] = 0.9 * brightness; // G
      colors[index * 3 + 2] = 0.6 * brightness; // B

      // Core size (larger particles, density-based)
      const densityFactor = 1.0 - radius / (8 * GALAXY_SCALE); // Denser = larger
      sizes[index] = (1.5 + densityFactor * 1.0 + Math.random() * 0.5) * GALAXY_SCALE;
      index++;
    }

    // Generate spiral arm particles - make them curve properly
    const armsCount = 4;
    const particlesPerArm = ARM_PARTICLES / armsCount;

    for (let i = 0; i < ARM_PARTICLES; i++) {
      const armIndex = Math.floor(i / particlesPerArm);
      const progress = (i % particlesPerArm) / particlesPerArm;

      // Start arms from edge of core and spiral outward
      const startRadius = startRadiusFactor * GALAXY_SCALE; // Start from core edge
      const endRadius = 25 * GALAXY_SCALE;
      const radius = startRadius + progress * (endRadius - startRadius);

      // Create logarithmic spiral (more realistic)
      const baseAngle = (armIndex * Math.PI * 2) / armsCount + progress * Math.PI * 3;

      // Add some arm width variation
      const armWidth = 2 * GALAXY_SCALE * (1 - progress * 0.3); // Arms get thinner
      const offsetAngle = baseAngle + (Math.random() - 0.5) * 0.3;
      const offsetRadius = radius + (Math.random() - 0.5) * armWidth;

      const x = Math.cos(offsetAngle) * offsetRadius;
      const z = Math.sin(offsetAngle) * offsetRadius * 0.8; // Slightly flatten

      // Add some vertical spread (thinner than core)
      const verticalSpread = (0.5 + progress * 0.5) * GALAXY_SCALE;
      const y = (Math.random() - 0.5) * verticalSpread;

      // Position
      positions[index * 3] = GALAXY_CENTER.x + x;
      positions[index * 3 + 1] = GALAXY_CENTER.y + y;
      positions[index * 3 + 2] = GALAXY_CENTER.z + z;

      // Arm color - transition from core colors to blue
      const distanceFactor = progress;
      const colorVariation = 0.6 + Math.random() * 0.4;

      // Transition from warm (near core) to cool (outer arms)
      colors[index * 3] = (0.9 - distanceFactor * 0.6) * colorVariation; // R - less red outward
      colors[index * 3 + 1] = (0.7 - distanceFactor * 0.2) * colorVariation; // G
      colors[index * 3 + 2] = (0.4 + distanceFactor * 0.6) * colorVariation; // B - more blue outward

      // Arm size (smaller than core, gets smaller towards edges)
      sizes[index] = (0.6 - progress * 0.3 + Math.random() * 0.3) * GALAXY_SCALE;
      index++;
    }

    return [positions, colors, sizes];
  }, []);

  // Single custom material for better performance
  const galaxyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Enhanced glow effect for better visibility
          float glow = pow(1.0 - distanceToCenter, 2.0);
          vec3 finalColor = vColor * (0.6 + glow * 0.8);
          
          gl_FragColor = vec4(finalColor, alpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += ROTATION_SPEED;
    }
  });

  return (
    <group ref={ref}>
      <points material={galaxyMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
      </points>
    </group>
  );
};

export default RealisticGalaxy;
