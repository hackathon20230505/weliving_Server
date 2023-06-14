import pool from "../../config/database.js";

export const getemail = async(req,res) => {
    let conn;

    try {

        const userID = req.id;

        conn = await pool.getConnection();

        const sql = `SELECT email FROM User WHERE user_id=? ;`;
        const [email] = await conn.query(sql, [userID]);


        res.status(200).send({
            ok:true,
            email:email[0].email
            
         });


    } catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }

}

export default getemail;