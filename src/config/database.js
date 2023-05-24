import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';


const config = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  port: `${process.env.DB_PORT}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
};



const pool = mysql.createPool(config);

/*
const getConnect = ()=>{
  console.log('1');
  pool.getConnection((err, connection) => {
    console.log('2');
    try { // 서버는 절대죽으면안되기때문에 handling하는 코드가 있어야함
      //Use the connection
      console.log('1');
      connection.query("SELECT * FROM hackathon.Letter", (error, results) => {
        //When done with the connection, release it.
        connection.release(); //무조건해줘야함

        console.log("getConnections : ", results);
        res.status(200).json({ results });
        // Handle error after the release
        if (error) {
          console.log("query" + error);
        }//이거는 쿼리에대한 error
      });
    } catch (err) {
      console.log(err);
    }
  })
};
*/

export default pool;