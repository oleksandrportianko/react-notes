import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
    try {
       const user = await UserModel.find();
 
       res.status(200).json(user);
       return;
    }
    catch(error) {
       res.status(403).json({ message: error });
    }
 }