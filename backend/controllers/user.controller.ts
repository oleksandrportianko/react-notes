import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../middleware/auth";

export const registerUser = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body

      if (!username || !email || !password) {
         res.status(400).json({ message: 'All fields is required' })
      }

      const existingUser = await UserModel.findOne({ email })

      if (existingUser) {
         res.status(400).json({ message: 'User with this email already exists' })
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
         username,
         email: email.toLowerCase(),
         password: encryptedPassword,
         id: uuidv4(),
      });

      console.log("CREATED USER", user)

      res.status(200).json({ message: 'Successfully created!' })
   } catch (error) {
      res.status(403).json({ message: error });
   }
}

export const loginUser = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         res.status(403).json('All fields is required')
      }

      const user = UserModel.findOne({ email })

      if (!user) {
         res.status(403).json('User not found')
      }

      const accessToken = generateAccessToken(email)
      const refreshToken = generateRefreshToken(email)

      res.status(200).json({ accessToken, refreshToken })
   } catch (error) {
      res.status(403).json({ message: error });
   }
}