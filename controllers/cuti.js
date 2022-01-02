
const Karyawan = require('../models/karyawan');
const Cuti = require('../models/cuti');
const sequelize = require('../util/database');

exports.getCuti = (req,res) => {

  const cutiKaryawan =  
      Cuti.findAll({
        include: [{ model: Karyawan, attributes: ['nama']}],
        attributes: ['karyawanNik', 'tanggalcuti', 'keterangan' ]
    });
    const lebihCuti = 
    Cuti.findAll({
      include: [{ model: Karyawan, attributes: ['nama']}],
      attributes: ['karyawanNik', 'tanggalcuti', 'keterangan'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('karyawanNik')), '>=', 2)
  })

  const sisaCuti =
  Cuti.findAll({
    include: [{ model: Karyawan, attributes: ['nama']}],
    attributes: ['karyawanNik', [sequelize.literal('12 - lamacuti'), 'sisacuti'] ]
})

      // res.render('./cuti', {
      //   pageTitle: "Cuti Karyawan",
      //   active: "uk-active",
      //   daftarkaryawan: cuti
      // });


      Promise
      .all([cutiKaryawan,lebihCuti, sisaCuti])
      .then(count => {
          console.log('**********COMPLETE RESULTS****************');

  
          res.render('./cuti', {
            pageTitle: 'Cuti Karyawan',
            lebihCuti: count[1],
            sisaCuti: count[2],
            daftarkaryawan: count[0],
          });

      })
      .catch(err => {
          console.log('**********ERROR RESULT****************');
          console.log(err);
      });




   
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
  
