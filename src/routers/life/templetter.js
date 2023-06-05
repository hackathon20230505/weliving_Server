import express from "express";
import { tempcreate, templist, tempshow } from "../../controller/life/templetter.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();

/* 임시 유서 */
//POST /life/templetter/create
router.post('/create', authJWT, tempcreate);

//GET /life/templetter/list
router.get('/list', authJWT, templist);

//GET /life/templetter/show
router.get('/show', tempshow);


export default router;