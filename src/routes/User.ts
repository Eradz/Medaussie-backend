import express from "express"
import { AdminSessionMiddleWare, UserSessionMiddleWare } from "../middlewares"
import { deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/User"

const router = express.Router()

router.get('/', AdminSessionMiddleWare, getAllUsersController)
router.get('/:id',UserSessionMiddleWare, getUserByIdController )
router.post('/:id', UserSessionMiddleWare, updateUserController )
router.delete('/:id', UserSessionMiddleWare, deleteUserController )

export {router as userRouter}