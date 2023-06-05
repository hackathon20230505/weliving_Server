import express from "express";
import { memory_create, memory_othershow, memory_show } from "../../controller/life/memory.js";
export const router = express.Router();

/* 추억카드 */
//POST /life/memory/create
router.post('/create', memory_create);

//GET /life/memory/show
router.get('/show', memory_show);

//GET /life/memory/othershow
router.get('/othershow', memory_othershow);

export default router;