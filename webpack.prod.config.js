const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: {
		polyfill: 'babel-polyfill',
		app: './src/App.jsx'
	},
	output: {
		path: path.resolve(__dirname, './build'),
		publicPath: '/',
		filename: '[name].[chunkhash].bundle.js'
	},
	devServer: {
		contentBase: './build'
	},
	mode: 'production',
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
		alias: {
			'@base': __dirname,
			'@': path.resolve(__dirname, 'src/'),
			'@redux': path.resolve(__dirname, 'src/redux/'),
			'@shared': path.resolve(__dirname, 'src/components/shared'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@env': path.resolve(__dirname, 'src/env/env.production.js'),
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					babelrcRoots: ['.', '../']
				}
			},
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['eslint-loader']
			},
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
				],
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader'
			},
			{
				test: /\.png$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: 'images/[hash]-[name].[ext]'
					},
				}]
			}
		]
	},
	performance: {
		hints: false
	},
	node: {
		fs: 'empty'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: './src/assets/images',
				to: 'assets/images'
			},
			{
				from: './src/favicon.ico',
				to: 'favicon.ico'
			},
			{
				from: './.htaccess',
			},
			{
				from: './src/services/data',
				to: 'services/data'
			}
		], {
			ignore: []
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
			ignoreOrder: false,
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: 'react', chunks: 'all' },
				vendors: {
					test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: -10,
					minSize: 3e+5,
					maxSize: 5e+5,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
}