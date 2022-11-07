import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user.model";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../middleware/auth";

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
      console.log(error)
   }
}

export const loginUser = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         res.status(403).json('All fields is required')
      }

      const user = await UserModel.findOne({ email: email })

      if (!user) {
         res.status(403).json('User not found')
      } else {
         bcrypt.compare(password, user.password, (err, data) => {
            if (err) throw err

            if (data) {
               const accessToken = generateAccessToken(email)
               const refreshToken = generateRefreshToken(email)

               return res.status(200).json({ accessToken, refreshToken })
            } else {
               return res.status(401).json({ message: "Invalid password" })
            }
         })
      }
   } catch (error) {
      console.log(error)
   }
}

export const getUser = async (req: Request, res: Response) => {
   try {
      const token = req.header('authorization');

      if (token) {
         const response = verifyToken(token.replace('Bearer ', ''))

         if (!response) {
            res.status(403).json({ message: 'Access token is expired or incorrect' })
         }

         const user = await UserModel.findOne({ email: response }, { password: 0, _id: 0, __v: 0 })

         if (!user) {
            res.status(403).json({ message: 'User not found' })
         }

         res.status(200).json({ user })
      }
   } catch (error) {
      console.log(error)
   }
}

export const getNewAccessToken = async (req: Request, res: Response) => {
   try {
      const { refreshToken } = req.body

      if (!refreshToken) {
         res.status(403).json({ message: 'Refresh token is required' })
      }

      const response = verifyToken(refreshToken)

      if (!response) {
         res.status(403).json({ message: 'Refresh token is expired or incorrect' })
      } else {
         const newAccessToken = generateAccessToken(response)
         res.status(201).json({ accessToken: newAccessToken })
      }
   } catch (error) {
      console.log(error)
   }
}