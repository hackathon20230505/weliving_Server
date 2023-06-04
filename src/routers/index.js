import express from "express";
import usersRouter  from "./users/index.js";
import lifeRouter from "./life/index.js";
const router = express.Router();

router.use('/users', usersRouter);

router.use('/life', lifeRouter);

export default router;