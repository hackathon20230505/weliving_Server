import express from "express";
import usersRouter  from "./users/index.js";
import letterRouter from "./letter/index.js";

const router = express.Router();

router.use('/users', usersRouter);
router.use('/letter',letterRouter);

export default router;