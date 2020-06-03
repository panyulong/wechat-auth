
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
import gm from 'gm' //图片处理工具


export default class BaseComponent {
	constructor(){
		this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
		this.imgTypeList = ['shop', 'food', 'avatar','default'];
		this.uploadImg = this.uploadImg.bind(this)
		this.qiniu = this.qiniu.bind(this)
	}

	async uploadImg(req, res, next){
		const type = req.params.type;
		try{
			//const image_path = await this.qiniu(req, type);
			const image_path = await this.getPath(req, res);
			res.send({
				status: 1,
				image_path,
			})
		}catch(err){
			console.log('上传图片失败', err);
			res.send({
				status: 0,
				type: 'ERROR_UPLOAD_IMG',
				message: '上传图片失败'
			})
		}
	}

	async getPath(req, res){
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm();
			form.uploadDir = './public/img';
			form.parse(req, async (err, fields, files) => {
				let img_id;
				try{
					img_id = await this.getId('img_id');
				}catch(err){
					console.log('获取图片id失败');
					fs.unlinkSync(files.file.path);
					reject('获取图片id失败');
				}
				const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + img_id;
				const extname = path.extname(files.file.name);
				if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
					fs.unlinkSync(files.file.path);
					res.send({
						status: 0,
						type: 'ERROR_EXTNAME',
						message: '文件格式错误'
					})
					reject('上传失败');
					return 
				}
				const fullName = hashName + extname;
				const repath = './public/img/' + fullName;
				try{
					fs.renameSync(files.file.path, repath);
					gm(repath)
					.resize(200, 200, "!")
					.write(repath, async (err) => {
						// if(err){
						// 	console.log('裁切图片失败');
						// 	reject('裁切图片失败');
						// 	return
						// }
						resolve(fullName)
					})
				}catch(err){
					console.log('保存图片失败', err);
					if (fs.existsSync(repath)) {
						fs.unlinkSync(repath);
					} else {
						fs.unlinkSync(files.file.path);
					}
					reject('保存图片失败')
				}
			});
		})
	}

	async qiniu(req, type = 'default'){
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm();
			form.uploadDir = './public/img';
			form.parse(req, async (err, fields, files) => {
				let img_id;
				try{
					img_id = await this.getId('img_id');
				}catch(err){
					console.log('获取图片id失败');
					fs.unlinkSync(files.file.path);
					reject('获取图片id失败')
				}
				const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + img_id;
				const extname = path.extname(files.file.name);
				const repath = './public/img/' + hashName + extname;
				try{
					const key = hashName + extname;
					await fs.rename(files.file.path, repath);
					const token = this.uptoken('node-elm', key);
					const qiniuImg = await this.uploadFile(token.toString(), key, repath);
					fs.unlinkSync(repath);
					resolve(qiniuImg)
				}catch(err){
					console.log('保存至七牛失败', err);
					fs.unlinkSync(files.file.path)
					reject('保存至七牛失败')
				}
			});

		})
	}
	uptoken(bucket, key){
		var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  		return putPolicy.token();
	}
	uploadFile(uptoken, key, localFile){
		return new Promise((resolve, reject) => {
			var extra = new qiniu.io.PutExtra();
		    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
			    if(!err) {  
			    	resolve(ret.key)
			    } else {
			    	console.log('图片上传至七牛失败', err);
			    	reject(err)
			    }
		  	});

		})
	}	
}