import pg from "pg";
import 'dotenv/config'

const USER_DB = process.env.USER_DB
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const PORT = process.env.PORT
const DATABASE = process.env.DATABASE

const dbConfig = {
  user: USER_DB,
  password: PASSWORD,
  host: HOST,
  port: PORT,
  database: DATABASE,
};

const { Pool } = pg

// const dbConfig = {
//   user: 'postgres',
//   password: '2005',
//   host: 'localhost',
//   port: '5432',
//   database: 'todolist',
// };

const pool = new Pool(dbConfig);

// let x = await pool.query('select * from tasks')
// console.log(x.rows)

 export default pool
