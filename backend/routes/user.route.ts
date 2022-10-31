import express from 'express'

import { registerUser, loginUser, getUser, getNewAccessToken } from '../controllers/user.controller'

const router = express.Router();

router.post(`/api/register/`, registerUser)
router.post(`/api/login/`, loginUser)
router.get(`/api/user/`, getUser)
router.post(`/api/get_new_access_token/`, getNewAccessToken)

export default router;