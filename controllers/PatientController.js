// import Model Patient
import Patient from "./../models/Patient.js"

// buat class PatientController
class PatientController {
  // buat fungsi
  async index(req, res) {
    try {
      const patient = await Patient.all();
      const data = {
        message: "Menampilkan data Patient",
        data: patient,
      };
      res.status(200).json(data);
    } catch (err) {
      // catch untuk menangkap error
      const data = {
        message: "data is empty",
        error: err.message,
      };
      res.status(500).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.find(id);
      const data = {
        message: `Menampilkan data patient dengan id ${id}`,
        data: patient,
      };
      return res.status(200).json(data);
    } catch (err) {
      // catch untuk menangkap error
      const data = {
        message: "Resource Not Found",
        error: err.message,
      };
      res.status(404).json(data);
    }
  }


  async store(req, res) {

    const body = req.body;
    try {
      const patient = await Patient.create(body);

      const response = {
        message: "Data berhasil ditambahkan",
        data: patient,
      };

      return res.status(201).json(response);
    } catch (err) {
      const response = {
        message: "Terjadi kesalahan",
        error: err.message,
      };
      res.status(500).json(response);
    }
}

async update(req, res) {
  // ambil id dari parameter
  const { id } = req.params;
  // ambil data dari body
  const data = req.body;

  try {
    // await untuk menunggu hasil dari pemanggilan method update() pada model student
    const patient = await Patient.update(id, data);

    const response = {
      message: "Data berhasil diubah",
      data: patient,
    };

    return res.status(200).json(response);
  } catch (err) {
    const response = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(500).json(response);
  }
}

// method destroy untuk menghapus data student
async destroy(req, res) {
  // ambil id dari parameter
  const { id } = req.params;

  try {
    // await untuk menunggu hasil dari pemanggilan method destroy() pada model student
    await Patient.delete(id);

    const response = {
      message: "Data berhasil dihapus",
    };

    return res.status(200).json(response);
  } catch (err) {
    const response = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(500).json(response);
  }
}

// Method untuk mencari pasien berdasarkan nama
async search(req, res) {
  const { name } = req.params;
  try {
    const patients = await Patient.searchByName(name);
    if (patients.length === 0) {
      return res.status(404).json({
        message: "Pasien tidak ditemukan",
      });
    }
    
    return res.status(200).json({
      message: `Menampilkan data pasien yang namanya mengandung '${name}'`,
      data: patients,
    });
  } catch (err) {
    const data = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(404).json(data);
  }
}

async statusPositive(req, res) {
  try {
    const patients = await Patient.findByStatus("positive");
    if (patients.length === 0) {
      return res.status(404).json({
        message: "Pasien dengan status 'positive' tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: `Menampilkan data pasien dengan status Positive`,
      data: patients,
    });
  } catch (err) {
    const data = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(500).json(data);
  }
}
async statusDead(req, res) {
  try {
    const patients = await Patient.findByStatus("dead");
    if (patients.length === 0) {
      return res.status(404).json({
        message: "Pasien dengan status 'dead' tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: `Menampilkan data pasien dengan status Dead`,
      data: patients,
    });
  } catch (err) {
    const data = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(500).json(data);
  }
}
async statusRecovered(req, res) {
  try {
    const patients = await Patient.findByStatus("recovered");
    if (patients.length === 0) {
      return res.status(404).json({
        message: "Pasien dengan status 'recovered' tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: `Menampilkan data pasien dengan status Recovered`,
      data: patients,
    });
  } catch (err) {
    const data = {
      message: "Terjadi kesalahan",
      error: err.message,
    };
    res.status(500).json(data);
  }
}
  


}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
export default object
