import pool from "../../config/database.js";
import {sign, refresh } from "../../auth/auth-jwt.js";
import bcrypt from "bcrypt";
import { redisClient } from "../../utils/cache.js";



export const signin = async(req,res) => {

    const { email , password } = req.body;

    const conn = await pool.getConnection();

    const sql = `SELECT user_id, email, password FROM User WHERE email=?`;
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

            const accessToken = sign(user);
            const refreshToken = refresh();


            redisClient.set(email, refreshToken, (error, result) => {
                if (error) {
                  console.log('Redis set error:', error);
                } else {
                  console.log('Redis set result:', result);
                }
              });

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