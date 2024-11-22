import {Response} from 'express';

export const AppResponse = {
    success: (res: Response, message:string,  data: any) => {
        res.status(200).json({message, data});
    },
    error: (res: Response, message: string) => {
       res.status(400) 
       throw new Error(message)
    },
    notFound: (res: Response) => {
        res.status(404).json({ error: 'Not Found' });
    }
}

