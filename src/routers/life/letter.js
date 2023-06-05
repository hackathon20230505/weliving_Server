import express from "express";
import { letter_create, letter_list, letter_othershow, letter_show } from "../../controller/life/letter.js";
import { response } from "../../controller/life/chatGPT.js";
export const router = express.Router();

/* 유서 */
/**
 * @swagger
 * 
 * /life/letter/create:
 *   post:
 *     tags: [letter]
 *     summary: 유서 작성 API
 *     description: 유서 작성을 위한 API입니다. 유서 제목 / 유서 내용 / 사용자 id를 받아서 새로운 유서를 생성합니다.
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *             example:
 *               ok: true
 *               
 */
//POST /life/letter/create
router.post('/create', letter_create);

/**
 * @swagger
 * 
 * /life/letter/list:
 *   get:
 *     tags: [letter]
 *     summary: 유서 리스트 조회 API
 *     description: 유서 제목과 그에 해당하는 유서 id, 만들어진 날짜에 대한 데이터를 받는 API입니다. 조회하고 싶은 년대를 request body에 넣어주세요. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               birth:
 *                 type: int
 *                 description: "조회하고자 하는 년도, 80년생 - 8, 90년생 - 9, 00년생 - 0, 10년생 - 1"
 *          example:
 *              "birth" : 9
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
//GET /life/letter/list
router.get('/list', letter_list);

/**
 * @swagger
 * 
 * /life/letter/show:
 *   get:
 *     tags: [letter]
 *     summary: 내 유서 조회 API
 *     description: 자신의 유서를 조회할 때 사용하는 API입니다. user_id(int)를 jwt token으로 보내주세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: int
 *                 description: jwt token으로 보내주세요.
 *          example:
 *              "user_id" : 1
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
//GET /life/letter/show
router.get('/show', letter_show);

/**
 * @swagger
 * 
 * /life/letter/othershow:
 *   get:
 *     tags: [letter]
 *     summary: 다른 사람 유서 조회 API
 *     description: 유서 리스트 조회 후, 다른 사람 유서를 조회할 때 사용하는 API입니다. letter_id를 request body에 넣어주세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               letter_id:
 *                 type: int
 *                 description: 유서 리스트 조회하기 API에서 받은 letter_id와 동일합니다.
 *          example:
 *              "letter_id" : 15
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
//GET /life/letter/othershow
router.get('/othershow', letter_othershow);

//POST /life/letter/generate-response 
router.post('/generate-response', response);

export default router;