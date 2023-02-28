module.exports = {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['src/**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    // 'property-no-unknown': null,
  },
};
