const Sequelize = require('sequelize');

const sequelize = new Sequelize('u2964880_karyawan_cuti', 'u2964880_root', 'password', {
  dialect: 'mysql',
  host: '153.92.8.1',
  // pool: {
  //   max: 25,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
});


module.exports = sequelize;
