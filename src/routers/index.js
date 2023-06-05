import express from "express";
import usersRouter  from "./users/index.js";
import lifeRouter from "./life/index.js";
const router = express.Router();

router.use('api/users', usersRouter);

router.use('api/life', lifeRouter);

export default router;