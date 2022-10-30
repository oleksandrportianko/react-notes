import express from 'express'

import { registerUser, loginUser, getUser } from '../controllers/user.controller'

const router = express.Router();

router.post(`/api/register/`, registerUser)
router.post(`/api/login/`, loginUser)
router.get(`/api/user/`, getUser)

export default router;