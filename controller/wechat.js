import https from 'https'; //node内置请求模块
let tokenRes = {}
//appID
const appID = `wx3343aa96ef214582`;
//appsecret
const appSerect = `655e1cc00423f8e49370c3ec5d162c27`;
//通过拿到的code和appID、app_serect获取access_token和open_id
function getAccessToken(code){
	return new Promise( (resolve, reject) => {
		let getAccessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` +
			`${appID}&secret=${appSerect}&code=${code}&grant_type=authorization_code`;
		https.get(getAccessUrl, (res) => {
			var resText = "";
			res.on('data', (d) => {
				resText += d;
			});
			res.on('end', () => {
				var resObj = JSON.parse(resText);
				resolve(resObj);
			});
		}).on('error', (e) => {
			console.error(e);
		});
	});
}
//通过上一步获取的access_token和open_id获取userInfo即用户信息
function getUserInfo(access_token, open_id) {
    return new Promise( (resolve, reject) => {
        let getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`;
        https.get(getUserUrl, (res) => {
            var resText = "";
            res.on('data', (d) => {
                resText += d;
            });
            res.on('end', () => {
                var userObj = JSON.parse(resText);
                resolve(userObj);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    })
}

class Wechat {
	constructor(props) {

	}
	async auth(req,res){
		let redirectUrl = req.query.redirectUrl;
		let scope='snsapi_userinfo'; //snsapi_userinfo非禁默授权,snsapi_base静默授权用户无感知
		let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
	`${redirectUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
		res.send(authorizeUrl)
	}

	async getAccessToken(req,res){
		 const code = req.query.code;
		 tokenRes = await getAccessToken(code)
		 res.send(tokenRes)
	}
	async getUserInfo(req,res){
		const open_id = tokenRes.openid;
		// const access_token = req.query.accessToken;
		const access_token = req.headers.access_token;
		//通过/getAccessToken获取的access_token和open_id获取userInfo即用户信息
		let userObj = await getUserInfo(access_token,open_id);
		res.send(userObj);
   }	
}
export default new Wechat()
/*
    1.获取code
    通过微信授权api：微信授权弹框：允许拒绝 允许后可以获取到url中的code值
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    2.//解析querystring获取URL中的code值 获取code值，通过拿到的code和appID、app_serect获取返回信息获取access_token和open_id
     `https://api.weixin.qq.com/sns/oauth2/access_token?appid=`${appID}&secret=${appSerect}&code=${code}&grant_type=authorization_code`;
    3.通过上一步获取的access_token和open_id获取userInfo即用户信息
    `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`
    // 重新修改：
    // 1.先用code值获取token值，返回token给前端保存到cookie
    // 2.在用token和openid获取用户信息
*/