'use strict';

import file from './file'
import user from './user'
import wechat from './wechat'
import inviteeInfo from './inviteeInfo'

export default app => { //导出函数，app.js 调用router(app)传入app
	app.use('/file', file);
	app.use('/user', user);
	app.use('/wechat', wechat);
	app.use('/inviteeInfo', inviteeInfo);
}