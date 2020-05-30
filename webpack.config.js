const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {  //generate optimization objects
    const config = {
        splitChunks: {
            chunks: 'all'  //optimization code(no reply), vendors is common between files
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
    return config
}

const babelOptions = (preset) => {
    const options = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if (preset) options.presets.push(preset)
    return options
}

const plugins = () => {
    base =  [
        new HTMLWebpackPlugin({  //auto add tags with src
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),  //clean dist folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]
    if (isProd) {
       base.push(new BundleAnalyzerPlugin())
    }
    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        anal: './anal.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.svg'],
        alias: {   // just a alias for path
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 8800,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',  //add source map to bundle 
    plugins: plugins(),
    module: {
        rules: [
            { //all imports with these extensions will be processed with this loaders
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/, //regexp sass scss
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            }
        ]
    }
}