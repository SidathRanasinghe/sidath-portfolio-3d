/* eslint-disable no-console */
/**
 * Asset utility functions to handle different environments
 */

/**
 * Get the correct base URL for assets based on environment
 */
export const getBaseUrl = (): string => {
  // In development, use root path
  if (import.meta.env.MODE === "development") {
    return "";
  }

  // In production, use the configured base URL
  return import.meta.env.VITE_BASE_URL || "/sidath-portfolio-3d/";
};

/**
 * Get the full path for an asset
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // In development, assets are served from root
  if (import.meta.env.MODE === "development") {
    return `/${cleanPath}`;
  }

  // In production, prepend the base URL
  const baseUrl = getBaseUrl();
  return `${baseUrl}${cleanPath}`;
};

/**
 * Get the path for public assets (images, models, etc.)
 */
export const getPublicAssetPath = (path: string): string => {
  return getAssetPath(path);
};

/**
 * Get the path for images
 */
export const getImagePath = (imagePath: string): string => {
  // Remove 'images/' prefix if present, we'll add it
  const cleanPath = imagePath.startsWith("images/") ? imagePath : `images/${imagePath}`;

  return getPublicAssetPath(cleanPath);
};

/**
 * Get the path for 3D models
 */
export const getModelPath = (modelPath: string): string => {
  // Remove 'models/' prefix if present, we'll add it
  const cleanPath = modelPath.startsWith("models/") ? modelPath : `models/${modelPath}`;

  return getPublicAssetPath(cleanPath);
};

/**
 * Log asset paths for debugging
 */
export const debugAssetPath = (path: string): void => {
  if (import.meta.env.VITE_DEBUG === "true") {
    console.log(`Asset path: ${path} -> ${getAssetPath(path)}`);
  }
};

/**
 * Preload an asset (useful for 3D models and large images)
 */
export const preloadAsset = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fullPath = getAssetPath(path);

    // For images
    if (path.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = fullPath;
    }
    // For other assets, use fetch
    else {
      fetch(fullPath)
        .then(() => resolve())
        .catch(reject);
    }
  });
};

/**
 * Batch preload multiple assets
 */
export const preloadAssets = (paths: string[]): Promise<void[]> => {
  return Promise.all(paths.map(preloadAsset));
};
