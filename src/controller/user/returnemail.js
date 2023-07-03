import pool from "../../config/database.js";

export const getemail = async(req,res) => {
    let conn;

    try {

        const userID = req.id;

        conn = await pool.getConnection();

        const kakao_query=`SELECT password FROM User WHERE user_id=?`;
        
        const [data]=await conn.query(kakao_query,userID);
        console.log(data);
        if(data[0].password==null){
            res.status(200).send({
                ok:true,
                email:"kakao"
            })
        }

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