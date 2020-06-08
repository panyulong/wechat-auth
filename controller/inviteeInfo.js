import models from '../models'
class InviteeInfo {
	constructor(props) {

	}
	async createInviteeInfo(req, res, next){
		const body = req.body;
		console.log(body)
		models.inviteeInfo.create(body).then(()=> {
			res.send({
				msg: '提交成功',
				code: 1,
			});
			}).catch(next);
	}
}


export default new InviteeInfo()