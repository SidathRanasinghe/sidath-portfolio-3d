export interface CameraConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  fov: number;
  target: [number, number, number];
  distance: number;
}

export interface ControlsConfig {
  enablePan: boolean;
  enableZoom: boolean;
  maxDistance: number;
  minDistance: number;
  maxPolarAngle: number;
  minPolarAngle: number;
  enableDamping: boolean;
  dampingFactor: number;
}

export interface ResponsiveConfig {
  isMobile: boolean;
  isTablet: boolean;
  mobileScale: number;
}

export interface AutoRotationConfigs {
  speed: number;
  pauseDuration: number;
  resetDuration: number;
}
