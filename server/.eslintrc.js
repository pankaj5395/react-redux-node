module.exports = {
  env: {
    browser: true
  },
  extends: [
    "standard",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
