import express from "express";
import refresh from "./refresh.js";
import { signin }  from "./signin.js";
import { signup } from "./signup.js";
export const router = express.Router();




/**
 * @swagger
 * 
 * /users/signup:
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
 *               pnumber:
 *                 type: string
 *                 description : "연락처"
 *               agearea:
 *                 type: integer
 *                 description : "연령 대"
 *               DCatAlarm:
 *                 type: string
 *                 description : "알람 수신 시간 대"
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
 * /users/signin:
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


router.post('/refresh', refresh);



export default router;