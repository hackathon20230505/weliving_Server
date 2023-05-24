import express from "express";
import cors from "cors";
import router from "./src/routers/index.js";
import pool from "./src/config/database.js";
import create from "./src/routers/letter/create.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use('/', router);
app.use('/letter/create',create);
app.use('/letter/create',create);

const PORT = 3000;


const handleListening =  () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

}


app.listen(PORT, handleListening);


export default app;