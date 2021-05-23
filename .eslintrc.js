module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'require-jsdoc': 'off',
    'max-len': 'off',
  },
};
