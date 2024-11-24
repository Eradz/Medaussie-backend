import { User } from '../../models/userModel';
import passport from "passport"
import {Strategy as GoogleStrategy} from 'passport-google-oauth2' 
import dotenv from 'dotenv'
dotenv.config()

passport.use(new GoogleStrategy({
    clientID :     process.env.GOOGLE_CLIENT_ID ||  " " ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    callbackURL: "http://localhost:5000/api/v1/users/google/callback" ,
  },
  async function verify(accessToken: string, refreshToken: string, profile: any, done: any) {
    console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET )
        const {id, family_name, email, given_name }= profile
        const existingUser = await User.findOne({googleId: id}) 
        const existingUseremail = await User.findOne({email})
        if(existingUseremail){
         return  done(null, existingUseremail)
        } else{
          const user = await User.create({googleId:id, firstname: given_name, lastname: family_name, email})
          return done(null, user)
        }
  }
));
