
const Karyawan = require('../models/karyawan');
const Cuti = require('../models/cuti');
const sequelize = require('../util/database');

exports.getCuti = (req,res) => {


  const cutiKaryawan =  
      Cuti.findAll({
        include: [{ model: Karyawan, attributes: ['nama']}]
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
    attributes: ['karyawanNik',  [sequelize.literal('12 - sum(lamacuti)'), 'lamacuti']],
    group : ['karyawanNik'],

})

      Promise
      .all([cutiKaryawan,lebihCuti, sisaCuti])
      .then(count => {
          console.log('**********COMPLETE RESULTS****************');
          console.log(count[0]);
  
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


  exports.getFormCuti = (req,res) => {
    Karyawan.findAll()
    .then( karyawan =>{
      res.render('./cuti-form', {
        pageTitle: "Cuti Karyawan",
        active: "uk-active",
        daftarkaryawan: karyawan
      });  
    })
    .catch(err => {
      console.log('**********ERROR RESULT****************');
      console.log(err);
  });
    };
    

    exports.getFormEditCutiKaryawan = (req,res) => {
      const id = req.query.update;

      Cuti.findByPk(id)
      .then(cuti => {

        Karyawan.findAll()
        .then( karyawan =>{
          res.render('./cuti-form-edit', {
            pageTitle: "Cuti Karyawan",
            active: "uk-active",
            cuti: cuti,
            daftarkaryawan: karyawan
          });  
        })

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
        // res.send("Data Karyawan Cuti sudah ditambahkan ");
      res.redirect('/cuti');
    }
    ).catch(err => console.log(err));
  
  };

  exports.deleteCutiKaryawan = ( req,res, next) => {
    const id = req.body.id;
    Cuti.findByPk(id)
      .then(hasil => {
        return hasil.destroy();
      })
      .then(result => {
        // res.send("Data Cuti Karyawan sudah dihapus ");

        res.redirect('/cuti');
      })
      .catch(err => console.log(err));
  };
  
  exports.putEditCutiKaryawan = (req,res,next) => {
    const id = req.body.id;
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
      res.redirect('/cuti');
    // res.send("Data Karyawan sudah diubah ")
    
    })
    .catch(err => console.log(err));
  
  };
  
