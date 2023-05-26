import pool from "../../config/database.js";

// 최종 유서 리스트
export const list = async (req, res) => {
    // query
    const list_query = `SELECT letter_id,title,createdAt FROM Letter 
    WHERE user_id = ANY(
        SELECT user_id FROM User WHERE agearea=?
    ) 
    AND isShare=1`;

    // params
    const ageagrea = req.body.agearea;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(list_query, ageagrea);

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
    }
};

// 임시 유서 리스트
export const templist = async (req, res) => {
    // query
    const templist_query = `SELECT letter_id,title,createdAt FROM TempLetter WHERE user_id = ?`;

    // params
    const { user_id } = req.body; 

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await conn.query(templist_query, user_id);

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
    }
};
