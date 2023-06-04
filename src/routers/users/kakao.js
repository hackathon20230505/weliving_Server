import signInKakao from"../../utils/kakao.js";
import pool from "../../config/database.js";

export const kakao = async (req, res) => {
    const headers = req.headers["authorization"];
    
    //테스트용
    // const kakaoToken = "OSAXwM9D2AxQK4dNQpM04FY9CKtekbw08jody82aCiolUQAAAYiHi1Kg";
    const [accessToken,email] = await signInKakao(headers);
    
    return res.status(200).send({
        ok: true,
        accessToken: accessToken,
        email: email
    });
};

export const birth = async(req,res)=>{
    //query
    const update_query = `UPDATE User SET Birth = ? WHERE email = ?;`;

    //params
    const {birth, email}=req.body;
    const params=[birth,email];

    //execute
    try {
        const conn = await pool.getConnection();
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
    }
}