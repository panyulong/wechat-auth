'use strict';

import file from './file'

export default app => { //导出函数，app.js 调用router(app)传入app
	app.use('/file', file);
}