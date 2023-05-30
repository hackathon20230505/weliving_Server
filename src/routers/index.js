import express from "express";
import usersRouter  from "./users/index.js";
import letterRouter from "./letter/index.js";
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 회원가입 / 로그인 & 관련 토큰 발행 API
 */
router.use('/users', usersRouter);
router.use('/letter',letterRouter);

export default router;