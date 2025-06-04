/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import type { TechStackIcon } from "@/constants/types";

interface ModelProps {
  model: TechStackIcon;
  position: [number, number, number];
  gridIndex: number;
  onHover: (index: number | null) => void;
  isHovered: boolean;
  isSelected: boolean;
  onClick: (index: number | null) => void;
}

const Model = ({
  model,
  position,
  gridIndex,
  onHover,
  isHovered,
  isSelected,
  onClick,
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const scene = useGLTF(model.modelPath);
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (model.id === "THREE") {
      scene.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.id]);

  // Individual floating animation for each model
  useFrame(state => {
    if (groupRef.current && !isDragging) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + floatOffset) * 0.1;

      // Auto rotation when not selected
      if (!isSelected && modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
    }

    // Apply manual rotation when selected
    if (isSelected && modelRef.current) {
      modelRef.current.rotation.x = rotation.x;
      modelRef.current.rotation.y = rotation.y;
    }
  });

  const handlePointerDown = (event: any) => {
    if (isSelected) {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      event.stopPropagation();
    }
  };

  const handlePointerMove = (event: any) => {
    if (isDragging && isSelected) {
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;

      setRotation(prev => ({
        x: prev.x - deltaY * 0.01,
        y: prev.y + deltaX * 0.01,
      }));

      setDragStart({ x: event.clientX, y: event.clientY });
      event.stopPropagation();
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handlePointerMove);
      document.addEventListener("mouseup", handlePointerUp);
      return () => {
        document.removeEventListener("mousemove", handlePointerMove);
        document.removeEventListener("mouseup", handlePointerUp);
      };
    }
  }, [isDragging, dragStart]);

  const scale = isHovered ? model.scale * 1.1 : isSelected ? model.scale * 1.2 : model.scale;

  return (
    <group position={position}>
      {/* Model */}
      <group
        ref={groupRef}
        scale={scale}
        onPointerEnter={() => onHover(gridIndex)}
        onPointerLeave={() => onHover(null)}
        onClick={e => {
          e.stopPropagation();
          onClick(isSelected ? null : gridIndex);
        }}
        onPointerDown={handlePointerDown}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        style={{ cursor: isSelected ? (isDragging ? "grabbing" : "grab") : "pointer" }}
      >
        <group ref={modelRef} rotation={model.rotation}>
          <primitive object={scene.scene.clone()} />
        </group>
      </group>

      {/* Technology Name */}
      <Text
        position={[0, position[1] - 1.2, 0]}
        fontSize={0.2}
        color={isSelected ? "#60a5fa" : isHovered ? "#ffffff" : "#d1d5db"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff"
        maxWidth={2}
      >
        {model.name}
      </Text>
    </group>
  );
};

interface TechIconGridExperienceProps {
  models: TechStackIcon[];
  containerWidth?: number;
  containerHeight?: number;
}

const TechIconGridExperience = ({ models }: TechIconGridExperienceProps) => {
  const { camera, size } = useThree();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<THREE.Group>(null);

  // Calculate responsive grid layout
  const gridConfig = useMemo(() => {
    // Determine columns based on screen size and model count
    let columns: number;
    const aspectRatio = size.width / size.height;

    if (models.length <= 4) {
      columns = Math.min(4, models.length);
    } else if (models.length <= 8) {
      columns = aspectRatio > 1.5 ? 4 : 3;
    } else if (models.length <= 12) {
      columns = aspectRatio > 1.5 ? 4 : 3;
    } else {
      columns = aspectRatio > 1.8 ? 5 : aspectRatio > 1.2 ? 4 : 3;
    }

    const rows = Math.ceil(models.length / columns);

    // Spacing between items
    const spacingX = 2.5;
    const spacingY = 2.8;

    return { columns, rows, spacingX, spacingY };
  }, [models.length, size.width, size.height]);

  // Calculate grid positions with proper spacing
  const getGridPosition = (index: number): [number, number, number] => {
    const { columns, spacingX, spacingY } = gridConfig;
    const col = index % columns;
    const row = Math.floor(index / columns);

    // Center the grid
    const totalWidth = (columns - 1) * spacingX;
    const totalHeight = (gridConfig.rows - 1) * spacingY;

    const x = col * spacingX - totalWidth / 2;
    const y = (gridConfig.rows - 1 - row) * spacingY - totalHeight / 2;
    const z = 0;

    return [x, y, z];
  };

  // Set up camera for grid view with responsive positioning
  useEffect(() => {
    if (camera) {
      const { rows, columns } = gridConfig;
      const maxDimension = Math.max(rows * 2.8, columns * 2.5);
      const cameraDistance = Math.max(8, maxDimension * 0.8);

      camera.position.set(0, 0, cameraDistance);
      camera.lookAt(0, 0, 0);

      // Update camera projection for better view
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = Math.max(45, Math.min(75, maxDimension * 8));
        camera.updateProjectionMatrix();
      }
    }
  }, [camera, gridConfig, models.length]);

  // Handle click outside to deselect
  const handleBackgroundClick = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      {/* Background plane for click detection */}
      <mesh onClick={handleBackgroundClick} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group ref={containerRef}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#4f46e5" />
        <spotLight position={[0, 10, 8]} angle={0.3} penumbra={1} intensity={1} />

        <Environment preset="sunset" environmentIntensity={0.4} />

        {models.map((model, index) => (
          <Model
            key={model.id}
            model={model}
            position={getGridPosition(index)}
            gridIndex={index}
            onHover={setHoveredIndex}
            isHovered={hoveredIndex === index}
            isSelected={selectedIndex === index}
            onClick={setSelectedIndex}
          />
        ))}
      </group>
    </>
  );
};

export default TechIconGridExperience;
