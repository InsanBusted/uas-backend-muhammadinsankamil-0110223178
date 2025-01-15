// import database
import db from "./../config/database.js"

// membuat class Patient
class Patient {
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      const sql = "SELECT * FROM patients";
      // console.log(sql)
      db.query(sql, (err, results) => {
        if (err) {
          //jika error reject
          reject(err);
        } else {
          //jika berhasil resolve
          resolve(results);
        }
      });
    });
  }

  static find(id) {
    // method untuk menampilkan data berdasarkan id
    return new Promise((resolve, reject) => {
      // lakukan query ke db untuk ambil data berdasarkan id
      const sql = `SELECT * FROM patients WHERE id = ?`;
      db.query(sql, id, (err, results) => {
        if (err) {
          //jika error reject
          reject(err);
        } else {
          //jika berhasil resolve
          resolve(results[0]);
        }
      });
    });
  }

  static async create(body) {
    try {
      const SQL = `INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at) VALUES (?, ?, ?, ?, ?, ?)`;
  
      // Menggunakan db.query dengan query parameter untuk mencegah SQL Injection
      const id = await new Promise((resolve, reject) => {
        db.query(SQL, [body.name, body.phone, body.address, body.status, body.in_date_at, body.out_date_at], (err, result) => {
          if (err) {
            reject(err); // Jika ada error, reject promise
          } else {
            resolve(result.insertId); // Jika sukses, resolve dengan hasil
          }
        });
      });

      const createdPatient = await this.find(id);

      return createdPatient;
    } catch (error) {
      throw new Error(error); // Menangkap error jika ada masalah dalam proses async
    }
  }

   // method untuk mengupdate data
   static async update(id, data) {
    try {
      // await untuk menunggu hasil dari pemanggilan query update data student
      await new Promise((resolve, reject) => {
        const sql = "UPDATE patients SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      // Setelah berhasil update, panggil method find untuk mengambil data yang baru diupdate
      const updatedPatient = await this.find(id);

      return updatedPatient;
    } catch (err) {
      throw err; // Menangani error jika terjadi
    }
  }

  // method untuk menghapus data
static async delete(id) {
  return new Promise((resolve, reject) => {
    // lakukan query ke db untuk ambil data berdasarkan id
    const sql = "DELETE FROM patients WHERE id = ?";
    // jalankan query dan kirimkan id sebagai parameter query
    db.query(sql, id, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Method untuk mencari pasien berdasarkan nama
static searchByName(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE name LIKE ?";
    // console.log(sql)
    db.query(sql, [`%${name}%`], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

static findByStatus(positive) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE status = ?";
    db.query(sql, [positive], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
static findByStatus(dead) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE status = ?";
    db.query(sql, [dead], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
static findByStatus(recovered) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE status = ?";
    db.query(sql, [recovered], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

  
}

// export class Patient
export default Patient;
