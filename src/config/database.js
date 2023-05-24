import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

//DB 설정
const config = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  port: `${process.env.DB_PORT}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
  dateStrings: 'date' //YYYY-MM-DD format으로 나타내기위함
};

//pool 생성
const pool = mysql.createPool(config);

export default pool;

