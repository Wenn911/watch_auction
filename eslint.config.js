import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import pluginImport from 'eslint-plugin-import'

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/coverage/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      stylistic.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
      pluginReactHooks.configs['recommended-latest'],
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
    ],
    settings: { react: { version: 'detect' } },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'pathGroups': [
          {
            pattern: '{react,react-dom,react-router}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '$assets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '$*{,/**}',
            group: 'internal',
          },
        ],
        'distinctGroup': true,
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      // Изучить подробнее документацию typescript-eslint раздел perfomance и решить что с ними делать
      'import/no-named-as-default': 'off',
      'import/no-cycle': 'off',
      'import/no-unused-modules': 'off',
      'import/no-deprecated': 'off',
      // Правила ниже были отключены для плавного перехода на ESLint 9
      // @stylistic
      '@stylistic/no-tabs': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/member-delimiter-style': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/eol-last': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/no-multi-spaces': 'off',
      '@stylistic/jsx-indent-props': 'off',
      '@stylistic/quote-props': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/no-mixed-spaces-and-tabs': 'off',
      // @typescript-eslint
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/prefer-literal-enum-member': 'off',
      // react
      'react/no-unknown-property': 'off',
      'react/display-name': 'off',
    },
  },
)
