import express from "express";
import { memory_create, memory_othershow, memory_show } from "../../controller/life/memory.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();

/* 추억카드 */
/**
 * @swagger
 * 
 * api/life/memory/create:
 *   post:
 *     tags: [memory]
 *     summary: 추억 카드 작성 API
 *     description: 추억 카드 작성을 위한 API입니다. 추억 카드 내용을 json 형태로 받아서 새로운 추억 카드를 생성합니다.
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memory:
 *                 type: array
 *                 description: ["추억 1","추억 2"]
 *           example:
 *              "user_id": "(jwt token)"
 *              "memory": ["추억1","추억2","추억3"]
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
 *               
 */
//POST api/life/memory/create
router.post('/create', authJWT, memory_create);

/**
 * @swagger
 * 
 * api/life/memory/show:
 *   get:
 *     tags: [memory]
 *     security:
 *       - Bearer: []
 *     summary: 내 추억 카드 조회API
 *     description: 자신의 추억 카드를 조회하는 API입니다. request가 user_id입니다. 

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
 *                   type: array
 *                   description: 추억카드 내용
 *             example:
 *               ok : true,
 *               count : 3,
 *               memory : ["추억1","추억2","추억3"]  
 */
//GET /life/memory/show
router.get('/show', authJWT, memory_show);

/**
 * @swagger
 * 
 * /api/life/memory/othershow/{letter_id}:
 *     
 *   get:
 *     tags: [memory]
 *     summary: 다른 사람 추억 카드 조회 API
 *     description: 다른 사람의 추억 카드를 조회하는 API입니다. request가 letter_id입니다. 
 *     parameters:
 *       - in: path
 *         name: letter_id
 *         required: true
 *         scheme:
 *           type: integer
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
 *                   type: array
 *                   description: 추억카드 내용
 *             example:
 *               ok : true,
 *               count : 3,
 *               memory : ["추억1","추억2","추억3"]  
 *
 *               
 */
//GET /life/memory/othershow
router.get('/othershow/:letter_id', memory_othershow);

export default router;