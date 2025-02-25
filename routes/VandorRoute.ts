import express, {Request, Response, NextFunction } from 'express';
import { VandorLogin } from '../controllers';


const router = express.Router();

router.post('/login', async (req:Request, res:Response, next:NextFunction) => {
    try {
        await VandorLogin(req, res, next);
    } catch (error) {
        next(error)
        
    }
})


export { router as VandorRoute };