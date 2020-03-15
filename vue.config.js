module.exports = {
  devServer: {
    open: true,
    hot: true,
    proxy: {
      '/': {
        target: 'http://www.kaico.site:1819/orderingmeals/',
        pathRewrite: { '^/': '' }
      }
    }
  },
  lintOnSave: false

  // rules: [
  //   {
  //     test: /\.less$/,
  //     loader: 'style-loader!css-loader!less-loader'
  //   }
  // ]

}
