import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as random from "maath/random";
import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

type GridProps = {
  count?: number;
  color?: string;
  mouse: RefObject<[number, number]>;
};

const Grid = ({ count = 5000, color, mouse }: GridProps) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(
    () => random.inSphere(new Float32Array(count * 3), { radius: 1.5 }) as Float32Array
  );
  const { size, viewport } = useThree();
  const aspect: number = size.width / viewport.width;

  useFrame((_state, delta: number) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    // Mouse interaction
    ref.current.position.x = mouse.current[0] / aspect / 10;
    ref.current.position.y = -mouse.current[1] / aspect / 10;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const HeroBanner = () => {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove);

    return (): void => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative size-full transition-colors duration-300">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Grid color="#ffffff" mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default HeroBanner;
