import pool from "../../config/database.js";
import { formattedTime } from "../../utils/time.js";
import dotenv from 'dotenv';
dotenv.config();

//유서 작성 API
export const create = async (req, res) => {
    // query
    const create_query = `INSERT INTO hackathon.Letter (title, content, createdAt, isShare, user_id) VALUES (?, ?, ?, ?, ?)`;

    // params
    const { title, content } = req.body;
    const user_id = req.id;
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


//유서 작성 API
export const epitaph_create = async (req, res) => {
    // query
    const create_query = 
    `UPDATE Letter SET epitaph = ? WHERE user_id = ?;
    SELECT letter_id WHERE user_id = ?`;

    // params
    const { epitaph } = req.body;
    const user_id = req.id;
    const params = [epitaph, user_id, user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(create_query, params);

        //성공
        return res.status(200).send({
            ok: true,
            data : data
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
    const { title, content } = req.body;
    const user_id = req.id;
    const createdAt = formattedTime;
    const params = [title, content, createdAt, user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(create_query, params);

        return res.status(200).send({
            ok: true,

        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};