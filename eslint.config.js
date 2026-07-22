import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactCompiler from 'eslint-plugin-react-compiler'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    { settings: { react: { version: '19' } } },
    prettierRecommended,
    reactCompiler.configs.recommended,
    {
        files: ['**/*.{js,ts,tsx}'],
        plugins: {
            perfectionist,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@next/next/no-img-element': 'off',
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-check': true,
                    'ts-expect-error': false,
                    'ts-ignore': true,
                    'ts-nocheck': true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    varsIgnorePattern: '^_',
                },
            ],
            'import/no-anonymous-default-export': 'off',
            'perfectionist/sort-enums': ['error', { type: 'natural' }],
            'perfectionist/sort-heritage-clauses': [
                'error',
                { type: 'natural' },
            ],
            'perfectionist/sort-interfaces': ['error', { type: 'natural' }],
            'perfectionist/sort-intersection-types': [
                'error',
                { type: 'natural' },
            ],
            'perfectionist/sort-object-types': ['error', { type: 'natural' }],
            'perfectionist/sort-objects': ['error', { type: 'natural' }],
            'perfectionist/sort-switch-case': ['error', { type: 'natural' }],
            'perfectionist/sort-union-types': ['error', { type: 'natural' }],
            'perfectionist/sort-variable-declarations': [
                'error',
                { type: 'natural' },
            ],
            'react-hooks/set-state-in-effect': 'off',
            'react/display-name': 'off',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-no-bind': 'off', // Memoized by React Compiler
            'react/jsx-sort-props': [
                'warn',
                {
                    reservedFirst: true,
                    shorthandLast: true,
                },
            ],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
                },
            ],
        },
    },
])
