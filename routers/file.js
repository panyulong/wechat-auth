import express from 'express'
import multer from 'multer'
import moment from 'moment'
import File from '../controller/file'
const router = express.Router()

const uploadDir = `./public/upload`;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })

router.post('/upload', multer({ storage: storage }).array('file'), File.upload); //请求路径：/file/upload
router.get('/queryFile',File.queryFile)

export default router
