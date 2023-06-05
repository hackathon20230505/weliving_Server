import express from "express";
import { memory_create, memory_othershow, memory_show } from "../../controller/life/memory.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();

/* 추억카드 */
//POST /life/memory/create
router.post('/create', authJWT, memory_create);

//GET /life/memory/show
router.get('/show', authJWT, memory_show);

//GET /life/memory/othershow
router.get('/othershow', memory_othershow);

export default router;