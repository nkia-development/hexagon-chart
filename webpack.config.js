/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "HexagonChart",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts와 .tsx 확장자를 가진 모든 파일을 대상으로 합니다.
        use: "ts-loader",
        exclude: [/node_modules/, /test/], // node_modules 폴더와 test 폴더를 제외합니다.

        // 로더를 설정합니다. (https://webpack.kr/configuration/module/#ruleloader) (https://webpack.js.org/loaders/)
      },
      {
        test: /\.(js|jsx)$/, // .js와 .jsx 확장자를 가진 모든 파일을 대상으로 합니다.
        exclude: [/node_modules/, /test/], // node_modules 폴더와 test 폴더를 제외합니다.
        use: {
          // 로더를 설정합니다. (https://webpack.kr/configuration/module/#ruleloader) (https://webpack.js.org/loaders/)
          loader: "babel-loader",
          options: {
            // babel-loader가 제공하는 옵션입니다. (https://webpack.js.org/loaders/babel-loader/#options)
            // babel.config.js 파일을 참고합니다. (https://babeljs.io/docs/en/configuration)
            // presets에 대한 정보는 https://babeljs.io/docs/en/presets#docsNav 를 참고합니다.
            // @babel/preset-env는 ES6+ 코드를 ES5로 변환합니다.
            // @babel/preset-react는 React 코드를 변환합니다.
            // 로더 실행 순서는, 아래 배열의 가장 마지막 항목부터 실행됩니다. 역순으로 실행됩니다. 1. @babel/preset-react 2. @babel/preset-env 이 순서대로 실행됨
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  externals: {
    react: "react",
  },
};
