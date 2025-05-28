import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BrightStarsProps = {
  count?: number;
};

const BrightStars = ({ count = 50 }: BrightStarsProps) => {
  const ref = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 80 + Math.random() * 150;

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
      speeds[i] = 0.6 + Math.random() * 1.2; // Faster twinkling for bright stars
    }
    return speeds;
  });

  const opacityArray = useMemo(() => new Float32Array(count), [count]);

  useFrame(state => {
    if (ref?.current && pointsRef?.current) {
      ref.current.rotation.y += 0.0001;

      const time = state.clock.getElapsedTime();

      // Update individual star opacities
      for (let i = 0; i < count; i++) {
        opacityArray[i] = 0.7 + Math.sin(time * twinkleSpeeds[i] + twinkleOffsets[i]) * 0.25;
      }

      // Update the opacity attribute
      const opacityAttribute = pointsRef.current.geometry.attributes
        .opacity as THREE.BufferAttribute;
      if (opacityAttribute) {
        opacityAttribute.copyArray(opacityArray);
        opacityAttribute.needsUpdate = true;
      }
    }
  });

  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        size: { value: 1.2 },
        color: { value: new THREE.Color("#00FFFF") },
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

export default BrightStars;
