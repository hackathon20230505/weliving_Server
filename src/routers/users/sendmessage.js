import pool from "../../config/database.js";

export const sendmessage = async(req,res) => {
    try {

    const conn = await pool.getConnection();

    const userid = req.id;
    const { phoneNumber } = req.body;

    const checkUserEmailExist = `SELECT email from User WHERE user_id=?;`
    let [userEmail] = await conn.query(checkUserEmailExist, [userid]);
    const email = userEmail[0].email;

    const insertUserPhoneNumberQuery = `UPDATE User SET phoneNumber = ? WHERE email = ?`;
    const [userPhonNumber] = await conn.query(insertUserPhoneNumberQuery, [phoneNumber, email]);
    
    return res.status(200).json({ response : "메시지 수신 동의 완료되었습니다." , phoneNumber });

    } catch(err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

}