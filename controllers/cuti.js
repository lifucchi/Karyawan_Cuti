
const Karyawan = require('../models/karyawan');
const Cuti = require('../models/cuti');
const sequelize = require('../util/database');

exports.getCuti = (req,res) => {
  if (res.locals.error_messages.length > 0) {
    res.locals.error_messages = res.locals.error_messages[0];
  } else {
    res.locals.error_messages = null;
  }

  if (res.locals.success_messages.length > 0) {
    res.locals.success_messages = res.locals.success_messages[0];
  } else {
    res.locals.success_messages = null;
  }

  const cutiKaryawan =  
      Cuti.findAll({
        include: [{ model: Karyawan, attributes: ['nama']}]
    });
    const lebihCuti = 
    Cuti.findAll({
      include: [{ model: Karyawan, attributes: ['nama']}],
      attributes: ['karyawanNik', 'tanggalcuti', 'keterangan'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('karyawanNik')), '>=', 2),
      group : ['karyawanNik'],
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
    if (res.locals.error_messages.length > 0) {
      res.locals.error_messages = res.locals.error_messages[0];
    } else {
      res.locals.error_messages = null;
    }
  
    if (res.locals.success_messages.length > 0) {
      res.locals.success_messages = res.locals.success_messages[0];
    } else {
      res.locals.success_messages = null;
    }
  
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
      if (res.locals.error_messages.length > 0) {
        res.locals.error_messages = res.locals.error_messages[0];
      } else {
        res.locals.error_messages = null;
      }
    
      if (res.locals.success_messages.length > 0) {
        res.locals.success_messages = res.locals.success_messages[0];
      } else {
        res.locals.success_messages = null;
      }
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

      Cuti.findAll({
        where: {karyawanNik: nik},
        include: [{ model: Karyawan, attributes: ['nama']}],
        attributes: ['karyawanNik',  [sequelize.literal('12 - sum(lamacuti)'), 'lamacuti']],
        group : ['karyawanNik'],
    })
    .then(sisacuti =>{
      // console.log(sisacuti);
      if(sisacuti[0] != null){
        console.log(sisacuti[0].lamacuti);
        let hasil = sisacuti[0].lamacuti - lamacuti;
        console.log("INI HASIIIIIIIIIL");
        console.log(hasil);
        if ( hasil >= 0 ){
          Cuti.create({
            karyawanNik: nik,
            tanggalcuti : tanggalcuti,
            lamacuti : lamacuti,
            keterangan : keterangan
          })
          .then(result => {
              // res.send("Data Karyawan Cuti sudah ditambahkan ");
            req.flash('success_messages', 'Cuti Karyawan berhasil ditambah');
            // setTimeout(() => { return res.redirect('/cuti');}, 2000);
            { return res.redirect('/cuti');}
          }).catch(err => {
            console.log(err);
            req.flash('error_messages', 'Gagal menambah data Cuti Karyawan');
            return res.redirect('/cuti')
          });
        }else{
          req.flash('error_messages', 'Gagal menambah data karena waktu cuti melebihi 12 hari');
          return res.redirect('/cuti')
        }
      }else{
        Cuti.create({
          karyawanNik: nik,
          tanggalcuti : tanggalcuti,
          lamacuti : lamacuti,
          keterangan : keterangan
        })
        .then(result => {
            // res.send("Data Karyawan Cuti sudah ditambahkan ");
          req.flash('success_messages', 'Cuti Karyawan berhasil ditambah');
          // setTimeout(() => { return res.redirect('/cuti');}, 2000);    
          return res.redirect('/cuti');    
        }).catch(err => {
          console.log(err);
          req.flash('error_messages', 'Gagal menambah data Cuti Karyawan');
          return res.redirect('/cuti')
        });

      }



    })
    .catch(err => {
      console.log(err);
      req.flash('error_messages', 'Gagal menambah data');
      return res.redirect('/cuti')
    });

  
  };

  exports.deleteCutiKaryawan = ( req,res, next) => {
    const id = req.body.id;
    Cuti.findByPk(id)
      .then(hasil => {
        return hasil.destroy();
      })
      .then(result => {
        // res.send("Data Cuti Karyawan sudah dihapus ");
        req.flash('success_messages', 'Cuti Karyawan berhasil dihapus');
        res.redirect('/cuti');
      })
      .catch(err => {
        console.log(err);
        req.flash('error_messages', 'Gagal menghapus data');
        res.redirect('/cuti/')
    
      });
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
      req.flash('success_messages', 'Cuti Karyawan berhasil diubah');
      res.redirect('/cuti');
    // res.send("Data Karyawan sudah diubah ")
    
    })
    .catch(err => {
      console.log(err);
      req.flash('error_messages', 'Gagal mengubah data');
      res.redirect('/cuti')
  
    });
  
  };
  
