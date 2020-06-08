/*
  es5，用module.exports，用require引入模块。
  es6，1.export对外指定名字变量 引入：import {方法} from 
      2.export default{}  import 文件 from 调用：文件名.函数方法或变量
      3.export default function () {  //import 自定义函数名 from 
        console.log('foo');
      } 
      4.

  使用ipmort配置babel转义为es5
*/
import http from 'http'
import path from 'path'
import express from 'express';
import config from 'config-lite';//配置不同环境，config目录默认default,最新版本3.0获取不到信息
import history from 'connect-history-api-fallback';//前端路由设置mode:history
import chalk from 'chalk';//颜色工具
import bodyParser from 'body-parser' //接受body参数
import router from './routers/index';

const debug = require('debug')('express-sequelize');
const models = require('./models'); //数据模型

const app = express();

app.disable('etag');//处理接口缓存时会返回304
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//使用JSON解析工具
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
router(app);//必须放在bodyParser后面才能获取到参数
app.use(history())

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);
  models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(config.port, function() {
      debug(chalk.green('Express server listening on port ' + server.address().port));
    });
    server.on('error', onError);
    server.on('listening', onListening);
  });
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  