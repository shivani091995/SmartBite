import express, { Request, Response, NextFunction, Router } from 'express';
//import { CreateVandor } from '../controllers/AdminController'; to avoid the specific file name we can export the functions in a index.ts file
import { CreateVandor, GetVandorById, GetVandors } from '../controllers';


const router = Router();

router.post('/vandor', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CreateVandor(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/vandors', async (req: Request, res: Response, next:NextFunction)=>{
    try {
        await GetVandors(req, res, next);
    } catch (error) {
        next(error);
        
    }
});
router.get('/vandor/:id', async (req: Request, res:Response, next:NextFunction)=>{
    try {
        await GetVandorById(req, res, next); 
    } catch (error) {
        next(error)
        
    }
});



// router.get('/', (req:Request, res:Response, next:NextFunction)=>{
//     res.json({message: "Hello from the admin route"});   })
//  now this is working without error because we are providing a wrapper func here itself


export { router as AdminRoute };