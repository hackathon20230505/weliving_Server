import pool from "../../config/database.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
dotenv.config();

//유서 작성 API
const create = async (req, res) => {
    //현재 날짜 불러오기
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    //데이터 할당
    const { title, content } = req.body;
    const createdAt = today.toISOString().slice(0, 10);
    const isShare = 1;
    const user_id = 6; //하드코딩, user_id 채굴 필요
    const params = [title, content, createdAt, isShare, user_id];

    //쿼리 설정
    const create_query = `INSERT INTO hackathon.Letter (title, content, createdAt, isShare, user_id) VALUES (?, ?, ?, ?, ?)`;

    // db
    const conn = await pool.getConnection();

    //SQL INSERT 
    try {
        const [data] = await conn.query(create_query, params);

        //성공
        return res.status(200).send({
            ok: true
        })

    } catch (err) {
        //실패
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};

export default create;
