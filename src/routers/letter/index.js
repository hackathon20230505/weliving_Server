import express from "express";
import create from "./create.js";
import list from "./list.js";
import { show, othershow } from "./show.js";

export const router = express.Router();


//POST /letter/create
router.post('/create', create);

//GET /letter/list
router.get('/list', list);

//GET /letter/show
router.get('/show', show);

//GET /letter/othershow
router.get('/othershow', othershow);

export default router;
