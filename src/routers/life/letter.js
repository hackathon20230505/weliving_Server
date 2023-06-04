import express from "express";
import { letter_create, letter_list, letter_othershow, letter_show } from "../../controller/life/letter.js";
import { response } from "../../controller/life/chatGPT.js";
export const router = express.Router();

/* 유서 */
//POST /life/letter/create
router.post('/create', letter_create);

//GET /life/letter/list
router.get('/list', letter_list);

//GET /life/letter/show
router.get('/show', letter_show);

//GET /life/letter/othershow
router.get('/othershow', letter_othershow);

//POST /life/letter/generate-response 
router.post('/generate-response', response);

export default router;