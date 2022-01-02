const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Karyawan = sequelize.define('karyawan', {
  nik: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false
  },
  alamat: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tanggallahir: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  tanggalbergabung: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

module.exports = Karyawan;
