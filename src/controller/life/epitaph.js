import pool from "../../config/database.js";
import { insert_epitaph, select_epitaph } from "../../dao/life/epitaphDao.js";
import dotenv from 'dotenv';
dotenv.config();

//묘비명 추가 API
export const epitaph_create = async (req, res) => {
    // params
    const { epitaph } = req.body;
    const user_id = req.id;
    const params = [epitaph, user_id];
    console.log(params);

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        await insert_epitaph(conn,params);
        //성공
        return res.status(200).send({
            ok: true,
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};

//묘비명 불러오기 API
export const epitaph_show = async (req, res) => {
    // params
    const user_id = req.id;
    // const {user_id}=req.body;

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        const [data] = await select_epitaph(conn,user_id);

        //성공
        return res.status(200).send({
            ok: true,
            data: data
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};