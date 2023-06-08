import express from "express";
import { memory_create, memory_othershow, memory_show } from "../../controller/life/memory.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();

/* 추억카드 */
/**
 * @swagger
 * 
 * /life/memory/create:
 *   post:
 *     tags: [memory]
 *     summary: 추억 카드 작성 API
 *     description: 추억 카드 작성을 위한 API입니다. 추억 카드 내용을 json 형태로 받아서 새로운 추억 카드를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: int
 *                 description: 사용자 id, jwt token으로 전달
 *               content:
 *                 type: json
 *                 description: {"1":"추억1", "2":"추억2"}
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
 *                 letter_id:
 *                   type: int
 *             example:
 *               ok: true
 *               letter_id: 15
 *               
 */
//POST /life/memory/create
router.post('/create', authJWT, memory_create);

/**
 * @swagger
 * 
 * /life/memory/show:
 *   get:
 *     tags: [memory]
 *     summary: 내 추억 카드 조회API
 *     description: 자신의 추억 카드를 조회하는 API입니다. request가 user_id입니다. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: int
 *                 description: 사용자 id, jwt token으로 전달
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
 *                 count: 
 *                   type: int
 *                   description: 추억 카드가 몇개있는지 
 *                 memory:
 *                   type: json
 *                   description: 예시 = {"1":"맛있는 음식","2":"아끼는 인형"}
 *               
 */
//GET /life/memory/show
router.get('/show', authJWT, memory_show);

/**
 * @swagger
 * 
 * /life/memory/othershow:
 *   get:
 *     tags: [memory]
 *     summary: 다른 사람 추억 카드 조회 API
 *     description: 다른 사람의 추억 카드를 조회하는 API입니다. request가 letter_id입니다. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               letter_id:
 *                 type: int
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
 *                 count: 
 *                   type: int
 *                   description: 추억 카드가 몇개있는지 
 *                 memory:
 *                   type: json
 *                   description: 예시 = {"1":"맛있는 음식","2":"아끼는 인형"}
 *               
 */
//GET /life/memory/othershow
router.get('/othershow', memory_othershow);

export default router;