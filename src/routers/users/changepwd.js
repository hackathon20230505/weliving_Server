import pool from "../../config/database.js";
import bcrypt from "bcrypt";


export const changepwd = async (req, res) => {
    let conn;
    //request
    const user_id=req.id;
    const { currentpwd, newpwd } = req.body;

    try {
        //DB
        conn = await pool.getConnection();
        const sql = `SELECT user_id, email, password FROM User WHERE user_id=?`;
        const [data] = await conn.query(sql, [user_id]);

        //비밀번호 비교
        const user = data[0];
        const chk = await bcrypt.compare(currentpwd, user.password);

        if (chk) {
            //비밀번호 암호화 후 생성
            const salt = await bcrypt.genSalt(10); // 랜덤한 솔트 값 생성
            const hashedPassword = await bcrypt.hash(newpwd, salt);


            //DB
            const sql = `UPDATE User SET password = ? WHERE user_id = ?`;
            await conn.query(sql, [hashedPassword, user_id]);

            res.status(200).send({
                ok: true
            });
        } else {
            res.status(401).send({
                ok: false,
                msg: '비밀번호가 틀렸습니다.',
            })
        }


    } catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }

}

export default changepwd;