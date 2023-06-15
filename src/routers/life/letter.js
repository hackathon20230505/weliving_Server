import express from "express";
import { letter_create, letter_list, letter_othershow, letter_show, modify_isShare, modify_content } from "../../controller/life/letter.js";
import { response } from "../../controller/life/chatGPT.js";
import { authJWT } from "../../utils/auth.js"
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
 *     security:
 *       - Bearer: []
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
 *               isShare:
 *                 type: int
 *                 description: 1==공개, 0==비공개
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
//POST /life/letter/create
router.post('/create',authJWT,letter_create);

/**
 * @swagger
 * 
 * /life/letter/list/{birth}:
 *   get:
 *     tags: [letter]
 *     summary: 유서 리스트 조회 API
 *     description: 나이대에 해당하는 여러 유서에 대한 데이터를 받는 API입니다. 유서에 대한 데이터는 유서 제목과 그에 해당하는 유서 id, 만들어진 날짜로 구성되어있습니다. 조회하고 싶은 년대를 request body에 넣어주세요. 
 *     parameters:
 *       - in: path
 *         name: birth
 *         required: true
 *         scheme:
 *           type: integer
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
router.get('/list/:birth', letter_list);

/**
 * @swagger
 * 
 * /life/letter/show:
 *   get:
 *     tags: [letter]
 *     summary: 내 유서 조회 API
 *     description: 자신의 유서를 조회할 때 사용하는 API입니다. user_id(int)를 jwt token으로 보내주세요.
 *     security:
 *       - Bearer: []
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
 *                       type: string
 *                       description: 유서 내용
 *                     createdAt:
 *                       type: string
 *                       description: 유서 작성일 ("YYYY-MM-DD HH-MM-SS")  
 *                     isShare:
 *                       type: int
 *                       description: 1 (공개), 0 (비공개)      
 *               
 */
//GET /life/letter/show
router.get('/show', authJWT, letter_show);

/**
 * @swagger
 * 
 * /life/letter/othershow/{letter_id}:
 *   get:
 *     tags: [letter]
 *     summary: 다른 사람 유서 조회 API
 *     description: 유서 리스트 조회 후, 다른 사람 유서를 조회할 때 사용하는 API입니다. letter_id를 request body에 넣어주세요.
 *     parameters:
 *       - in: path
 *         name: letter_id
 *         required: true
 *         scheme:
 *           type: integer     
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
router.get('/othershow/:letter_id', letter_othershow);



/**
 * @swagger
 * 
 * /api/life/letter/generate-response:
 *   post:
 *     tags: [letter]
 *     summary: ChatGPT 글쓰기 응답 API
 *     description: 유저의 마음챙김 글쓰기 후 해당 글을 바탕으로 chatGPT의 AI 응답 모델을 기반으로 긍정과 희망의 메시지를 전달합니다.
 *     requestBody:
 *       description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (마음 챙김 글쓰기 본문 내용)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userLetter:
 *                 type: string
 *                 description: "글쓰기 본문 내용"
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 *                   properties:
 *                     response:
 *                       type: string
 *             example:
 *                 response: "XX아, 너는 삶에서 당당하게 살아왔어. 매일같이 취업준비를 하면서도, 끝까지 포기하지 않고 최선을 다해왔어. 내가 너에게 전할 수 있는 말은, 너는 메말라있는 나무에서도 꽃을 피울 수 있는 힘이 있어. 너는 이미 충분히 용감하고 희망적인 사람이야. 이제는 나와 함께, 삶을 새롭게 시작해보자. 너는 세상에서 소중한 존재야. 함께 행복한 시간을 보내며, 너의 인생을 더욱 살아보자."
 */
//POST /life/letter/generate-response 
router.post('/generate-response', response);

/**
 * @swagger
 * 
 * /life/letter/modify-isShare:
 *   post:
 *     tags: [letter]
 *     summary: 유서 공개/비공개 수정 API
 *     description: 공개/비공개 수정을 위한 API입니다. isShare = 1일 경우 공개, 0일 경우 비공개입니다. 
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isShare:
 *                 type: int
 *                 description: "공개 : 1, 비공개 : 0"
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
//POST /life/letter/modify-isShare
router.post('/modify-isShare',authJWT, modify_isShare);

/**
 * @swagger
 * 
 * /life/letter/modify-content:
 *   post:
 *     tags: [letter]
 *     summary: 유서 수정 API
 *     description: 유서 내용을 바꾸는 API입니다. request는 유서 제목, 내용입니다. 
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
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
 *             example:
 *               ok: true
 *               
 */
//POST /life/letter/modify-content
router.post('/modify-content', authJWT, modify_content);

export default router;
