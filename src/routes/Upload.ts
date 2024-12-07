import express from "express"
import {uploadImage} from "../controllers/Upload"
import {upload} from "../common/config"
const router = express.Router()

router.post('/single', upload.single("file"), uploadImage )


export {router as uploadRouter}