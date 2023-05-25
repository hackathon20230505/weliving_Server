import pool from "../../config/database.js";

//내 유서 보기 (user_id)
export const show = async (req, res) => {
    // query
    const show_query = `SELECT title,content,createdAt FROM Letter WHERE user_id = ? `;

    // db
    const { user_id } = req.body;
    const conn = await pool.getConnection();

    try {
        const [data] = await conn.query(show_query, user_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (error) {
        console.log("error" + error);
        return res.json(error);
    }
};

//다른 사람 유서 보기 (letter_id)
export const othershow = async (req, res) => {
    // query
    const show_query = `SELECT title,content,createdAt FROM Letter 
    WHERE letter_id=?`;

    // db
    const { letter_id } = req.body;
    const conn = await pool.getConnection();

    try {
        const [data] = await conn.query(show_query, letter_id);

        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (error) {
        console.log("error" + error);
        return res.json(error);
    }
};