import express from "express";
import  refresh from "./refresh.js";


export const router = express.Router();



//router.post('/signup, signup);
//router.post('/signin, signin);
router.post('/refresh', refresh);




export default router;