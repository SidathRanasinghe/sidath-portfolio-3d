/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Three.js module declaration for better TypeScript support
declare module "*.glb" {
  const src: string;
  export default src;
}

declare module "*.gltf" {
  const src: string;
  export default src;
}

declare module "*.hdr" {
  const src: string;
  export default src;
}

declare module "*.exr" {
  const src: string;
  export default src;
}
