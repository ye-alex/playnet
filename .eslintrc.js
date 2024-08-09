module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    // eslint-disable-next-line quote-props
    extends: ['react-app', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['react', 'react-hooks'],
    rules: {
        'react/prop-types': 0,
        'sort-imports': 0,
        '@typescript-eslint/no-empty-function': 0,
        'react/display-name': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 0,
        'quote-props': ['warn', 'as-needed', { keywords: true, unnecessary: false }],
        '@typescript-eslint/explicit-function-return-type': 'error',
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: ['if', 'return'] },
            { blankLine: 'always', prev: 'block-like', next: '*' },
            { blankLine: 'always', prev: ['const', 'let'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        ],
        '@typescript-eslint/no-unused-vars': 2,
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
            },
        ],
    },
};
