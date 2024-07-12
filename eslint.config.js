// eslint.config.js
import eslintConfig from "eslint-config-airbnb";
import prettierConfig from "./prettier.config.js";

export default [
  {
    ignores: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"], // Ignored files
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: "latest",
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/strict",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "prettier",
    ],
    plugins: [
      "react",
      "react-hooks",
      "@typescript-eslint",
      "jsx-a11y",
      "prettier",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-underscore-dangle": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".ts", ".tsx"],
        },
      ],
      "no-useless-catch": "off",
      quotes: ["error", "double"], // 쌍따옴표 사용
      "@typescript-eslint/quotes": ["error", "double"], // TypeScript에서 쌍따옴표 사용
      "prettier/prettier": [
        "error",
        {
          printWidth: 120,
          semi: true,
          trailingComma: "all",
          arrowParens: "avoid",
          htmlWhitespaceSensitivity: "css",
          jsxSingleQuote: false,
        },
      ],
    },
  },
];
