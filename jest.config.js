// "jest": {
//   "setupFiles": [
//     "jest-canvas-mock"
//   ],

//   "transform": {
//     ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
//     "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
//   },

// },

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}'],
  setupFiles: ['jest-canvas-mock'],
};
