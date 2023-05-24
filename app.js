import express from "express";
import cors from "cors";

//라우터 불러오기
import router from "./src/routers/index.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use('/', router);


const PORT = 3000;


const handleListening =  () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

}


app.listen(PORT, handleListening);


export default app;