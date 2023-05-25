import express from "express";
import usersRouter  from "./users/index.js";
import letterRouter from "./letter/index.js";

//swagger 불러오기
import { swaggerUi , specs } from "../swagger/swagger.js";

/**
 * @swagger
 * tags:
 *   name: Letter
 *   description: 유서 관련 API
 * 
 * 
 */

const router = express.Router();

router.use('/users', usersRouter);
router.use('/letter',letterRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;