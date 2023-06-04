import express from "express";
import usersRouter  from "./users/index.js";
import lifeRouter from "./life/index.js";
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 회원가입 / 로그인 & 관련 토큰 발행 API
 */
router.use('/users', usersRouter);

/**
 * @swagger
 * tags:
 *   name: Life
 *   description: 유서, 임시유서, 묘비명, 추억카드 관련 API
 */
router.use('/life', lifeRouter);

export default router;