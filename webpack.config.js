const path = require('path')

module.exports = {
	mode: 'production',
	entry: {
		main: './assets/js/main.js',
		create: './assets/js/create-form.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	}
}
