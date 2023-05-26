import pool from "../../config/database.js";
import { formattedTime } from "../../utils/time.js";
import dotenv from 'dotenv';
dotenv.config();

//유서 작성 API
export const create = async (req, res) => {
    // query
    const create_query = `INSERT INTO hackathon.Letter (title, content, createdAt, isShare, user_id) VALUES (?, ?, ?, ?, ?)`;

    // params
    const { title, content, user_id } = req.body;
    const createdAt = formattedTime;
    const isShare = 1; //true
    const params = [title, content, createdAt, isShare, user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(create_query, params);

        //성공
        return res.status(200).send({
            ok: true
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};


//임시 유서 작성 API
export const tempcreate = async (req, res) => {
    // query
    const create_query = `INSERT INTO hackathon.TempLetter (title, content, createdAt, user_id) VALUES (?, ?, ?, ?)`;

    // params
    const { title, content, user_id } = req.body;
    const createdAt = formattedTime;
    const params = [title, content, createdAt, user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(create_query, params);

        return res.status(200).send({
            ok: true
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};

