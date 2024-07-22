module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/recommended",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-useless-escape": "off",
    "no-debugger": "warn",
    "vue/no-unused-components": "off",
    "vue/html-self-closing": "off",
    "vue/no-v-html": "off",
    "no-constant-condition": "off",
    'no-console':"off",
    'vue/name-property-casing':"off",
    'vue/require-default-prop':"off",
    'vue/no-confusing-v-for-v-if':"off",
    'vue/require-v-for-key':"warn",
    'vue/html-indent':'off',
    "vue/max-attributes-per-line": [
      "warn",
      {
        "singleline": 10,
        "multiline": {
          "max": 1,
          "allowFirstLine": true
        }
      }
    ]
  }
}