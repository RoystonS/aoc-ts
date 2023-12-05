module.exports = {
  env: {
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "no-useless-concat": "error",
    "eol-last": ["error", "always"],
    "template-curly-spacing": ["error", "never"],
    "no-multiple-empty-lines": "off",
    "no-constant-condition": ["error", { checkLoops: false }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
  },
};
