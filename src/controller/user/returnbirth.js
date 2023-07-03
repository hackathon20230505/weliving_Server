import pool from "../../config/database.js";

export const getbirth = async (req, res) => {
  let conn;

  try {
    const userID = req.id;

    conn = await pool.getConnection();

    const kakao_query = `SELECT Birth FROM User WHERE user_id=?`;

    const [data] = await conn.query(kakao_query, userID);
    console.log(data);
    if (data[0].Birth == null) {
      res.status(200).send({
        ok: 0,
        // birth: false,
      });
    }

    const sql = `SELECT birth FROM User WHERE user_id=? ;`;
    const [birth] = await conn.query(sql, [userID]);

    res.status(200).send({
      ok: 1,
      //   birth: true,
      //   birth: birth[0].birth,
    });
  } catch (err) {
    res.status(404).send({
      ok: 1,
    });
  } finally {
    if (conn) conn.release();
  }
};

export default getbirth;
