import pool from "../../config/database.js";
import { formattedTime } from "../../utils/time.js"
import { insert, select_LetterList, select_userid_Letter, select_letterid_Letter, update_modify_isShare, update_modify_content } from "../../dao/life/letterDao.js"
import dotenv from 'dotenv';
dotenv.config();

//유서 작성 API
export const letter_create = async (req, res) => {

    // params
    const { title, content } = req.body;
    const user_id = req.id;
    const createdAt = formattedTime;
    const isShare = 1; //true
    const params = [title, content, createdAt, isShare, user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        await insert(conn, params);

        return res.status(200).send({
            ok: true
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};

// 최종 유서 리스트
export const letter_list = async (req, res) => {
    // params
    const { birth } = req.body;


    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await select_LetterList(conn, birth);
        conn.release();
        return res.status(200).send({
            ok: true,
            data: {
                count: data.length,
                letter: data
            }
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 내 유서 보기 (req==user_id)
export const letter_show = async (req, res) => {
    // params
    // const { user_id }=req.body;
    const user_id = req.id;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await select_userid_Letter(conn, user_id);
        conn.release();
        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 다른 사람 유서 보기 (req==letter_id)
export const letter_othershow = async (req, res) => {
    // params
    const { letter_id } = req.body;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [data] = await select_letterid_Letter(conn, letter_id);
        conn.release();
        return res.status(200).send({
            ok: true,
            data: data
        })
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 공개 & 비공개 수정하기
export const modify_isShare = async (req, res) => {
    //params
    const { isShare } = req.body;
    const user_id = req.id;
    const params = [isShare, user_id];

    //execute & respond
    try {
        const conn = await pool.getConnection();
        await update_modify_isShare(conn, params);
        conn.release();
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

// 유서 내용 수정하기
export const modify_content = async (req, res) => {
    //params
    const { title, content} = req.body;
    const createdAt = formattedTime;
    const user_id = req.id;
    const params = [title, content, createdAt, user_id];

    //execute & respond
    try {
        const conn = await pool.getConnection();
        await update_modify_content(conn, params);
        conn.release();
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