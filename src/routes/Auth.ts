import express from "express"
import { signupController, loginController, sessionController  } from "../controllers/Auth"

const router = express.Router()

router.post('/session', sessionController)
router.post('/signup', signupController)
router.post('/login', loginController)


export {router as authRouter}