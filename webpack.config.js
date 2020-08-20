const path = require('path');

module.exports = {
  mode: 'development', // ����� ������
  entry: './src/main.js', // ����� ����� ����������
  output: {  // ��������� ��������� �����
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map', // ���������� sourcemaps
  devServer: {
    contentBase: path.join(__dirname, 'public'), // ��� ������ ������
    publicPath: 'http://localhost:8080/', // ��� ����� ������
    compress: true,  // ������
	// �������������� ������������ ��������
	// ���� �� �������� �� ������������ URL� � �������� �http:
	//localhost:8080�,
	// �� �������� � ���� �/webpack-dev-server/�: �http:
	//localhost:8080/webpack-dev-server/'
    watchContentBase: true,
  }
};