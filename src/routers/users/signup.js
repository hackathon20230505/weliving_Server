import pool from "../../config/database.js";
import { sign } from "../../auth/auth-jwt.js";
import bcrypt from "bcrypt";
import { formattedTime } from "../../utils/time.js";


export const signup = async(req,res) => {


    const { email, pnumber, agearea} = req.body;
    let { password } = req.body;
    let { DCatAlarm } = req.body; 
    DCatAlarm = formattedTime

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

