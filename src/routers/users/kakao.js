import signInKakao from"../../utils/kakao.js";
import pool from "../../config/database.js";

export const kakao = async (req, res) => {
    const headers = req.headers["authorization"];
    
    //테스트용
    // const kakaoToken = "tMkAkij8NQGzMuFFGz8E5IMxqANnKHPDVe5yspgMCiolkAAAAYivyIwH";
    const [accessToken, user_id] = await signInKakao(kakaoToken);
    
    return res.status(200).send({
        ok: true,
        accessToken: accessToken
    });
};

export const birth = async(req,res)=>{
    //query
    const update_query = `UPDATE User SET Birth = ? WHERE email = ?;`;

    //params
    const {birth, email}=req.body;
    const params=[birth,email];

    //execute
    let conn;

    try {
        conn = await pool.getConnection();
        await conn.query(update_query, params);
        conn.release();

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