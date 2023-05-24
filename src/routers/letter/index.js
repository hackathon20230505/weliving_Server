import express from "express";
import create from "../../controller/letter/create.js";
import list from "../../controller/letter/list.js";

export const router = express.Router();

//POST /letter/create
router.post('/create', create);

//GET /letter/list
router.get('/list',list);

export default router;
