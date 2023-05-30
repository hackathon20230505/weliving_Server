import pool from "../../config/database.js";

// 내 유서 보기 (req==user_id)
export const show = async (req, res) => {
    // query
    const show_query = `SELECT title,content,createdAt,epitaph FROM Letter WHERE user_id = ? `;

    // params
    const user_id = req.id;
    
    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(show_query, user_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 다른 사람 유서 보기 (req==letter_id)
export const othershow = async (req, res) => {
    // query
    const show_query = `SELECT title,content,createdAt,epitaph FROM Letter 
    WHERE letter_id=?`;

    // params
    const { letter_id } = req.body;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(show_query, letter_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 임시저장 유서 보기 (req==user_id)
export const tempshow = async (req, res) => {
    // query
    const tempshow_query = `SELECT title,content,createdAt FROM TempLetter WHERE letter_id = ? `;

    // db
    const { letter_id } = req.body;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(tempshow_query, letter_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};