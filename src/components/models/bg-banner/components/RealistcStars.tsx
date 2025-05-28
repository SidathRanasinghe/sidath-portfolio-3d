import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

type RealisticStarsProps = {
  count?: number;
};

const RealisticStars = ({ count = 80000 }: RealisticStarsProps) => {
  const ref = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 100 + Math.random() * 200;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  const [twinkleOffsets] = useState(() => {
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return offsets;
  });

  const [twinkleSpeeds] = useState(() => {
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      speeds[i] = 0.5 + Math.random() * 1.5; // Random speed between 0.5 and 2
    }
    return speeds;
  });

  // Create individual opacity array for each star
  const opacityArray = useMemo(() => new Float32Array(count), [count]);

  useFrame(state => {
    if (ref?.current && pointsRef?.current) {
      ref.current.rotation.y += 0.0002;

      const time = state.clock.getElapsedTime();

      // Update individual star opacities
      for (let i = 0; i < count; i++) {
        opacityArray[i] = 0.4 + Math.sin(time * twinkleSpeeds[i] + twinkleOffsets[i]) * 0.4;
      }

      // Update the opacity attribute using copyArray method
      const opacityAttribute = pointsRef.current.geometry.attributes
        .opacity as THREE.BufferAttribute;
      if (opacityAttribute) {
        opacityAttribute.copyArray(opacityArray);
        opacityAttribute.needsUpdate = true;
      }
    }
  });

  // Custom shader material for individual star opacity
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        size: { value: 2.0 },
        color: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        uniform float size;
        
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 color;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(color, alpha * vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <group ref={ref}>
      <points ref={pointsRef} material={starMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-opacity" args={[opacityArray, 1]} />
        </bufferGeometry>
      </points>
    </group>
  );
};

export default RealisticStars;
