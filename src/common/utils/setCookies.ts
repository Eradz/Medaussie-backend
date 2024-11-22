import { Response } from "express";

export const setCookies = (res: Response, name: string, value: string) => {

    res.cookie(name, value, process.env.NODE_ENV === 'development' ? 
        {
            domain: "localhost",
            maxAge: 1000 * 60 * 60, // 1 hour
            sameSite: "lax",
            secure: false,
            httpOnly: true
        } :
        {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            sameSite: "none",
            secure: true,
            httpOnly: true
        }
    )
}
