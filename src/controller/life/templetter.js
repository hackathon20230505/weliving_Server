import pool from "../../config/database.js";
import { formattedTime } from "../../utils/time.js"
import { insert_tempLetter, select_tempLetterList, select_tempLetter } from "../../dao/life/templetterDao.js";
import dotenv from 'dotenv';
dotenv.config();

//임시 유서 작성 API
export const tempcreate = async (req, res) => {
    // params
    const { title, content } = req.body;
    const user_id = req.id;
    const createdAt = formattedTime;
    const params = [title, content, createdAt, user_id];

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        await insert_tempLetter(conn, params);

        return res.status(200).send({
            ok: true
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }

};

// 임시 유서 리스트
export const templist = async (req, res) => {
    // params
    const user_id = req.id;
    // const {user_id} = req.body;

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        const [data] = await select_tempLetterList(conn, user_id);

        return res.status(200).send({
            ok: true,
            data: {
                count: data.length,
                letter: data
            }
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};


// 임시저장 유서 보기 (req==user_id)
export const tempshow = async (req, res) => {
    // db
    const { letter_id } = req.params.letter_id;

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        const [data] = await select_tempLetter(conn, letter_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};