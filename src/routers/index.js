import express from "express";
import usersRouter  from "./users/index.js";

const router = express.Router();

router.use('/users', usersRouter);


export default router;