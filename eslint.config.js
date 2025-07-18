import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      "build/**/*",
      "coverage/**/*",
      "*.min.js",
      "*.min.css",
      ".next/**/*",
      ".vite/**/*",
      "public/**/*",
    ],
  },
  {
    // Base configuration for all TypeScript/JavaScript files
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // Must be last to override other formatting rules
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // Remove type information requirements for config files
        project: null,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      tailwindcss,
    },
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        config: "tailwind.config.js",
      },
    },
    rules: {
      // JavaScript/General Rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-unused-vars": "off", // Handled by TypeScript
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "no-duplicate-imports": "error",

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      // React Rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/hook-use-state": "warn",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-closing-tag-location": "error",
      "react/jsx-curly-spacing": ["error", "never"],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: true,
          allowBind: false,
          ignoreRefs: true,
        },
      ],
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      "react/no-unknown-property": "off",
      "react/prop-types": "off", // Using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/self-closing-comp": "error",

      // React Refresh Rules
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Tailwind CSS Rules
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "error",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/migration-from-tailwind-2": "error",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-contradicting-classname": "error",
    },
  },
  {
    // Specific rules for TypeScript files with project configuration
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: ".",
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
    },
  },
  {
    // Configuration files - no type checking
    files: ["**/*.config.{js,ts}", "vite.config.ts", "tailwind.config.js", "eslint.config.js"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: null, // Disable project-based linting for config files
      },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "no-console": "off",
    },
  }
);
