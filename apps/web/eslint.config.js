import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import TsEslint from 'typescript-eslint'

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * Базовая конфигурация ESLint для всех JS/TS файлов
 * @type {ESLintConfig}
 */
const baseConfig = {
  files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  plugins: {
    js,
    prettier: pluginPrettier,
    'simple-import-sort': pluginSimpleImportSort,
  },
  extends: ['js/recommended'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    'prettier/prettier': 'warn',

    // Правила сортировки импортов
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
}

/**
 * Конфигурация для TypeScript ESLint плагина
 * @type {FlatConfig.ConfigArray}
 */
const tsEslintConfig = TsEslint.configs.recommended

/**
 * Конфигурация React ESLint плагина с отключенным правилом react-in-jsx-scope
 * @type {ESLintConfig}
 */
const reactConfig = {
  ...pluginReact.configs.flat.recommended,
  rules: {
    ...pluginReact.configs.flat.recommended.rules,
    // Отключаем правило, требующее импорт React в файлах с JSX (не нужно для React 17+)
    'react/react-in-jsx-scope': 'off',
  },
}

/**
 * Основной экспорт конфигурации ESLint с объединёнными настройками
 */
export default defineConfig([baseConfig, tsEslintConfig, reactConfig])
