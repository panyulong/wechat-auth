import express from 'express'

import User from '../controller/user'
const router = express.Router()

router.get('/getUserById', User.getUserById);

export default router
