const path = require('path');
module.exports = {
	// установим точку входа
	entry: './src/index.js',
	// точка выхода
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	mode: 'production',
	module:{
		// правила
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
					},
				},
				exclude: /node_modules/,
			}
		]
	}
};
