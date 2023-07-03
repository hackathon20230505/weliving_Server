import pool from "../../config/database.js";

export const checkMemory = async (req, res) => {
  let conn;

  try {
    const userID = req.id;

    conn = await pool.getConnection();

    const sql = `SELECT CASE WHEN EXISTS (SELECT 1 FROM Memory WHERE user_id = ?) THEN 1 ELSE 0 END AS exists_in_memory;`;
    const [response] = await conn.query(sql, [userID]);

    const existsInMemory = response[0].exists_in_memory === 1;

    if (existsInMemory) {
      return res.status(200).send({ existsInMemory: 1 });
    } else {
      return res.status(200).send({ existsInMemory: 0 });
    }
  } catch (err) {
    res.status(404).send({
      ok: false,
      msg: err.message,
    });
  } finally {
    if (conn) conn.release();
  }
};

export const checkLetter = async (req, res) => {
  let conn;

  try {
    const userID = req.id;

    conn = await pool.getConnection();

    const sql = `SELECT CASE WHEN EXISTS (SELECT 1 FROM Letter WHERE user_id = ?) THEN 1 ELSE 0 END AS exists_in_letter;`;
    const [response] = await conn.query(sql, [userID]);

    const existsInLetter = response[0].exists_in_letter === 1;

    if (existsInLetter) {
      return res.status(200).send({ existsInLetter: 1 });
    } else {
      return res.status(200).send({ existsInLetter: 0 });
    }
  } catch (err) {
    res.status(404).send({
      ok: false,
      msg: err.message,
    });
  } finally {
    if (conn) conn.release();
  }
};
