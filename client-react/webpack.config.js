const path = require('path')

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin")

const exclude_var = /node_modules/

const srcPath = path.resolve(__dirname, 'src')
const buildPath = path.resolve(__dirname, 'build')

function outputPathByDevice(device) {
    if(device === "WEB") return path.join(buildPath, 'web')
    if(device === "WEBVIEW") return path.join(buildPath, 'webview')
}


module.exports = (env) => {

    const mode = env.MODE
    const device = env.DEVICE

    return {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                app: path.resolve(__dirname, 'src', 'app'),
                pages: path.resolve(__dirname, 'src', 'pages'),
                widgets: path.resolve(__dirname, 'src','widgets'),
                features: path.resolve(__dirname, 'src', 'features'),
                entities: path.resolve(__dirname, 'src', 'entities'),
                shared: path.resolve(__dirname, 'src', 'shared')
            },
        },
        output: {
            filename: "[name].[contenthash].bundle.js",
            assetModuleFilename: "assets/[name][ext]",
            sourceMapFilename: "[name].js.map",
            path: outputPathByDevice(device),
            publicPath: device === "WEBVIEW" ? "./" : "/",
            clean: true
        },
        mode: mode === "PROD" ? "production" : "development",
        optimization: {
            minimize: mode === "PROD",
            minimizer: mode === "PROD" ? [
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify
                })
            ] : []
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'src')
            },
            historyApiFallback: true,
            compress: false,
            port: 3000,
            open: true,
            hot: true,
            client: {
                reconnect: true
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                favicon: path.resolve(__dirname, 'public', 'assets', 'favicon.png'),
                minify: false,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].bundle.css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: exclude_var,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
                },
                {
                    test: /\.[cm]js?x?$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: exclude_var,
                    use: ['swc-loader']
                },
                {
                    test: /\.tsx?/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: exclude_var,
                    use: ['swc-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource'
                },
            ]
        }
    }
}