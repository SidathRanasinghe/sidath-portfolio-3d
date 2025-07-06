/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  const isDevelopment = mode === "development";

  return {
    plugins: [react()],
    // Base URL - only use repository path for production GitHub Pages
    base: isProduction ? "/sidath-portfolio-3d/" : "/",
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
      // Only apply production optimizations in production
      ...(isProduction && {
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
        // Generate source maps only in production
        sourcemap: true,
        // Optimize for production
        minify: "esbuild",
        // Ensure all assets are properly handled
        assetsDir: "assets",
      }),
      // Development build settings
      ...(isDevelopment && {
        sourcemap: true,
        minify: false,
      }),
    },
    // Development server configuration
    server: {
      port: 3000,
      open: true,
      // Ensure proper asset serving in development
      fs: {
        strict: false,
      },
    },
    // Preview server configuration (for testing production build locally)
    preview: {
      port: 4173,
      open: true,
    },
  };
});
