import pool from "../../config/database.js";


const list = async (req, res) => {
    // db
    try {
        const data = await pool.query("select * from Letter");
        return res.json(data[0]);
    } catch (error) {
        console.log("error");
        return res.json(error);
    }
};


export default list;