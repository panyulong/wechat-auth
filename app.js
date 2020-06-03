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
/*
  es5，用module.exports和exports导出模块，用require引入模块。
  es6，新增export和export default导出模块，import导入模块。
  使用ipmort配置babel转义为es5
*/
import https from 'https'; //node内置请求模块
import express from 'express';
import config from 'config-lite';//配置不同环境，config目录默认default,最新版本3.0获取不到信息
import history from 'connect-history-api-fallback';//前端路由设置mode:history
import chalk from 'chalk';//颜色工具
import bodyParser from 'body-parser'
import router from './routers/index';

const app = express();

//appID
const appID = `wx3343aa96ef214582`;
//appsecret
const appSerect = `655e1cc00423f8e49370c3ec5d162c27`;

let tokenRes = {}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/auth", function(req, res) {
    let redirectUrl = req.query.redirectUrl;
    let scope='snsapi_userinfo'; //snsapi_userinfo非禁默授权,snsapi_base静默授权用户无感知
    let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
`${redirectUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    res.send(authorizeUrl)
});

app.get('/getAccessToken',function(req,res){
    getToken(req,res)
})
async function getToken(req,res){
    const code = req.query.code;
    tokenRes = await getAccessToken(code)
    res.send(tokenRes)
}
//通过拿到的code和appID、app_serect获取access_token和open_id
function getAccessToken(code) {
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

app.get("/getUserInfo", function(req, res) {
    wxAuth(req, res);
});
async function wxAuth(req, res) {
    const open_id = tokenRes.openid;
    // const access_token = req.query.accessToken;
    const access_token = req.headers.access_token;
    //通过/getAccessToken获取的access_token和open_id获取userInfo即用户信息
    let userObj = await getUserInfo(access_token,open_id);
    res.send(userObj);
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
//使用JSON解析工具
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
router(app);//必须放在bodyParser后面才能获取到参数
app.use(history())
app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});