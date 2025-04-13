/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export const config = {
    // отступ в 2 пробела
    tabWidth: 2,
    // одинарные кавычки
    singleQuote: true,
    // длинна строки
    printWidth: 120,
    // опускать скобки вокруг единственного параметра стрелочной функции
    arrowParens: 'always',
    // без точек с запятой
    semi: false,
    // не переносить '>' на новую строку
    bracketSameLine: false,
    // по одному атрибуту на строку
    singleAttributePerLine: true,
    // все возможные запятые
    trailingComma: 'all',
    // сохранять оригинальные переводы строк
    endOfLine: 'auto',
};