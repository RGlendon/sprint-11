const path = require('path');                   // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // добавили плагин

module.exports = {                              // module.exports — это синтаксис экспорта в Node.js
    entry: { main: './src/index.js' },          // указали первое место куда заглянет webpack — файл index.js в папке src
    output: {                                   // указали в какой файл будет собирться весь js и дали ему имя
        path: path.resolve(__dirname, 'dist'),  // переписали точку выхода, используя утилиту path
        filename: '[name].[chunkhash].js'       // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
    },
    module: {
        rules: [                                // тут описываются правила
            {
                test: /\.js$/,                  // регулярное выражение, которое ищет все js файлы
                exclude: /node_modules/,        // исключает папку node_modules
                use: {
                    loader: "babel-loader"      // весь JS обрабатывается пакетом babel-loader
                }
            },
            {
                test: /\.css$/,                 // применять это правило только к CSS-файлам
                use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // добавили минификацию CSS
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //
            filename: 'style.[contenthash].css', // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
        }),
        new HtmlWebpackPlugin({
            inject: false,                      // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html',       // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html'              // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new WebpackMd5Hash()
    ]
};