import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['src/scripts/vendor/**'],
  },
  js.configs.recommended,
  {
    files: ['src/scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
