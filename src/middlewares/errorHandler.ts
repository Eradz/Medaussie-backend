import { Response, Request, NextFunction } from "express";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorMessage = err.message
    const stack = err.stack
    const statusCode = res.statusCode? res.statusCode : 500
    res.status(500).json({ message: errorMessage, stack: process.env.NODE_ENV === "development" ? stack :{} })
}