import express from "express";
import { create, tempcreate } from "./create.js";
import { list, templist } from "./list.js";
import { show, othershow, tempshow } from "./show.js";

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


export default router;