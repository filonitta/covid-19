const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CSSLoader = {
	loader: 'css-loader',
	options: {
		modules: false,
		sourceMap: true,
	}
};

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: ['babel-polyfill', './src/App.jsx'],
	output: {
		path: path.resolve(__dirname, './'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
		contentBase: 'src',
		hot: true,
		https: false,
	},
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@base': __dirname,
			'@': path.resolve(__dirname, 'src/'),
			'@redux': path.resolve(__dirname, 'src/redux/'),
			'@shared': path.resolve(__dirname, 'src/components/shared'),
			'@env': path.resolve(__dirname, 'src/env/env.development.js'),
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					babelrcRoots: ['.', '../'],
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
				use: ['style-loader', CSSLoader],
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				use: [
					'style-loader',
					CSSLoader,
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
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html')
		})
	]
}