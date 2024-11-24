import express from "express"
import { signupController, loginController, sessionController } from "../controllers/Auth"
import passport from "passport"

const router = express.Router()

router.post('/session', sessionController)
router.post('/signup', signupController)
router.post('/login', loginController)
router.get("/google", passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/login'
      }), async(req,res)=>{    
        res.redirect(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : "https://medaussie.vercel.app" )
      })



export {router as authRouter}