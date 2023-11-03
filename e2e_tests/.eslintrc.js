module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:playwright/playwright-test"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ["**/*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:playwright/playwright-test",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
      plugins: ["@typescript-eslint"],
      env: {
        es6: true,
        node: true,
      },
    },
  ],
};
