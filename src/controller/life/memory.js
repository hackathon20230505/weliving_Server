import pool from "../../config/database.js";
import {insert_memory,select_letterid_Memory, select_userid_Memory} from "../../dao/life/memoryDao.js";
import dotenv from 'dotenv';
dotenv.config();

//추억 카드 추가 API
export const memory_create = async (req, res) => {
    // params
    let { memory} = req.body;
    memory=JSON.stringify(memory);
    const user_id = req.id;

    const params=[memory,user_id];

    // execute & respond
    try {
        const conn = await pool.getConnection();
        const [letter_id]=await insert_memory(conn, [params,user_id]);

        return res.status(200).send({
            ok: true,
            letter_id
        })

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }

};


// 내 추억상자 보기 (req==user_id)
export const memory_show = async (req, res) => {
    // params
    const user_id = req.id;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        let [data] = await select_userid_Memory(conn,user_id);

        if(data[0]===undefined){
            return res.status(409).send({
                ok:false,
                msg: "해당 사용자는 추억 카드를 작성하지 않았습니다."
            })
        }else{
            data=JSON.parse(data[0].content);

            return res.status(200).send({
                ok: true,
                count : Object.keys(data).length,
                memory: data
            })
        }

    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};

// 다른 사람 유서 보기 (req==letter_id)
export const memory_othershow = async (req, res) => {
    // params
    const { letter_id } = req.body;

    // execute & respond
    try {
        const conn = await pool.getConnection();
        let [data] = await select_letterid_Memory(conn,letter_id);

        if(data[0]===undefined){
            return res.status(409).send({
                ok:false,
                msg: "해당 사용자는 추억 카드를 작성하지 않았습니다."
            })
        }else{
            data=JSON.parse(data[0].content);
            return res.status(200).send({
                ok: true,
                count : Object.keys(data).length,
                memory: data
            }) 
        }
        
    } catch (err) {
        res.status(409).send({
            ok: false,
            msg: err.message,
        })
    }
};