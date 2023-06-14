import pool from "../../config/database.js";
import {insert_memory,select_letterid_Memory, select_userid_Memory} from "../../dao/life/memoryDao.js";
import dotenv from 'dotenv';
dotenv.config();

//추억 카드 추가 API
export const memory_create = async (req, res) => {
    // params
    let { memory } = req.body;
    const user_id = req.id;

    const params=[memory,user_id];

    console.log(user_id);
    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        await insert_memory(conn, [params,user_id]);

        return res.status(200).send({
            ok: true
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


// 내 추억상자 보기 (req==user_id)
export const memory_show = async (req, res) => {
    // params
    const user_id = req.id;
    // const {user_id}=req.body;

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        let [data] = await select_userid_Memory(conn,user_id);

        if(data[0]===undefined){
            return res.status(409).send({
                ok:false,
                msg: "해당 사용자는 추억 카드를 작성하지 않았습니다."
            })
        }else{
            const arr = data[0].content.split(',');

            console.log(data);
            return res.status(200).send({
                ok: true,
                count : data.length,
                memory: arr
            })
        }

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};

// 다른 사람 유서 보기 (req==letter_id)
export const memory_othershow = async (req, res) => {
    // params
    const { letter_id } = req.params;

    // execute & respond
    let conn;
    try {
        conn = await pool.getConnection();
        let [data] = await select_letterid_Memory(conn,letter_id);

        if(data[0]===undefined){
            return res.status(409).send({
                ok:false,
                msg: "해당 사용자는 추억 카드를 작성하지 않았습니다."
            })
        }else{
            const arr = data[0].content.split(',');

            console.log(data);
            return res.status(200).send({
                ok: true,
                count : arr.length,
                memory: arr
            })
        }
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    } finally {
        if (conn) conn.release();
    }
};