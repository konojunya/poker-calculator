module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "./node_modules/gts",
    "plugin:react/recommended",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "vitest",
    "import",
    "unused-imports",
    "react-refresh",
  ],
  ignorePatterns: [
    "node_modules",
    "dist",
    "openapi",
    "vite.config.ts",
    "vite-env.d.ts",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "warn",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    eqeqeq: [2, "allow-null"],
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-negative-index": "off",
    "node/no-unsupported-features/node-builtins": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
