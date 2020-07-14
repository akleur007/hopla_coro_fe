module.exports = {
  devServer: {
    https: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
  pwa: {
    themeColor: '#1e2b37',
    msTileColor: '#1e2b37',
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#1e2b37',
    },
  },
  /* build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
  }, */
};
