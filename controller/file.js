import models from '../models'
class File {
	constructor(props) {

	}
	async upload(req, res, next){
		// fs.renameSync(req.file.path, `public/upload/${req.file.originalname}`)
		// res.send(req.file)
		const userId = req.body.userId,current = req.body.current
		//循环处理
            var fileArr=[];
            req.files.forEach(function (i) {
				//获取临时文件的存储路径
                fileArr.push(
					{
						fileUrl:i.path,
						fileSize:i.size,
						fileName:i.filename,
						userId:userId,
						current:current
					});
			});
			models.file.bulkCreate(fileArr).then((data)=> {
				res.send({
					msg: '上传成功',
					code: 1,
					data: data
				});
			  }).catch(next);
	}
	async queryFile(req,res,next){
		const userId = req.query.userId
		models.file.findAll({
			where: {
				userId: `${userId}`
			},
		}).then(data=>{
			res.send({
					code:1,
					data:data
				})

		}).catch(next);
	}
	
}


export default new File()