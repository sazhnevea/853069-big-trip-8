const path = require(`path`);

module.exports = {
  mode: `development`, // режим сборки
  entry: `./src/main.js`, // точка входа приложения
  output: { // настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  devtool: `source-map`, // подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, `public`), // где искать сборку
    publicPath: `http://localhost:8080`, // веб адрес сборки
    hot: true, // автоматическая перезагрузка страницы
    compress: true // сжатие
  }
};
