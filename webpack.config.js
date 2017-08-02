var path = require('path')
const PATHS = {
  js: path.join(__dirname, 'views'),
  build: path.join(__dirname, 'build')
}

module.exports = {
   entry: ["babel-polyfill",'./src/app.js'],
  output: {
    path: './',
    filename: 'public/build/bundle.min.js',
  },
  // plugins: [
  //   new CommonsChunkPlugin({
  //     filename: "commons.js",
  //     name: "commons"
  //   })
  // ],
  //watch:true,
  module:{
    // noParse: [
    //   /node_modules\/sinon\//,
    // ],
    noParse: /node_modules\/roving-index\/index.js/,
    loaders:[
      {
        text: /\.(es6|js|jsx)$/,
        exclude: /node_modules|public/,
        //include: __dirname + '/views',
        loader: "babel",
        query: {
          "presets": ["react", "es2015"]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader',
      },
      // {
      //   text: /\.css$/,
      //   exclude: /node_modules/,
      //   //loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      //   loader: "style-loader!css-loader"
      //   //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      // }
    ]
  },

  resolve :{
    extensions : ['','.js','.jsx'],
    alias: {
           'jquery' : "jquery/src/jquery",
           //'sinon' : 'sinon/pkg/sinon'
       }
  },
  // plugins: [
  //   new ExtractTextPlugin('ivantage.css')
  // ],
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true
  }
}