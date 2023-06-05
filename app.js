import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routers/index.js";
import { swaggerUi, specs } from "./src/swagger/swagger.js";


const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // 접근 권한을 부여하는 도메인들의 배열
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



const SERVER_HOST = process.env.SERVER_HOST;

const port = 3000;

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port} 🚀`)
})



export default app;

