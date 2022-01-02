const Cuti = require('../models/cuti');

exports.getCuti = (req,res) => {

    Cuti.findAll()
    .then(cuti => {
        res.send(cuti)
    })
    .catch(err => console.log(err));
  
  };

  exports.postAddCuti = (req,res,next) => {
    const nik = req.body.nik;
    const tanggalcuti = req.body.tanggalcuti;
    const lamacuti = req.body.lamacuti;
    const keterangan = req.body.keterangan;

    Cuti.create({
    karyawanNik: nik,
    tanggalcuti : tanggalcuti,
    lamacuti : lamacuti,
    keterangan : keterangan
    })
    .then(result => {
        res.send("Data Karyawan Cuti sudah ditambahkan ");
    //   res.redirect('/admin/checklistmeja');
    }
    ).catch(err => console.log(err));
  
  };

  exports.deleteCutiKaryawan = ( req,res, next) => {
    const id = req.params.id;
    Cuti.findByPk(id)
      .then(hasil => {
        return hasil.destroy();
      })
      .then(result => {
        res.send("Data Cuti Karyawan sudah dihapus ");

        // res.redirect('/admin/buktiTemuanruang');
      })
      .catch(err => console.log(err));
  };
  
  exports.putEditCutiKaryawan = (req,res,next) => {
    const id = req.params.id;
    const tanggalcuti = req.body.tanggalcuti;
    const lamacuti = req.body.lamacuti;
    const keterangan = req.body.keterangan; 
    
    Cuti.findByPk(id)
    .then(karyawan => {
        karyawan.tanggalcuti = tanggalcuti,
        karyawan.lamacuti=lamacuti,
        karyawan.keterangan=keterangan
      return karyawan.save();
    })
    .then(result => {
    //   res.redirect('/admin/checklistmeja');
    res.send("Data Karyawan sudah diubah ")
    
    })
    .catch(err => console.log(err));
  
  };
  
