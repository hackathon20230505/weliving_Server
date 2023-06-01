import axios from "axios";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import { formattedTime } from "./time.js";

import dotenv from 'dotenv';
dotenv.config();


export const signInKakao = async (kakaoToken) => {

    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        }
    })

    const { data } = result;
    const email = data.kakao_account.email;
    const createdAt = formattedTime;
    const params=[email,createdAt];

    //카카오에서 돈이 안들어올 경우
    if (!email) throw new error("KEY_ERROR", 400);

    //DB 사용자가 있는지 확인
    const exist_query = `SELECT email FROM User WHERE email=?`;
    const conn = await pool.getConnection();
    const [user] = await conn.query(exist_query, params);

    //DB 회원가입 & 사용자가 없을 경우
    const create_query = `INSERT INTO User (email, agreeTime, isSocial) VALUES (?,?,'1')`;
    if (!user[0]) {
        await conn.query(create_query, params);
    }

    return [jwt.sign({ email: email }, process.env.JWT_SECRET),email];

};

export default signInKakao;
