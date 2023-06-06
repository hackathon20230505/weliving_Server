import express from "express";

import refresh from "./refresh.js";
import { signin } from "./signin.js";
import { signup } from "./signup.js";
import { kakao, birth } from "./kakao.js";
import { sendmessage } from "./sendmessage.js";
import { authJWT } from "../../utils/auth.js";

export const router = express.Router();




/**
 * @swagger
 * 
 * /api/users/signup:
 *   post:
 *     tags: [Auth API]
 *     summary: 회원 가입
 *     description: 회원가입을 위한 API입니다. 이메일 /비밀번호 / 연락처 / 연령 대 / 알람 수신 시간 대를 전달하여 새로운 사용자를 생성합니다.
 *     requestBody:
 *       description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "이메일"
 *               password:
 *                 type: string
 *                 description: "비밀번호"
 *               birth:
 *                 type: string
 *                 description : "태어난 년도 "
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *             example:
 *               ok: true
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzQzMjMsImV4cCI6MTY4NTA3NDYyMywiaXNzIjoid2VsbC1keWluZyJ9.usr6JgprDoF1fd-jnmff4KZnuNsiN2Cn_rNVRRsqajA"
 */
router.post('/signup', signup);




/**
 * @swagger
 * 
 * /api/users/signin:
 *   post:
 *     tags: [Auth API]
 *     summary: 로그인
 *     description: 로그인을 위한 API입니다. 이메일과 비밀번호를 전달하여 새로운 사용자를 생성합니다.
 *     requestBody:
 *       description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 )
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "이메일"
 *               password:
 *                 type: string
 *                 description: "비밀번호"
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *             example:
 *               ok: true
 *               data:
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzQzMjMsImV4cCI6MTY4NTA3NDYyMywiaXNzIjoid2VsbC1keWluZyJ9.usr6JgprDoF1fd-jnmff4KZnuNsiN2Cn_rNVRRsqajA"
 *                 refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzg0NTEsImV4cCI6MTY4NTA3OTA1MSwiaXNzIjoid2VsbC1keWluZyJ9.pgfPJwjhYIwslTyo7UcVrP6EMNHVAgc2xZVL81j8dhE"
 */
router.post('/signin', signin);


/**
 * @swagger
 * 
 * /api/users/refresh:
 *   post:
 *     tags: [Auth API]
 *     summary: 토큰 재발급
 *     description: access token이 만료되고, refresh token은 만료되지 않은 경우에 새로운 access token을 발급 합니다.
 *
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *             example:
 *               ok: true
 *               data:
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzQzMjMsImV4cCI6MTY4NTA3NDYyMywiaXNzIjoid2VsbC1keWluZyJ9.usr6JgprDoF1fd-jnmff4KZnuNsiN2Cn_rNVRRsqajA"
 *                 refreshToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzg0NTEsImV4cCI6MTY4NTA3OTA1MSwiaXNzIjoid2VsbC1keWluZyJ9.pgfPJwjhYIwslTyo7UcVrP6EMNHVAgc2xZVL81j8dhE"
 */
router.post('/refresh', refresh);



/**
 * @swagger
 * 
 * /users/kakao:
 *   post:
 *     tags: [Auth API]
 *     summary: 카카오 로그인
 *     description: 카카오 로그인을 위한 API입니다.
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          description: 헤더에서 카카오 토큰을 Content-Type을 application/x-www-form-urlencoded로 전송한다. 이때, Key는 authorization, Value는 카카오측에서 받은 토큰으로 한다.
 *          schema:
 *              type: application/x-www-form-urlencoded 
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 accessToken:
 *                   type: string
 *                 email:
 *                   type: string
 *             example:
 *               ok: true
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzQzMjMsImV4cCI6MTY4NTA3NDYyMywiaXNzIjoid2VsbC1keWluZyJ9.usr6JgprDoF1fd-jnmff4KZnuNsiN2Cn_rNVRRsqajA"
 *               email: "lora3226@naver.com"
 */
router.post('/kakao', kakao);

router.post('/send-message', authJWT, sendmessage)

router.post('/birth', birth);

export default router;