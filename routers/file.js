import express from 'express'
import File from '../controller/file'
const router = express.Router()

router.post('/upload', File.upload); //请求路径：/file/upload

export default router
