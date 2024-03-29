import signInKakao from"../../utils/kakao.js";
import pool from "../../config/database.js";
import { refresh } from "../../auth/auth-jwt.js";

export const kakao = async (req, res) => {
    const headers = req.headers["authorization"];
    
    //테스트용

    // const headers = "kBiNTtwQXqPLrR3-BLmmHjLMJPHqh6apnun8CEJFCj102wAAAYi6bEhx";
    const [accessToken] = await signInKakao(headers);

    return res.status(200).send({
        ok: true,
        accessToken : accessToken,
    });
};

export const birth = async(req,res)=>{
    //query
    const userid = req.id
    const { birth } = req.body;
    const update_query = `UPDATE User SET Birth = ? WHERE email = (SELECT email FROM User WHERE user_id = ?);`;
    const params = [birth, userid];

    //execute
    let conn;

    try {
        conn = await pool.getConnection();
        await conn.query(update_query, params);

        //성공
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
}