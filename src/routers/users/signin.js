import pool from "../../config/database.js";
import {sign, refresh } from "../../auth/auth-jwt.js";
import bcrypt, { compareSync } from "bcrypt";
import { redisClient } from "../../utils/cache.js";



export const signup = async(req,res) => {
    const { email, pnumber, agearea, DCatAlarm } = req.body;
    let { password } = req.body;
    const conn = await pool.getConnection();

    const salt = await bcrypt.genSalt(10); // 랜덤한 솔트 값 생성
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    try {
        const sql = `INSERT INTO User (email, password, pnumber, agearea, DCatAlarm) VALUES (?,?,?,?,?);`;
        const [newUser] = await conn.query(sql, [email, password, pnumber, agearea, DCatAlarm]);


        const token = sign(newUser);

        return res.status(200).send({
            ok : true,
            data : {
                token
            }
        })


    } catch(err){
        res.status(409).send({
            ok : false,
            msg: err.message,
        })
    }
}



export const signin = async(req,res) => {

    const { email , password } = req.body;



    const conn = await pool.getConnection();

    const sql = `SELECT email, password FROM User WHERE email=?`;
    const [userInfo] = await conn.query(sql, [email])


    if (userInfo.length === 0) {
        return res.status(401).send({
            ok: false,
            msg: 'user does not exist'
        })
    } else {
        const user = userInfo[0];
        const chk = await bcrypt.compare(password, user.password);

        if(chk) {
            const accessToken = sign(userInfo);
            const refreshToken = refresh();

            redisClient.set(email, refreshToken);

            return res.status(200).send({
                ok : true,
                data : {
                    accessToken,
                    refreshToken
                },
            });
        } else {
            res.status(401).send({
                ok : false,
                msg : 'password is incorret. '
            })
        }
    }

}