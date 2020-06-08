import express from 'express'

import Wechat from '../controller/wechat'
const router = express.Router()

router.get('/auth', Wechat.auth);
router.get('/getAccessToken',Wechat.getAccessToken)
router.get('/getUserInfo',Wechat.getUserInfo)

export default router
