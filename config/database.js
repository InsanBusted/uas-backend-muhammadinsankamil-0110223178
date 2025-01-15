// import mysql
import mysql from 'mysql';

// import dotenv dan jalankan method config
import dotenv from 'dotenv';
dotenv.config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

/**
 * Membuat koneksi database menggunakan method createConnection
 * Method menerima parameter object: host, user, password, database
 */
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

console.log()

/**
 * Menghubungkan ke database menggunakan method connect
 * Menerima parameter callback
 */
db.connect((err) => {
  if (err) {
    console.log("Error connecting " + err.stack);
    return;
  } else {
    console.log("Connected to database");
    return;
  }
});

export default db;
