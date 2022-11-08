import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';

import ExplorerModel from "../models/explorer.model"
import UserModel from "../models/user.model";

export const createExplorer = async (req: Request, res: Response) => {
    try {
        const object = {
            id: uuidv4(),
            type: 'folder',
            path: '../',
            name: 'test',
        }

        const existingUser = await UserModel.findOne({ email: 'portianko123@gmail.com' })
        const id = existingUser?._id

        const explorer = await ExplorerModel.create({
            user: id,
        });

        const hz = await ExplorerModel.find({}).populate("user")
        console.log("HZ", hz)

        console.log("CREATED Explorer", explorer)

        res.status(200).json({ message: 'Successfully created!' })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Suck!' })
    }
}