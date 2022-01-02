
const Karyawan = require('../models/karyawan');

exports.getKaryawan = (req,res) => {
    Karyawan.findAll({attributes: ['nik','nama', 'alamat', 'tanggallahir', 'tanggalbergabung' ]})
    .then(karyawan => {
        res.send(karyawan)
    })
    .catch(err => console.log(err));

  };

  exports.postAddKaryawan = (req,res,next) => {
    const nik = req.body.nik;
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const tanggallahir = req.body.tanggallahir;
    const tanggalbergabung = req.body.tanggalbergabung;  

    Karyawan.create({
    nik: nik,
    nama:nama,
    alamat:alamat,
    tanggallahir:tanggallahir,
    tanggalbergabung:tanggalbergabung
    })
    .then(result => {
        res.send("Data Karyawan sudah ditambahkan ");
    //   res.redirect('/admin/checklistmeja');
    }
    ).catch(err => console.log(err));
  
  };

  exports.deleteKaryawan = ( req,res, next) => {
    const id = req.params.id;
    console.log(id);
    console.log(id);
    Karyawan.findByPk(id)
      .then(hasil => {
        return hasil.destroy();
      })
      .then(result => {
        res.send("Data Karyawan sudah dihapus ");

        // res.redirect('/admin/buktiTemuanruang');
      })
      .catch(err => console.log(err));
  };
  
  exports.putEditKaryawan = (req,res,next) => {
    const id = req.params.id;
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const tanggallahir = req.body.tanggallahir;
    const tanggalbergabung = req.body.tanggalbergabung;  
    
    Karyawan.findByPk(id)
    .then(karyawan => {
        karyawan.nama = nama;
        karyawan.alamat = alamat;
        karyawan.tanggallahir = tanggallahir;
        karyawan.tanggalbergabung = tanggalbergabung;
      return karyawan.save();
    })
    .then(result => {
    //   res.redirect('/admin/checklistmeja');
    res.send("Data Karyawan sudah diubah ")
    
    })
    .catch(err => console.log(err));
  
  };
  