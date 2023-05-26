import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routers/index.js";
import { swaggerUi, specs } from "./src/swagger/swagger.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // 접근 권한을 부여하는 도메인 (전체 URL)
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



const SERVER_HOST = 3000

const handleListening =  () => {
    console.log(`✅ Server listenting on http://localhost:${SERVER_HOST} 🚀`);

}

app.listen(SERVER_HOST, handleListening);


export default app;

