import express from "express";
import { epitaph_create,epitaph_show } from "../../controller/life/epitaph.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();


/* 묘비명 */
//POST /life/epitaph/create
router.post('/create', authJWT,epitaph_create);

//GET /life/epitaph/show
router.get('/show', authJWT,epitaph_show);

export default router;