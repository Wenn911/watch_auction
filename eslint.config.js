import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['.next/**', '**/*.d.ts', 'node_modules/**', 'dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
    ],
    plugins: {
      'react': pluginReact,
      'react-hooks': pluginReactHooks,
      'unused-imports': unusedImports,
    },
    rules: {
      // Автоудаление неиспользуемых импортов
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { 
          vars: 'all', 
          varsIgnorePattern: '^_', 
          args: 'after-used', 
          argsIgnorePattern: '^_' 
        }
      ],
      
      // TypeScript
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
)