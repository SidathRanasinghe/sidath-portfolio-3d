/* eslint-disable no-unused-vars */
import { useRef, useCallback, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

const AutoRotationController = ({
  groupRef,
  controlsRef,
  isAutoRotating,
  isResetting,
  setIsAutoRotating,
  setIsResetting,
  config,
}: {
  groupRef: RefObject<THREE.Group | null>;
  controlsRef: RefObject<any>;
  isAutoRotating: boolean;
  isResetting: boolean;
  setIsAutoRotating: (value: boolean) => void;
  setIsResetting: (value: boolean) => void;
  config: {
    cameraPosition: [number, number, number];
    cameraTarget: [number, number, number];
    pauseDuration: number;
    resetDuration: number;
    mobileScale: number;
    isMobile: boolean;
    rotationSpeed: number;
    floatAmplitude: number;
    floatSpeed: number;
    orbitRadius: number;
    orbitSpeed: number;
    deskPosition: [number, number, number];
    deskRotation: [number, number, number];
    deskScale: [number, number, number];
  };
}) => {
  const timeoutRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const initialPosition = useRef(new THREE.Vector3(0, 0, 0));
  const deskGroupRef = useRef<THREE.Group | null>(null);
  const animationStateRef = useRef({
    rotationY: 0,
    floatOffset: { x: 0, y: 0, z: 0 },
    orbitOffset: { x: 0, y: 0 },
    time: 0,
  });

  // Smooth reset to initial position using GSAP-style animation
  const smoothResetToInitialPosition = useCallback(() => {
    const controls = controlsRef.current;
    const group = groupRef.current;

    if (!controls || !group) return;

    setIsResetting(true);

    // Reset camera position and target smoothly
    const currentPosition = controls.object.position.clone();
    const currentTarget = controls.target.clone();

    const targetPosition = new THREE.Vector3(...config.cameraPosition);
    const targetTarget = new THREE.Vector3(...config.cameraTarget);

    // Animate camera position
    gsap.to(currentPosition, {
      duration: config.resetDuration / 1000,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.object.position.copy(currentPosition);
        controls.update();
      },
    });

    // Animate camera target
    gsap.to(currentTarget, {
      duration: config.resetDuration / 1000,
      x: targetTarget.x,
      y: targetTarget.y,
      z: targetTarget.z,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.target.copy(currentTarget);
        controls.update();
      },
    });

    // Reset group rotation and position smoothly
    const currentRotation = {
      x: group.rotation.x,
      y: group.rotation.y,
      z: group.rotation.z,
    };
    const currentPosition3D = {
      x: group.position.x,
      y: group.position.y,
      z: group.position.z,
    };
    const currentScale = {
      x: group.scale.x,
      y: group.scale.y,
      z: group.scale.z,
    };

    const targetScale = config.isMobile ? config.mobileScale : 1;

    // Reset rotation to zero
    gsap.to(currentRotation, {
      duration: config.resetDuration / 1000,
      x: 0,
      y: 0,
      z: 0,
      ease: "power2.inOut",
      onUpdate: () => {
        group.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
      },
    });

    // Reset position to initial
    gsap.to(currentPosition3D, {
      duration: config.resetDuration / 1000,
      x: initialPosition.current.x,
      y: initialPosition.current.y,
      z: initialPosition.current.z,
      ease: "power2.inOut",
      onUpdate: () => {
        group.position.set(currentPosition3D.x, currentPosition3D.y, currentPosition3D.z);
      },
    });

    // Reset scale
    gsap.to(currentScale, {
      duration: config.resetDuration / 1000,
      x: targetScale,
      y: targetScale,
      z: targetScale,
      ease: "power2.inOut",
      onUpdate: () => {
        group.scale.set(currentScale.x, currentScale.y, currentScale.z);
      },
      onComplete: () => {
        // Reset animation state
        animationStateRef.current = {
          rotationY: 0,
          floatOffset: { x: 0, y: 0, z: 0 },
          orbitOffset: { x: 0, y: 0 },
          time: 0,
        };
        timeRef.current = 0;

        setIsResetting(false);
        setIsAutoRotating(true);
      },
    });
  }, [controlsRef, groupRef, config, setIsResetting, setIsAutoRotating]);

  // Handle user interaction
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      setIsAutoRotating(false);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleEnd = () => {
      // Set timeout to resume auto-rotation
      timeoutRef.current = window.setTimeout(() => {
        if (!isResetting) {
          smoothResetToInitialPosition();
        }
      }, config.pauseDuration);
    };

    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);

    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    controlsRef,
    isResetting,
    config.pauseDuration,
    smoothResetToInitialPosition,
    setIsAutoRotating,
  ]);

  // Combined auto-rotation and floating animation frame loop
  useFrame((_, delta) => {
    const group = groupRef.current;

    if (!group || !isAutoRotating || isResetting) return;

    // Find the desk group (nested group with transforms)
    if (!deskGroupRef.current && group.children.length > 0) {
      // Look for the scaled group, then find the desk group inside it
      const scaledGroup = group.children[0] as THREE.Group;
      if (scaledGroup && scaledGroup.children.length > 0) {
        deskGroupRef.current = scaledGroup.children[0] as THREE.Group;
      }
    }

    // Update time
    timeRef.current += delta;
    animationStateRef.current.time = timeRef.current;

    // Main Y-axis rotation (spinning) - apply to the main group
    const rotationAngle = config.rotationSpeed * delta * 60;
    animationStateRef.current.rotationY += rotationAngle;
    group.rotation.y = animationStateRef.current.rotationY;

    // Floating motion (gentle bobbing like in zero gravity)
    const floatY = Math.sin(timeRef.current * config.floatSpeed) * config.floatAmplitude;
    const floatX =
      Math.cos(timeRef.current * config.floatSpeed * 0.7) * config.floatAmplitude * 0.5;
    const floatZ =
      Math.sin(timeRef.current * config.floatSpeed * 0.5) * config.floatAmplitude * 0.3;

    animationStateRef.current.floatOffset = { x: floatX, y: floatY, z: floatZ };

    // Subtle orbital movement around the center
    const orbitX = Math.cos(timeRef.current * config.orbitSpeed) * config.orbitRadius;
    const orbitZ = Math.sin(timeRef.current * config.orbitSpeed) * config.orbitRadius;

    animationStateRef.current.orbitOffset = { x: orbitX, y: orbitZ };

    // Combine floating and orbital motion - apply to main group
    group.position.set(
      initialPosition.current.x + floatX + orbitX,
      initialPosition.current.y + floatY,
      initialPosition.current.z + floatZ + orbitZ
    );

    // Add subtle rotation variations for more organic movement - apply to main group
    group.rotation.x = Math.sin(timeRef.current * 0.3) * 0.02;
    group.rotation.z = Math.cos(timeRef.current * 0.4) * 0.01;

    // Ensure desk maintains its configured transforms while floating
    if (deskGroupRef.current) {
      deskGroupRef.current.position.set(...config.deskPosition);
      deskGroupRef.current.rotation.set(...config.deskRotation);
      deskGroupRef.current.scale.set(...config.deskScale);
    }
  });

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return null;
};

export default AutoRotationController;
