import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  // Base URL for GitHub Pages
  base: "/sidath-portfolio-3d/", // Repository name
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  optimizeDeps: {
    include: ["@radix-ui/react-slot", "three", "@react-three/fiber", "@react-three/drei"],
  },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ["react", "react-dom"],
          three: ["three"],
          "react-three": ["@react-three/fiber", "@react-three/drei"],
          gsap: ["gsap", "@gsap/react"],
          ui: ["@radix-ui/react-slot", "lucide-react"],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
        // Ensure consistent file naming
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Ensure source maps are generated for debugging
    sourcemap: true,
    // Optimize for production
    minify: "esbuild",
    // Ensure all assets are properly handled
    assetsDir: "assets",
  },
  // Development server configuration
  server: {
    port: 3000,
    open: true,
  },
  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },
});
