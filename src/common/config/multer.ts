import multer from "multer"
import express from "express"
const storage = multer.diskStorage({
    filename: (req,file, cb)=>{
      cb(null, file.originalname)
    }
  })
export const upload = multer({storage})

