import express from "express"
import { AdminSessionMiddleWare } from "../middlewares"
import { getAllUsersController, getUserByIdController } from "../controllers/User"

const router = express.Router()

router.get('/', AdminSessionMiddleWare, getAllUsersController)
router.get('/:id', getUserByIdController )

export {router as userRouter}