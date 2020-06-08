'use strict';
module.exports = {
	// 端口
	port: parseInt(process.env.PORT, 10) || 8080,
	// 数据库
	database: 'wedding',
	dialect: 'mysql',
	username: 'root',
	password: '',
	host: 'localhost',
	port: 3306,
}