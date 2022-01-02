// const sequelize = require('../util/database');


const Karyawan = require('../models/karyawan');
const Cuti = require('../models/cuti');
const sequelize = require('../util/database');

exports.getDashboard = (req,res) => {
    Karyawan
    .findAll({
        order: [
            ['tanggalbergabung', 'ASC']
        ],
        attributes: ['nama'],
        limit:3
      }
    )
    .then(karyawan => {
        // res.send(karyawan)
        res.render('./dashboard', {
          active: "",
          pageTitle: "Karyawan",
          karyawan: karyawan,
        });
    })
    .catch(err => console.log(err));
  };

  exports.getSisaCuti = (req,res) => {

    Cuti.findAll({
        include: [{ model: Karyawan, attributes: ['nama']}],
        attributes: ['karyawanNik',  [sequelize.literal('12 - sum(lamacuti)'), 'lamacuti']],
        group : ['karyawanNik'],
    })
    .then(cuti => {
        console.log(cuti);
        res.send(cuti)
    })
    .catch(err => console.log(err));
  };

  exports.getKaryawanCutiLebihDariSatu = (req,res) => {

    Cuti.findAll({
        include: [{ model: Karyawan, attributes: ['nama']}],
        attributes: ['karyawanNik', 'tanggalcuti', 'keterangan'],
        having: sequelize.where(sequelize.fn('COUNT', sequelize.col('karyawanNik')), '>=', 2)
    })
    .then(cuti => {
        console.log(cuti);
        res.send(cuti)
    })
    .catch(err => console.log(err));
  };