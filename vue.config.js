const path = require('path');
const vueSrc = './src';

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, vueSrc),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  },
  productionSourceMap: false,
};
