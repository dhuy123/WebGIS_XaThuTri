const {Pool} = require('pg');
require('dotenv').config();

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await db.connect();
    console.log('Kết nối đến PostgreSQL thành công!');
  } catch (error) {
    console.error('Lỗi kết nối PostgreSQL:', error);
  }
};


module.exports = {db, connectDB};