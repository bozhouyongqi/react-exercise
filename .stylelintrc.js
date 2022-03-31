module.exports = {
  extends: [
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  overrides: [{ files: ['**/*.less'], customSyntax: 'postcss-less' }],
};
