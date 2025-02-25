import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";


export const FindVandor = async (id:string | undefined, email?:string) => {

  if(email){
    return await Vandor.findOne({ email: email });
  }
  else{
    return await Vandor.findById(id);
  }
}


export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      ownerName,
      address,
      phone,
      email,
      password,
      pincode,
      foodType,
    } = <CreateVandorInput>req.body;

    const existingVandor = await FindVandor('', email);

    if(existingVandor !== null){
      return res.json({ message: 'A vandor with this email ID already exists!'})
    }

    //generate the salt and encrypt the password

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
  
    const createdVandor = await Vandor.create(
      {
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
      }
    )

    return res.json(createdVandor);
    
  } catch (error) {
      next(error);
  }
};

// export const CreateVandor = async (req: Request<{}, {}, CreateVandorInput>, res: Response, next: NextFunction): Promise<Response>  => {
//   const {
//     name,
//     ownerName,
//     address,
//     phone,
//     email,
//     password,
//     pincode,
//     foodType,
//   } = <CreateVandorInput>req.body;

//   res.json({
//     name,
//     ownerName,
//     address,
//     phone,
//     email,
//     password,
//     pincode,
//     foodType,
//   });
//   return;
// };




export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const vandors = await Vandor.find();

    if(vandors !== null){
      res.json(vandors);
    }

    return res.json({message: "no vandors found"});
    
  } catch (error) {
    next(error);
    
  }
};
export const GetVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const vandorId = req.params.id;
    const vandor = await FindVandor(vandorId);

    if(vandor !== null){
      res.json(vandor);
    }

    return res.json({ message: "vandor not found! "});
    
  } catch (error) {

    next(error);
    
  }
};
