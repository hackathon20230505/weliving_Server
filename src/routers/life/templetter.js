import express from "express";
import { tempcreate, templist, tempshow } from "../../controller/life/templetter.js";
import { authJWT } from "../../utils/auth.js"

export const router = express.Router();

/* 임시 유서 */
/**
 * @swagger
 * 
 * /life/templetter/create:
 *   post:
 *     tags: [templetter]
 *     summary: 임시 유서 작성 API
 *     description: 임시 유서 작성을 위한 API입니다. 유서 제목 / 유서 내용 / 사용자 id를 받아서 새로운 유서를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "유서 제목"
 *               content:
 *                 type: string
 *                 description: "유서 내용"
 *               user_id:
 *                 type: int
 *                 description : "사용자 id가 들어있는 jwt 토큰"
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
//POST /life/templetter/create
router.post('/create', authJWT,tempcreate);


/**
 * @swagger
 * 
 * /life/templetter/list:
 *   get:
 *     tags: [templetter]
 *     summary: 임시 유서 리스트 조회 API
 *     description: 임시 유서의 리스트를 불러오는 API입니다. request는 jwt토큰으로 이루어진 user_id입니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: int
 *                 description : "사용자 id가 들어있는 jwt 토큰"
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
 *                   properties:
 *                     count:
 *                       type: int
 *                       description: 유서 개수
 *                     letter:
 *                       description: 유서가 여러개일 경우 letter value에서 json을 포함한 배열로 전달
 *                       properties:
 *                          letter_id :
 *                            type: int
 *                            description: 유서 id
 *                          title :
 *                            type: string
 *                            description: 유서 제목 
 *                          createdAt :
 *                            type: string
 *                            description: 유서 작성일 ("YYYY-MM-DD HH-MM-SS")         
 *               
 */
//GET /life/templetter/list
router.get('/list', authJWT,templist);

/**
 * @swagger
 * 
 * /life/templetter/show:
 *   get:
 *     tags: [templetter]
 *     summary: 임시 유서 조회 API
 *     description: 임시 유서 리스트에서 보고싶은 유서 리스트를 클릭할 경우 실행되는 API입니다. request는 letter_id입니다. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               letter_id:
 *                 type: int
 *                 description: 임시유서 리스트에서 response로 받은 letter_id
 *          example:
 *              "letter_id" : 1
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
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: 유서 제목
 *                     content:
 *                       type : string
 *                       description: 유서 내용
 *                     createdAt :
 *                        type: string
 *                        description: 유서 작성일 ("YYYY-MM-DD HH-MM-SS")         
 *               
 */
//GET /life/templetter/show
router.get('/show', tempshow);


export default router;