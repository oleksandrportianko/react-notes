import express from 'express'
import { getUser } from '../controllers/user.controller'

const router = express.Router();

router.get(`/api/get_user/`, getUser)

export default router;