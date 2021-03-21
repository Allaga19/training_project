const path = require('path');
module.exports = {
	// точка входа
	entry: './src/index.js',
	// точка выхода
	output: {
		filename: 'bundle.js',
		// папка куда хотим положить bundle, куда собираем проект
		path: path.resolve(__dirname, './dist')
	},
	mode: 'production',
	module: {
		rules: [   // набор правил
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					},
				},
				exclude: /node_modules/,
			}
		]
	}
};
