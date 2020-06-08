import express from 'express'

import inviteeInfo from '../controller/inviteeInfo'
const router = express.Router()

router.post('/createInviteeInfo', inviteeInfo.createInviteeInfo);

export default router
