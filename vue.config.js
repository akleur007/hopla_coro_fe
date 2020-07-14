import GenerateSW from 'workbox-webpack-plugin';

module.exports = {
  devServer: {
    https: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',

  configureWebpack: {
    plugins: [new GenerateSW()],
  },
  /* build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
  }, */
};
