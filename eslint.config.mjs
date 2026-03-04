// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import unicorn from 'eslint-plugin-unicorn'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    plugins: {
      unicorn,
    },
    rules: {
      // Vue naming conventions - kebab-case for files
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'new', '[id]', 'admin'],
        },
      ],
      // Enforce kebab-case for component names
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      // Enforce kebab-case filenames (allow Nuxt route brackets)
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['^\\[.*\\]$'],
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/comma-dangle': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/arrow-parens': 'off',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      '@stylistic/comma-dangle': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  }
)
