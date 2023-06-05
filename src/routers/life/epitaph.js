import express from "express";
import { epitaph_create,epitaph_show } from "../../controller/life/epitaph.js";

export const router = express.Router();


/* 묘비명 */
//POST /life/epitaph/create
router.post('/create', epitaph_create);

//GET /life/epitaph/show
router.get('/show', epitaph_show);

export default router;