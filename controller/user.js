
import models from '../models'

class User {
	constructor(props) {

	}
	async getUserById(req, res, next){
		const id = req.query.id;
		models.user.findAll({
			where: {
				id: `${id}`
			},
		}).then((data)=> {
			res.send({
				code: 1,
				data: data
			});
		  }).catch(next);

	}
	
}


export default new User()