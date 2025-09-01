import css from '@eslint/css';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import oxlint from 'eslint-plugin-oxlint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const DEV = process.env.NODE_ENV !== 'production';

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          // Multiple tsconfigs/jsconfigs (Useful for monorepos, but discouraged in favor of `references` supported)
          project: [
            'tsconfig.json',
            './**/*/tsconfig.json',
          ],
        }),
      ],
    },
  },

  {
    plugins: {
      // @ts-expect-error - bad types but this is how the docs say to do it
      'import-x': importX,
    },
    extends: ['import-x/flat/recommended'],
    rules: {
      'import-x/no-dynamic-require': 'warn',
    },
  },

  {
    files: ['**/*.{js,ts,tsx}'],
    ...stylistic.configs.customize({
      semi: true,
      arrowParens: true,
    }),
  },

  ...oxlint.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.{js,ts,tsx}'],
  })),

  {
    name: '@typescript-eslint overrides',
    files: ['**/*.{ts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-empty-object-type': ['warn'],
    },
  },

  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      'no-console': DEV ? ['warn'] : ['error'],
      'object-shorthand': ['error'],
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling', 'index', 'internal', 'unknown']],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          named: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },

  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'], languageOptions: { globals: globals.browser } },

  tseslint.configs.recommended,

  {
    files: ['**/*.tsx'],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      ...pluginReact.configs.flat.recommended.plugins,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  { files: ['**/*.json'], plugins: { json }, language: 'json/json' },

  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm' },

  { files: ['**/*.css'], plugins: { css }, language: 'css/css' },

  {
    name: 'force ignored',
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/.vscode/**',
    ],
  },
]);
