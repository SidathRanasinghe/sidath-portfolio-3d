import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import type { TechStackIcon } from "@/constants/types";

// Shared virtual box configuration with proper progressive scaling
export const VIRTUAL_BOX_CONFIG = {
  xs: {
    height: 2.5,
    width: 3.5,
    spacingMultiplierX: 1.3,
    spacingMultiplierY: 1.75,
  },
  sm: {
    height: 3.2,
    width: 3.0,
    spacingMultiplierX: 1.65,
    spacingMultiplierY: 1.75,
  },
  md: {
    height: 4.8,
    width: 4.5,
    spacingMultiplierX: 2,
    spacingMultiplierY: 1.5,
  },
  lg: {
    height: 4.2,
    width: 4.0,
    spacingMultiplierX: 1.6,
    spacingMultiplierY: 1.7,
  },
  xl: {
    height: 4.8,
    width: 4.5,
    spacingMultiplierX: 1.7,
    spacingMultiplierY: 1.8,
  },
  "2xl": {
    height: 5.4,
    width: 5.0,
    spacingMultiplierX: 1.8,
    spacingMultiplierY: 1.9,
  },
  "3xl": {
    height: 5.8,
    width: 5.4,
    spacingMultiplierX: 1.9,
    spacingMultiplierY: 2.0,
  },
  "4xl": {
    height: 6.2,
    width: 5.8,
    spacingMultiplierX: 2.0,
    spacingMultiplierY: 2.1,
  },
  "5xl": {
    height: 6.8,
    width: 6.4,
    spacingMultiplierX: 2.1,
    spacingMultiplierY: 2.2,
  },
  "6xl": {
    height: 7.2,
    width: 6.8,
    spacingMultiplierX: 2.2,
    spacingMultiplierY: 2.3,
  },
  "7xl": {
    height: 7.8,
    width: 7.4,
    spacingMultiplierX: 2.3,
    spacingMultiplierY: 2.4,
  },
};

interface ModelProps {
  model: TechStackIcon;
  position: [number, number, number];
  virtualBoxHeight: number;
  virtualBoxWidth: number;
  breakpoint: string;
}

const Model = ({ model, position, virtualBoxHeight, virtualBoxWidth, breakpoint }: ModelProps) => {
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
          child.material ??= new THREE.MeshStandardMaterial({ color: "#ffffff" });
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
      const floatY = Math.sin(time * 0.5 + floatOffset) * 0.08;

      if (modelRef.current) {
        modelRef.current.position.y = floatY;
        modelRef.current.rotation.y += 0.012;
      }
    }
  });

  // Calculate responsive model scale and position with proper progressive scaling
  const { modelPosition, modelScale, textPosition, textSize } = useMemo(() => {
    // Progressive scaling factors
    const scaleFactors = {
      xs: 0.45,
      sm: 0.55,
      md: 0.65,
      lg: 0.75,
      xl: 0.85,
      "2xl": 0.95,
      "3xl": 1.05,
      "4xl": 1.15,
      "5xl": 1.25,
      "6xl": 1.35,
      "7xl": 1.45,
    };

    // Progressive text sizes
    const textSizes = {
      xs: 0.25,
      sm: 0.32,
      md: 0.38,
      lg: 0.44,
      xl: 0.5,
      "2xl": 0.56,
      "3xl": 0.62,
      "4xl": 0.68,
      "5xl": 0.74,
      "6xl": 0.8,
      "7xl": 0.86,
    };

    const baseScale = scaleFactors[breakpoint as keyof typeof scaleFactors] || 1.0;
    const finalScale = (model.scale || 1) * baseScale;
    const textSize = textSizes[breakpoint as keyof typeof textSizes] || 0.56;

    let modelPos: [number, number, number] = [0, 0, 0];
    const textPos: [number, number, number] = [0, -virtualBoxHeight * 0.7, 0];

    if (modelBounds && modelLoaded) {
      const scaledBounds = modelBounds.clone();
      const modelHeight = (scaledBounds.max.y - scaledBounds.min.y) * finalScale;

      // Position model in upper portion of virtual box
      const modelAreaHeight = virtualBoxHeight * 0.6;
      const modelY = (modelAreaHeight - modelHeight) / 2 + virtualBoxHeight * 0.15;

      modelPos = [0, modelY, 0];
    }

    return {
      modelPosition: modelPos,
      modelScale: finalScale,
      textPosition: textPos,
      textSize,
    };
  }, [modelBounds, modelLoaded, model.scale, virtualBoxHeight, breakpoint]);

  // Show fallback cube if model fails to load
  if (!modelLoaded) {
    return (
      <group position={position}>
        <mesh scale={[0.4, 0.4, 0.4]} position={modelPosition}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3c3c44" transparent opacity={0.8} />
        </mesh>
        <Text
          position={textPosition}
          fontSize={textSize * 0.8}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          maxWidth={virtualBoxWidth * 0.8}
        >
          {model.name}
        </Text>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Model with floating animation positioned within virtual box */}
      <group ref={modelRef} position={modelPosition} scale={modelScale} rotation={model.rotation}>
        <primitive object={scene.clone()} />
      </group>

      {/* Technology Name positioned at bottom of virtual box */}
      <group ref={textRef}>
        <Text
          position={textPosition}
          fontSize={textSize}
          fontWeight={800}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={virtualBoxWidth * 0.9}
          fillOpacity={1}
          strokeWidth={0.01}
        >
          {model.name}
        </Text>
      </group>
    </group>
  );
};

interface TechIconGridExperienceProps {
  models: TechStackIcon[];
  containerHeight?: number;
  fixedCameraZ?: number;
  screenWidth?: number;
  breakpoint?: string;
  columns?: number;
  rows?: number;
}

const TechIconGridExperience = ({
  models,
  fixedCameraZ = 60,
  screenWidth = 1920,
  breakpoint = "5xl",
  columns = 6,
  rows = 3,
}: TechIconGridExperienceProps) => {
  const { camera, size, gl } = useThree();
  const containerRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const initialCameraPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialCameraRotation = useRef<THREE.Euler>(new THREE.Euler());
  const interactionTimeoutRef = useRef<number | null>(null);
  const isResettingRef = useRef(false);

  // Calculate responsive virtual box dimensions using shared config
  const { virtualBoxHeight, virtualBoxWidth, spacingConfig } = useMemo(() => {
    // Get virtual box configuration for current breakpoint
    const boxConfig =
      VIRTUAL_BOX_CONFIG[breakpoint as keyof typeof VIRTUAL_BOX_CONFIG] ||
      VIRTUAL_BOX_CONFIG["5xl"];

    const { height, width, spacingMultiplierX, spacingMultiplierY } = boxConfig;

    // Spacing configuration
    const spacingX = width * spacingMultiplierX;
    const spacingY = height * spacingMultiplierY;

    return {
      virtualBoxHeight: height,
      virtualBoxWidth: width,
      spacingConfig: { spacingX, spacingY },
    };
  }, [breakpoint, screenWidth, size.width]);

  // Calculate grid positions with optimized spacing
  const getGridPosition = useCallback(
    (index: number): [number, number, number] => {
      const col = index % columns;
      const row = Math.floor(index / columns);

      // Center the grid with improved calculations
      const totalWidth = (columns - 1) * spacingConfig.spacingX;
      const totalHeight = (rows - 1) * spacingConfig.spacingY;

      const x = col * spacingConfig.spacingX - totalWidth / 2;
      const y = (rows - 1 - row) * spacingConfig.spacingY - totalHeight / 2;
      const z = 0;

      return [x, y, z];
    },
    [columns, rows, spacingConfig]
  );

  // Set up initial camera position with fixed Z value
  useEffect(() => {
    if (camera) {
      initialCameraPosition.current.set(0, 0, fixedCameraZ);
      initialCameraRotation.current.set(0, 0, 0);

      camera.position.copy(initialCameraPosition.current);
      camera.rotation.copy(initialCameraRotation.current);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, fixedCameraZ]);

  // Reset camera to initial position with animation
  const resetCamera = useCallback(() => {
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
        duration: 1.2,
        ease: "power2.inOut",
      });

      // Animate camera rotation
      tl.to(
        camera.rotation,
        {
          x: initialCameraRotation.current.x,
          y: initialCameraRotation.current.y,
          z: initialCameraRotation.current.z,
          duration: 1.2,
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
            duration: 1.2,
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
  }, [camera]);

  // Handle interaction detection
  useEffect(() => {
    const handleInteractionStart = () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };

    const handleInteractionEnd = () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }

      interactionTimeoutRef.current = window.setTimeout(() => {
        resetCamera();
      }, 2500);
    };

    const canvas = gl.domElement;
    if (canvas && controlsRef.current) {
      const controls = controlsRef.current;

      // Mouse events
      canvas.addEventListener("mousedown", handleInteractionStart);
      canvas.addEventListener("mouseup", handleInteractionEnd);

      // Touch events
      canvas.addEventListener("touchstart", handleInteractionStart);
      canvas.addEventListener("touchend", handleInteractionEnd);

      // OrbitControls events
      const onControlsStart = () => handleInteractionStart();
      const onControlsEnd = () => handleInteractionEnd();

      controls.addEventListener("start", onControlsStart);
      controls.addEventListener("end", onControlsEnd);

      return () => {
        canvas.removeEventListener("mousedown", handleInteractionStart);
        canvas.removeEventListener("mouseup", handleInteractionEnd);
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

  // Calculate responsive lighting intensity
  const lightingConfig = useMemo(() => {
    const isMobile = breakpoint === "xs" || breakpoint === "sm";
    return {
      ambient: isMobile ? 1.0 : 0.8,
      directional1: isMobile ? 1.1 : 1.2,
      directional2: isMobile ? 0.6 : 0.7,
      point: isMobile ? 0.8 : 0.9,
      spot: isMobile ? 1.1 : 1.2,
      environment: isMobile ? 0.3 : 0.4,
    };
  }, [breakpoint]);

  return (
    <group ref={containerRef}>
      {/* Enhanced lighting setup with responsive intensity */}
      <ambientLight intensity={lightingConfig.ambient} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={lightingConfig.directional1}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -5, 5]}
        intensity={lightingConfig.directional2}
        color="#4f46e5"
      />
      <pointLight position={[0, 0, 10]} intensity={lightingConfig.point} />
      <spotLight position={[0, 10, 8]} angle={0.3} penumbra={1} intensity={lightingConfig.spot} />

      <Environment preset="sunset" environmentIntensity={lightingConfig.environment} />

      {models.map((model, index) => {
        const position = getGridPosition(index);
        return (
          <Model
            key={model.id}
            model={model}
            position={position}
            virtualBoxHeight={virtualBoxHeight}
            virtualBoxWidth={virtualBoxWidth}
            breakpoint={breakpoint}
          />
        );
      })}

      {/* OrbitControls with responsive settings */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.1}
        maxPolarAngle={Math.PI / 1.2}
        minPolarAngle={Math.PI / 6}
        rotateSpeed={screenWidth && screenWidth < 768 ? 0.4 : 0.6}
        panSpeed={screenWidth && screenWidth < 768 ? 0.4 : 0.6}
      />
    </group>
  );
};

export default TechIconGridExperience;
