import fs from 'fs'

class File {
	constructor(props) {

	}
	async upload(req, res, next){
		console.log(req.body)
		console.log(req.query)
	// var _files = req.files.pics;
	// var item ,_name ,_tmp;
	// item = _files, _name=item.name;
	// if (_name && item.path) {//这里须要推断文件名和路径是否为空
	// 	var tmpPath = item.path, type = item.type ,extension_name = '',
	// 	tmp_name = (Date.parse(new Date()) / 1000) + '' + (Math.round(Math.random() * 9999));//生成随机名称
	// 	switch (type) {	//推断文件类型
	// 		case 'image/pjpeg': extension_name = 'jpg';  break;
	// 		case 'image/jpeg': extension_name = 'jpg'; break;
	// 		case 'image/gif': extension_name = 'gif'; break;
	// 		case 'image/png': extension_name = 'png'; break;
	// 		case 'image/x-png': extension_name = 'png'; break;
	// 		case 'image/bmp': extension_name = 'bmp'; break;
	// 		default: if(_name.indexOf('.')<=0) return;//其它文件则默认上传
	// 			else {
	// 				_tmp = _name.split('.');
	// 				extension_name = _tmp[_tmp.length-1]; break;
	// 		}
	// 	}
	// 	tmp_name = tmp_name + '.' + extension_name,
	// 	targetPath = 'public/upload/' + tmp_name,//设置上传路径
	// 	is = fs.createReadStream(tmpPath),
	// 	os = fs.createWriteStream(targetPath);
	// 	fs.unlinkSync(tmpPath); 
	// 		console.log('upload success : ',targetPath);
	// 		res.json({//设置返回值
	// 			error : 0,
	// 			url : 'upload/' + tmp_name,
	// 			title : tmp_name,
	// 			message : tmp_name
	// 		});
	// }
		// res.send({
		// 	status: 0,
		// 	type: 'INVALID_CART',
		// 	message: '无效的卡号'
		// })
	}
	
}


export default new File()