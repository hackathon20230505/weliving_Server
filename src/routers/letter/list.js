import pool from "../../config/database.js";

//최종 
const list = async (req, res) => {
    // query, 조건 : 나이대(ageagrea) + 공유여부(isShare)
    const list_query = `SELECT letter_id,title,createdAt FROM Letter 
    WHERE user_id = ANY(
        SELECT user_id FROM User WHERE agearea=?
    ) 
    AND isShare=1`;

    // db
    const ageagrea = req.body.agearea;
    const conn = await pool.getConnection();

    try {
        const [temp] = await conn.query(list_query, ageagrea);
        
        return res.status(200).send({
            ok: true,
            data : {
                count : temp.length,
                letter : temp
            }
        })
    } catch (error) {
        console.log("error" + error);
        return res.json(error);
    }
};


export default list;