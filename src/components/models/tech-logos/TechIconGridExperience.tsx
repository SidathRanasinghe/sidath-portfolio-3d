import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import type { TechStackIcon } from "@/constants/types";

interface ModelProps {
  model: TechStackIcon;
  position: [number, number, number];
  virtualBoxHeight: number;
}

const Model = ({ model, position, virtualBoxHeight }: ModelProps) => {
  const { scene } = useGLTF(model.modelPath, true);
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelBounds, setModelBounds] = useState<THREE.Box3 | null>(null);

  useEffect(() => {
    if (scene) {
      setModelLoaded(true);

      // Apply special material handling for THREE.js model
      if (model.id === "THREE") {
        scene.traverse(child => {
          if (child instanceof THREE.Mesh) {
            if (child.name === "Object_5") {
              child.material = new THREE.MeshStandardMaterial({ color: "white" });
            }
          }
        });
      }

      // Ensure all meshes have proper materials
      scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
          }
          child.visible = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Calculate model bounds for proper positioning within virtual box
      const box = new THREE.Box3().setFromObject(scene);
      setModelBounds(box);
    }
  }, [scene, model.id, model.name]);

  // Floating animation and auto rotation
  useFrame(state => {
    if (groupRef.current && modelLoaded) {
      const time = state.clock.getElapsedTime();
      // Floating effect - only apply to the model, not the text
      const floatY = Math.sin(time * 0.5 + floatOffset) * 0.1;

      if (modelRef.current) {
        modelRef.current.position.y = floatY;
        modelRef.current.rotation.y += 0.015;
      }
    }
  });

  // Calculate model position within virtual box (centered vertically)
  const modelPosition: [number, number, number] = useMemo(() => {
    if (modelBounds && modelLoaded) {
      const scaledBounds = modelBounds.clone();
      const scaleY = model.scale || 1;
      const modelHeight = (scaledBounds.max.y - scaledBounds.min.y) * scaleY;

      // Center the model within the upper portion of the virtual box
      // Leave space at bottom for text
      const modelAreaHeight = virtualBoxHeight * 0.7; // 70% for model, 30% for text
      const modelY = (modelAreaHeight - modelHeight) / 2;

      return [0, modelY, 0];
    }
    return [0, 0, 0];
  }, [modelBounds, modelLoaded, model.scale, virtualBoxHeight]);

  // Calculate text position (always at bottom of virtual box)
  const textPosition: [number, number, number] = useMemo(() => {
    // Position text at the bottom of the virtual box
    const textY = -virtualBoxHeight / 2 + 0.5; // Small padding from bottom
    return [0, textY, 0];
  }, [virtualBoxHeight]);

  // Show fallback cube if model fails to load
  if (!modelLoaded) {
    return (
      <group position={position}>
        <mesh scale={[0.5, 0.5, 0.5]} position={modelPosition}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#6366f1" transparent opacity={0.8} />
        </mesh>
        <Text
          position={textPosition}
          fontSize={0.2}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {model.name}
        </Text>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Model with floating animation positioned within virtual box */}
      <group ref={modelRef} position={modelPosition} scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.clone()} />
      </group>

      {/* Technology Name positioned at bottom of virtual box */}
      <group ref={textRef}>
        <Text
          position={textPosition}
          fontSize={0.75}
          fontWeight={900}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          fillOpacity={1}
          strokeWidth={0.02}
        >
          {model.name}
        </Text>
      </group>
    </group>
  );
};

interface TechIconGridExperienceProps {
  models: TechStackIcon[];
  containerWidth?: number;
  containerHeight?: number;
}

const TechIconGridExperience = ({ models }: TechIconGridExperienceProps) => {
  const { camera, size, gl } = useThree();
  const containerRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const initialCameraPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialCameraRotation = useRef<THREE.Euler>(new THREE.Euler());
  const interactionTimeoutRef = useRef<number | null>(null);
  const isResettingRef = useRef(false);

  // Calculate virtual box height based on screen size
  const virtualBoxHeight = useMemo(() => {
    const screenWidth = size.width;

    if (screenWidth < 640) return 6; // Mobile
    if (screenWidth < 768) return 7; // Small tablet
    if (screenWidth < 1024) return 8; // Tablet
    if (screenWidth < 1280) return 9; // Small desktop
    return 10; // Large desktop
  }, [size.width]);

  // Calculate responsive grid layout
  const gridConfig = useMemo(() => {
    let columns: number;
    const screenWidth = size.width;

    // Responsive column calculation
    if (screenWidth < 640) {
      columns = Math.min(2, models.length);
    } else if (screenWidth < 768) {
      columns = Math.min(3, models.length);
    } else if (screenWidth < 1024) {
      columns = Math.min(4, models.length);
    } else if (screenWidth < 1280) {
      columns = Math.min(5, models.length);
    } else {
      columns = Math.min(6, models.length);
    }

    const rows = Math.ceil(models.length / columns);

    // Spacing based on virtual box height
    const spacingX = virtualBoxHeight * 0.8;
    const spacingY = virtualBoxHeight;

    return { columns, rows, spacingX, spacingY };
  }, [models.length, size.width, virtualBoxHeight]);

  // Calculate grid positions
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

  // Set up initial camera position and store it
  useEffect(() => {
    if (camera) {
      const { rows, columns, spacingX, spacingY } = gridConfig;
      const gridWidth = (columns - 1) * spacingX;
      const gridHeight = (rows - 1) * spacingY;
      const maxDimension = Math.max(gridWidth, gridHeight);

      // Calculate camera distance based on grid size
      const cameraDistance = Math.max(15, maxDimension * 0.8 + 10);

      // Store initial position and rotation
      initialCameraPosition.current.set(0, 0, cameraDistance);
      initialCameraRotation.current.set(0, 0, 0);

      camera.position.copy(initialCameraPosition.current);
      camera.rotation.copy(initialCameraRotation.current);
      camera.lookAt(0, 0, 0);

      // Update camera projection
      if (camera instanceof THREE.PerspectiveCamera) {
        const fov = Math.max(40, Math.min(65, maxDimension * 4 + 40));
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    }
  }, [camera, gridConfig, models.length]);

  // Reset camera to initial position with animation
  const resetCamera = () => {
    if (camera && controlsRef.current && !isResettingRef.current) {
      isResettingRef.current = true;
      const controls = controlsRef.current;

      // Create GSAP timeline for smooth reset animation
      const tl = gsap.timeline({
        onComplete: () => {
          isResettingRef.current = false;
        },
      });

      // Animate camera position
      tl.to(camera.position, {
        x: initialCameraPosition.current.x,
        y: initialCameraPosition.current.y,
        z: initialCameraPosition.current.z,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Animate camera rotation
      tl.to(
        camera.rotation,
        {
          x: initialCameraRotation.current.x,
          y: initialCameraRotation.current.y,
          z: initialCameraRotation.current.z,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      );

      // Reset controls target
      if (controls && controls.target) {
        tl.to(
          controls.target,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (controls.update) {
                controls.update();
              }
            },
          },
          "<"
        );
      }
    }
  };

  // Handle interaction detection
  useEffect(() => {
    const handleInteractionStart = () => {
      // Clear existing timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };

    const handleInteractionEnd = () => {
      // Set timeout to reset after 3 seconds of inactivity
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }

      interactionTimeoutRef.current = window.setTimeout(() => {
        resetCamera();
      }, 3000);
    };

    // Add event listeners for various interaction types
    const canvas = gl.domElement;
    if (canvas && controlsRef.current) {
      const controls = controlsRef.current;

      // Mouse events
      canvas.addEventListener("mousedown", handleInteractionStart);
      canvas.addEventListener("mouseup", handleInteractionEnd);
      canvas.addEventListener("wheel", handleInteractionStart);
      canvas.addEventListener("wheel", handleInteractionEnd);

      // Touch events
      canvas.addEventListener("touchstart", handleInteractionStart);
      canvas.addEventListener("touchend", handleInteractionEnd);

      // OrbitControls events - using proper event handling
      const onControlsStart = () => handleInteractionStart();
      const onControlsEnd = () => handleInteractionEnd();

      controls.addEventListener("start", onControlsStart);
      controls.addEventListener("end", onControlsEnd);

      return () => {
        canvas.removeEventListener("mousedown", handleInteractionStart);
        canvas.removeEventListener("mouseup", handleInteractionEnd);
        canvas.removeEventListener("wheel", handleInteractionStart);
        canvas.removeEventListener("wheel", handleInteractionEnd);
        canvas.removeEventListener("touchstart", handleInteractionStart);
        canvas.removeEventListener("touchend", handleInteractionEnd);

        if (controls) {
          controls.removeEventListener("start", onControlsStart);
          controls.removeEventListener("end", onControlsEnd);
        }

        if (interactionTimeoutRef.current) {
          clearTimeout(interactionTimeoutRef.current);
          interactionTimeoutRef.current = null;
        }
      };
    }
  }, [gl.domElement, resetCamera]);

  return (
    <group ref={containerRef}>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.6} color="#4f46e5" />
      <pointLight position={[0, 0, 10]} intensity={0.8} />
      <spotLight position={[0, 10, 8]} angle={0.3} penumbra={1} intensity={1.2} />

      <Environment preset="sunset" environmentIntensity={0.3} />

      {models.map((model, index) => {
        const position = getGridPosition(index);
        return (
          <Model
            key={model.id}
            model={model}
            position={position}
            virtualBoxHeight={virtualBoxHeight}
          />
        );
      })}

      {/* OrbitControls with ref */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxDistance={35}
        minDistance={6}
        enableDamping={true}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.3}
        minPolarAngle={Math.PI / 8}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
        panSpeed={0.8}
      />
    </group>
  );
};

export default TechIconGridExperience;
