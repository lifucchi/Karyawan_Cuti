const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cuti = sequelize.define('cuti', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tanggalcuti: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  lamacuti: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  keterangan: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Cuti;
