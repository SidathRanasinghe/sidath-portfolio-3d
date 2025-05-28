/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useRef, useEffect } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CameraConfig, ControlsConfig } from "./types";

// Component to track camera and controls changes
interface CameraTrackerProps {
  controlConfigs: ControlsConfig;
  initialCameraConfig: CameraConfig;
  isTablet: boolean;
  onCameraChange?: (config: CameraConfig) => void;
}

const CameraTracker = ({
  controlConfigs,
  initialCameraConfig,
  isTablet,
  onCameraChange,
}: CameraTrackerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const logAndUpdateCameraInfo = useCallback(() => {
    if (controlsRef.current && camera) {
      const newConfig: CameraConfig = {
        position: [
          Number(camera.position.x.toFixed(3)),
          Number(camera.position.y.toFixed(3)),
          Number(camera.position.z.toFixed(3)),
        ],
        rotation: [
          Number(camera.rotation.x.toFixed(3)),
          Number(camera.rotation.y.toFixed(3)),
          Number(camera.rotation.z.toFixed(3)),
        ],
        // @ts-expect-error
        fov: camera.fov,
        target: [
          Number(controlsRef.current.target.x.toFixed(3)),
          Number(controlsRef.current.target.y.toFixed(3)),
          Number(controlsRef.current.target.z.toFixed(3)),
        ],
        distance: Number(camera.position.distanceTo(controlsRef.current.target).toFixed(3)),
      };

      // Console logging for debugging
      console.log("=== CAMERA & CONTROLS INFO ===");
      console.log("Camera Position:", newConfig.position);
      console.log("Camera Rotation:", newConfig.rotation);
      console.log("Controls Target:", newConfig.target);
      console.log("Camera Distance from Target:", newConfig.distance);
      console.log("FOV:", newConfig.fov);

      // Copy-paste ready configuration
      console.log("=== COPY-PASTE READY CONFIG ===");
      console.log(`const CAMERA_CONFIG = {
        position: [${newConfig.position.join(", ")}] as [number, number, number],
        rotation: [${newConfig.rotation.join(", ")}] as [number, number, number],
        fov: ${newConfig.fov},
        target: [${newConfig.target.join(", ")}] as [number, number, number],
        distance: ${newConfig.distance},
      };`);

      // Callback for parent component
      if (onCameraChange) {
        onCameraChange(newConfig);
      }
    }
  }, [camera, onCameraChange]);

  // Log initial setup
  useEffect(() => {
    const timer = setTimeout(() => {
      logAndUpdateCameraInfo();
    }, 100);
    return () => clearTimeout(timer);
  }, [logAndUpdateCameraInfo]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={controlConfigs.enablePan}
      enableZoom={controlConfigs.enableZoom && !isTablet}
      maxDistance={controlConfigs.maxDistance}
      minDistance={controlConfigs.minDistance}
      maxPolarAngle={controlConfigs.maxPolarAngle}
      minPolarAngle={controlConfigs.minPolarAngle}
      target={initialCameraConfig.target}
      enableDamping={controlConfigs.enableDamping}
      dampingFactor={controlConfigs.dampingFactor}
      onChange={logAndUpdateCameraInfo}
      onEnd={logAndUpdateCameraInfo}
    />
  );
};

export default CameraTracker;
