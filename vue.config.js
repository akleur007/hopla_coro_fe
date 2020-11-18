module.exports = {
  devServer: {
    https: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
  configureWebpack: {
    plugins: [],
  },
  pwa: {
    name: 'hopla app',
    themeColor: '#1e2b37',
    msTileColor: '#1e2b37',
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#1e2b37',
    },
  },
};
