import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['.next/**', '**/*.d.ts', 'node_modules/**', 'dist'],
    },
    {
        plugins: {
            '@stylistic': stylistic,
            prettier: prettier,
        },
        rules: {
            '@stylistic/indent': 'off',
            '@stylistic/semi': 'off',
            '@stylistic/no-trailing-spaces': 'off',
            '@stylistic/eol-last': 'off',
            '@stylistic/max-len': 'off',

            'prettier/prettier': [
                'error',
                {
                    printWidth: 150,
                },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.recommended, eslintConfigPrettier],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            'unused-imports': unusedImports,
            prettier: prettier,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            'prettier/prettier': [
                'error',
                {
                    printWidth: 120,
                    singleAttributePerLine: true,
                    jsxBracketSameLine: false,
                    bracketSameLine: false,
                },
            ],
        },
    }
);
