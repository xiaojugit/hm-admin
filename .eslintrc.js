// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    // parser: 'babel-eslint',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: [
        "plugin:vue/essential"
    ],
    // required to lint *.vue files
    // plugins: [
    //     'html'
    // ],
    // add your custom rules here
    'rules': {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, {
            'x-invalid-end-tag': false
        }],
        'no-undef': 'off',
        'camelcase': 'off'
    }
}