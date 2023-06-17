import express from "express";
import refresh from "./refresh.js";
import { signin } from "./signin.js";
import { signup } from "./signup.js";
import { kakao, birth } from "./kakao.js";
import { sendmessage } from "./sendmessage.js";
import { verifyMessage } from "./verifymessage.js";
import { logout } from "./logout.js";
import { authJWT } from "../../utils/auth.js";
import { checkLetter, checkMemory } from "./check.js";
import { getemail } from "./returnemail.js";
import { getbirth } from "./returnbirth.js";
import { changepwd, checktwd } from "./changepwd.js";

export const router = express.Router();

/**
 * @swagger
 *
 * /api/users/signup:
 *   post:
 *     tags: [Auth API]
 *     summary: 회원가입
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
router.post("/signup", signup);

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
router.post("/signin", signin);

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
router.post("/refresh", refresh);

/**
 * @swagger
 *
 * /api/users/kakao:
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
 *             example:
 *               ok: true
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwNzQzMjMsImV4cCI6MTY4NTA3NDYyMywiaXNzIjoid2VsbC1keWluZyJ9.usr6JgprDoF1fd-jnmff4KZnuNsiN2Cn_rNVRRsqajA"
 */
//POST /api/users/kakao
router.post("/kakao", kakao);

router.post("/send-message", sendmessage);

router.post("/verify-message", verifyMessage);

/**
 * @swagger
 *
 * /api/users/birth:
 *   post:
 *     tags: [Auth API]
 *     summary: 카카오 로그인 후 태어난 년도 추가 API
 *     description: 카카오 로그인 후 태어난 년도에 대한 데이터를 받는 API입니다.
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               birth:
 *                 type: string
 *                 description: "YYYY"
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
 *             example:
 *               ok: true
 */
//POST /api/users/birth
router.post("/birth", authJWT, birth);

router.get("/checkLetter", authJWT, checkLetter);

router.get("/checkMemory", authJWT, checkMemory);

router.post("/logout", logout);

/**
 * @swagger
 * 
 * api/users/getemail:
 *   get:
 *     tags: [Auth API]
 *     security:
 *       - Bearer: []
 *     summary: 사용자 이메일 받는 API
 *     description: jwt token으로 사용자의 이메일을 알아내는 API입니다.

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
 *                 email: 
 *                   type: string
 *                   description : 카카오 계정일 경우에 "kakao" 반환
 *             example:
 *               ok : true
 *               email : lora3226@daum.net
 */
//GET /api/users/getemail
router.get("/getemail", authJWT, getemail);

/**
 * @swagger
 * 
 * api/users/getbirth:
 *   get:
 *     tags: [Auth API]
 *     security:
 *       - Bearer: []
 *     summary: 사용자 이메일 받는 API
 *     description: jwt token으로 사용자의 이메일을 알아내는 API입니다.

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
 *                 birth: 
 *                   type: string
 *                   description : 카카오 계정일 경우에 "kakao" 반환
 *             example:
 *               ok : true
 *               birth : 1992
 */
//GET /api/users/getbirth
router.get("/getbirth", authJWT, getbirth);

/**
 * @swagger
 *
 * api/users/changepwd:
 *   post:
 *     tags: [Auth API]
 *     security:
 *       - Bearer: []
 *     summary: 사용자의 비밀번호를 변경하는 API
 *     description: 개인정보 변경에서 사용자의 비밀번호를 변경하는 API입니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newpwd:
 *                 type: string
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
 *             example:
 *               ok : true
 */
//POST /api/users/changepwd
router.post("/changepwd", authJWT, changepwd);

/**
 * @swagger
 *
 * api/users/checktwd:
 *   post:
 *     tags: [Auth API]
 *     security:
 *       - Bearer: []
 *     summary: 사용자의 현재 비밀번호가 맞는지 검사하는 API
 *     description: 개인정보 변경에서 사용자의 현재 비밀번호가 맞는지 유효성 검사를 진행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentpwd:
 *                 type: string
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
 *                 result:
 *                   type: boolean
 *             example:
 *               ok : true
 *               result : true
 *       '401':
 *          description: 비밀번호 없음
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ok:
 *                    type: boolean
 *                  result:
 *                    type: boolean
 *              example:
 *                ok : true
 *                result : false
 */
//POST /api/users/checktwd
router.post("/checktwd", authJWT, checktwd);

export default router;
