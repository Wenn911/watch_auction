import stylistic from '@stylistic/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['.next/**', "next.config.ts", '**/*.d.ts', 'node_modules/**', 'dist', '*.js', "drizzle.config.ts"],
    },
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/indent': 'off',
            '@stylistic/semi': 'off',
            '@stylistic/no-trailing-spaces': 'off',
            '@stylistic/eol-last': 'off',
            '@stylistic/max-len': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            tseslint.configs.recommended,
            pluginReact.configs.flat.recommended,
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-key': 'error',
            'react/no-array-index-key': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            '@stylistic/jsx-child-element-spacing': 'off',
            '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
            '@stylistic/jsx-closing-tag-location': 'error',
            '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            '@stylistic/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
            '@stylistic/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
            '@stylistic/jsx-equals-spacing': ['error', 'never'],
            '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
            '@stylistic/indent': ['error'],
            '@stylistic/jsx-indent-props': ['error', 4],
            '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
            '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/jsx-self-closing-comp': 'error',
            '@stylistic/jsx-sort-props': ['error', {
                callbacksLast: true,
                shorthandFirst: true,
                multiline: 'last',
                reservedFirst: true,
            }],
            '@stylistic/jsx-tag-spacing': ['error', {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never'
            }],
            '@stylistic/jsx-wrap-multilines': ['error', {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            }],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
);