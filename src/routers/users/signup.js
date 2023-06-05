import pool from "../../config/database.js";
import { sign } from "../../auth/auth-jwt.js";
import bcrypt from "bcrypt";
import { formattedTime } from "../../utils/time.js";


export const signup = async (req, res) => {
    try {
        const conn = await pool.getConnection();

        const { email, Birth } = req.body;
        let { password } = req.body;

        const checkUser = `SELECT email FROM User WHERE email=?;`;
        const [alreadyUser] = await conn.query(checkUser, [email])

        if (alreadyUser.length > 0) {
            res.status(404).json({
                ok: false,
                msg: ' This E-mail is already taken. '
            })

        } else {

            const salt = await bcrypt.genSalt(10); // 랜덤한 솔트 값 생성
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

            const sql = `INSERT INTO User (email, password, birth, agreeTime) VALUES (?,?,?,?);`;
            const [newUser] = await conn.query(sql, [email, password, Birth, formattedTime]);


            const token = sign(newUser);

            return res.status(200).send({
                ok: true,
                data: {
                    token
                }
            })
        }

    } catch (err) {
        res.status(404).send({
            ok: false,
            msg: err.message,

        })
    }
};