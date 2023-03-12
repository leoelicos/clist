const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')

const mode = 'development'

const entryMain = './src/js/index.js'
const entryInstall = './src/js/install.js'
const entryCards = './src/js/cards.js'

const outputFilename = '[name].bundle.js'
const outputPath = path.resolve(__dirname, 'dist')

const htmlWebpackPluginTemplate = './index.html'
const htmlWebpackPluginTitle = 'Contact Cards'

const serviceWorkerSource = './src-sw.js'
const serviceWorkerDestination = 'src-sw.js'

const manifestName = 'ContactCards'
const manifestNameShort = 'Contact'
const manifestDescription = 'Never forget your contacts!'
const manifestBackgroundColor = '#225CA3'
const manifestThemeColor = '#255CA3'
const manifestStartURL = '/'
const manifestPublicPath = '/'
const manifestIconPath = path.resolve('src/images/logo.png')
const manifestIconSizes = [96, 128, 192, 256, 384, 512]
const manifestIconDestination = path.join('assets', 'icons')

const cssLoader = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
}

const es6Loader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
    }
  }
}

const loaders = [cssLoader, es6Loader]

const config = {
  mode,
  entry: {
    main: entryMain,
    install: entryInstall,
    cards: entryCards
  },
  output: {
    filename: outputFilename,
    path: outputPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlWebpackPluginTemplate,
      title: htmlWebpackPluginTitle
    }),
    new InjectManifest({
      swSrc: serviceWorkerSource,
      swDest: serviceWorkerDestination
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: manifestName,
      short_name: manifestNameShort,
      description: manifestDescription,
      background_color: manifestBackgroundColor,
      theme_color: manifestThemeColor,
      start_url: manifestStartURL,
      publicPath: manifestPublicPath,
      icons: [
        {
          src: manifestIconPath,
          sizes: manifestIconSizes,
          destination: manifestIconDestination
        }
      ]
    })
  ],
  module: {
    rules: loaders
  }
}

module.exports = () => config
