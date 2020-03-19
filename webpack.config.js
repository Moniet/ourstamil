const path = require('path')

module.exports = {
	mode: 'production',
	entry: {
		main: './public/assets/js/main.js',
		create: './public/assets/js/create-form.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/dist')
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
