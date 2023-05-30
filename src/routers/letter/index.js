import express from "express";
import { create, tempcreate, epitaph_create } from "./create.js";
import { list, templist } from "./list.js";
import { show, othershow, tempshow } from "./show.js";
import { response } from "./chatGPT.js";



export const router = express.Router();

/* 유서 */
//POST /letter/create
router.post('/create', create);

//GET /letter/list
router.get('/list', list);

//GET /letter/show
router.get('/show', show);

//GET /letter/othershow
router.get('/othershow', othershow);


/* 임시 유서 */
//POST /letter/tempcreate
router.post('/tempcreate', tempcreate);
 
//GET /letter/templist
router.get('/templist', templist);

//GET /letter/tempshow
router.get('/tempshow', tempshow);


/* 추가 기능 */
//POST /letter/generate-response 
router.post('/generate-response', response);

//POST /letter/epitaph-create
router.post('/epitaph-create', epitaph_create);


export default router;