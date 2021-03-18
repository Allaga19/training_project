const path = require('path');
module.exports = {
	// установим точку входа
	entry: './src/index.js',
	// точка выхода
	output: {
		filename: 'dev-bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	mode: 'development',
	devServer: {
		open: true,
		// port: 8070,
		hot: true,
		writeToDisk: true,
	},
	module: {
		// правила
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						// plugins: ["@babel/plugin-proposal-class-properties"]
					},
				},
				exclude: /node_modules/,
			}
		]
	}
};
