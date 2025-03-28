import express from "express"
import { UserSessionMiddleWare} from "../middlewares"
import { createMessageController,DeleteMessageController,GetAllMessagesController, GetSingleMessagesController, UpdateMessageController } from "../controllers/Message"


const router = express.Router()

router.post("/", UserSessionMiddleWare, createMessageController)
router.get("/", GetAllMessagesController)
router.get("/:id", GetSingleMessagesController)
router.post("/:id", UserSessionMiddleWare, UpdateMessageController)
router.delete("/:id", UserSessionMiddleWare, DeleteMessageController)

export {router as messageRouter}