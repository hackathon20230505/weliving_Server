import pool from "../../config/database.js";

//최종 
const show = async (req, res) => {
    // query
    const show_query = `SELECT title,content,createdAt FROM Letter 
    WHERE letter_id=?`;

    // db
    const {letter_id} = req.body;
    const conn = await pool.getConnection();

    try {
        const [data] = await conn.query(show_query, letter_id);
        
        return res.status(200).send({
            ok: true,
            data : data
        })
    } catch (error) {
        console.log("error" + error);
        return res.json(error);
    }
};


export default show;