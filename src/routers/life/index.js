import express from "express";
export const router = express.Router();

import letterRouter from "./letter.js";
import templetterRouter from "./templetter.js";
import epitaphRouter from "./epitaph.js";
import memoryRouter from "./memory.js";

/**
 * @swagger
 * tags:
 *   name: letter
 *   description: 유서 작성, 리스트 조회, 보여주기, chatGPT 응답 API
 */
router.use('/letter', letterRouter);

/**
 * @swagger
 * tags:
 *   name: templetter
 *   description: 임시 유서 작성, 리스트 조회, 보여주기 API
 */ 
router.use('/templetter', templetterRouter );

/**
 * @swagger
 * tags:
 *   name: epitaph
 *   description: 묘비명 작성, 보여주기 API
 */
router.use('/epitaph', epitaphRouter );

/**
 * @swagger
 * tags:
 *   name: memory
 *   description: 추억카드 작성, 보여주기 API
 */

router.use('/memory', memoryRouter );

export default router;