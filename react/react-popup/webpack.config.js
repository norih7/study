module.exports = {
    entry: './src/index.js',
    output: {
      filename: './dist/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
              loader: 'babel-loader'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
              loader: 'eslint-loader'
        }
      ]
    }
};