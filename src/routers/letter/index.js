import express from "express"; 
import create from "./create.js";
import list from "./list.js";
import show from "./show.js";

export const router = express.Router();

//POST /letter/create
router.post('/create',create);

//GET /letter/list
router.get('/list',list);

//GET /letter/inquire
router.get('/show',show);

export default router;
