import express from "express";

import { createExplorer } from "../controllers/explorer.controller";

const router = express.Router()

router.post(`/api/explorer/`, createExplorer)

export default router