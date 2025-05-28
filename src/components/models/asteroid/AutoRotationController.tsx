import { useEffect, useRef, useState, type RefObject } from "react";
import type { AutoRotationConfigs, CameraConfig, ResponsiveConfig } from "./types";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

interface AutoRotationControllerProps {
  groupRef: RefObject<THREE.Group | null>;
  controlsRef: RefObject<any>;
  responsiveConfig: ResponsiveConfig;
  autoRotationConfigs: AutoRotationConfigs;
  initialCameraConfigs: CameraConfig;
}

const AutoRotationController = ({
  groupRef,
  controlsRef,
  responsiveConfig,
  autoRotationConfigs,
  initialCameraConfigs,
}: AutoRotationControllerProps) => {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const rotationAxisRef = useRef<THREE.Vector3 | null>(null);
  const rotationCenterRef = useRef<THREE.Vector3 | null>(null);

  // Calculate the rotation axis and center based on outer model position and orientation
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Wait for the group to be properly initialized
    setTimeout(() => {
      group.updateMatrixWorld(true);

      // outer model configuration from SCENE_CONFIG
      const outerModelScale = 0.4;
      const outerModelPosition = new THREE.Vector3(0.25, -0.615, -0.7);
      const outerModelRotation = new THREE.Euler(-0.4, 4, 0.115);

      // Create a temporary object to represent the outerModel's transform
      const outerModelTransform = new THREE.Object3D();
      outerModelTransform.scale.setScalar(outerModelScale);
      outerModelTransform.position.copy(outerModelPosition);
      outerModelTransform.rotation.copy(outerModelRotation);

      // Add it to the group temporarily to get world transform
      group.add(outerModelTransform);
      outerModelTransform.updateMatrixWorld(true);

      // Get the outerModel's world position (this will be our rotation center)
      const outerModelWorldPosition = new THREE.Vector3();
      outerModelTransform.getWorldPosition(outerModelWorldPosition);
      rotationCenterRef.current = outerModelWorldPosition;

      // Get the outerModel's local Y-axis in world space (this will be our rotation axis)
      const outerModelLocalYAxis = new THREE.Vector3(0, 1, 0);
      const outerModelWorldYAxis = outerModelLocalYAxis
        .transformDirection(outerModelTransform.matrixWorld)
        .normalize();
      rotationAxisRef.current = outerModelWorldYAxis;

      // Remove the temporary object
      group.remove(outerModelTransform);

      // console.log("=== DESK-BASED ROTATION SETUP ===");
      // console.log("Desk world position (rotation center):", {
      //   x: outerModelWorldPosition.x,
      //   y: outerModelWorldPosition.y,
      //   z: outerModelWorldPosition.z,
      // });
      // console.log("Desk Y-axis in world space (rotation axis):", {
      //   x: outerModelWorldYAxis.x,
      //   y: outerModelWorldYAxis.y,
      //   z: outerModelWorldYAxis.z,
      //   length: outerModelWorldYAxis.length(),
      // });
    }, 100);
  }, [groupRef]);

  // Smooth reset to initial position
  const smoothResetToInitialPosition = () => {
    const controls = controlsRef.current;
    const group = groupRef.current;

    if (!controls || !group) return;

    setIsResetting(true);

    // Reset camera position and target smoothly using GSAP
    const currentPosition = controls.object.position.clone();
    const currentTarget = controls.target.clone();

    const targetPosition = new THREE.Vector3(...initialCameraConfigs.position);
    const targetTarget = new THREE.Vector3(...initialCameraConfigs.target);

    // Animate camera position
    gsap.to(currentPosition, {
      duration: autoRotationConfigs.resetDuration / 1000,
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
      duration: autoRotationConfigs.resetDuration / 1000,
      x: targetTarget.x,
      y: targetTarget.y,
      z: targetTarget.z,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.target.copy(currentTarget);
        controls.update();
      },
      onComplete: () => {
        setIsResetting(false);
        setIsAutoRotating(true);
      },
    });

    // Reset group rotation and position smoothly to maintain world-space rotation
    const currentMatrix = group.matrix.clone();
    const targetMatrix = new THREE.Matrix4();
    targetMatrix.identity(); // Reset to identity matrix

    // Apply the responsive scale
    const groupScale = responsiveConfig.isMobile ? responsiveConfig.mobileScale : 1;
    targetMatrix.makeScale(groupScale, groupScale, groupScale);

    // Animate matrix transformation
    const progress = { value: 0 };
    const startMatrix = currentMatrix.clone();

    gsap.to(progress, {
      duration: autoRotationConfigs.resetDuration / 1000,
      value: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        // Manually interpolate matrix elements since Matrix4 doesn't have lerp
        const lerpedMatrix = new THREE.Matrix4();
        const startElements = startMatrix.elements;
        const targetElements = targetMatrix.elements;

        for (let i = 0; i < 16; i++) {
          lerpedMatrix.elements[i] = THREE.MathUtils.lerp(
            startElements[i],
            targetElements[i],
            progress.value
          );
        }

        group.matrix.copy(lerpedMatrix);
        group.matrixAutoUpdate = false;
      },
      onComplete: () => {
        group.matrixAutoUpdate = true;
        group.matrix.identity();
        group.scale.set(groupScale, groupScale, groupScale);
        group.position.set(0, 0, 0);
        group.rotation.set(0, 0, 0);
      },
    });
  };

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
      }, autoRotationConfigs.pauseDuration);
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
  }, [controlsRef, isResetting]);

  // Auto-rotation frame loop - rotates around the outer model's Y-axis
  useFrame((_state, delta) => {
    const group = groupRef.current;
    const rotationAxis = rotationAxisRef.current;
    const rotationCenter = rotationCenterRef.current;

    if (!group || !isAutoRotating || isResetting || !rotationAxis || !rotationCenter) return;

    // Calculate rotation angle for this frame
    const rotationAngle = autoRotationConfigs.speed * delta * 60;

    // Create rotation matrix around the outerModel's Y-axis
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(rotationAxis, rotationAngle);

    // Translate to outerModel center, rotate, then translate back
    const translationToCenter = new THREE.Matrix4();
    translationToCenter.makeTranslation(-rotationCenter.x, -rotationCenter.y, -rotationCenter.z);

    const translationBack = new THREE.Matrix4();
    translationBack.makeTranslation(rotationCenter.x, rotationCenter.y, rotationCenter.z);

    // Combine transformations: translate to outerModel center -> rotate around outerModel's Y-axis -> translate back
    const finalMatrix = new THREE.Matrix4();
    finalMatrix.multiplyMatrices(translationBack, rotationMatrix);
    finalMatrix.multiplyMatrices(finalMatrix, translationToCenter);

    // Apply the transformation to the group
    group.applyMatrix4(finalMatrix);
  });

  return null;
};

export default AutoRotationController;
