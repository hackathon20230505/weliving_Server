import pool from "../../config/database.js";
import dotenv from 'dotenv';
dotenv.config();

//유서 작성 API
const create = async (req, res) => {
    //현재 날짜 불러오기
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    //데이터 할당
    const { title, content } = req.body;
    const createdAt = today.toISOString().slice(0, 10);
    const isTemp = 1; //최종 저장이므로 0(false)
    //isShare -> 이 단계에서는 공유 여부 결정 X
    const user_id = 1;
    const params = [title, content, createdAt, isTemp, user_id];

    //쿼리 설정
    const create_query = `INSERT INTO hackathon.Letter (title, content, createdAt, isTemp, user_id) VALUES (?, ?, ?, ?, ?)`;

    // db
    const conn = await pool.getConnection();

    //SQL INSERT 
    try {
        const [data] = await conn.query(create_query, params);

        //성공
        return res.status(200).send({
            ok:true
        })

    } catch (err) {
        //실패
        res.status(409).send({
            ok : false,
            msg: err.message,
        })
    }

};

export default create;
