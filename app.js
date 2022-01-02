const path = require('path');
const express = require('express');
const bodyPaser = require('body-parser');

const app = express();

const dashboardRoutes = require('./routes/dashboard');
const karyawanRoutes = require('./routes/karyawan');
const cutiRoutes = require('./routes/cuti');

const Karyawan = require('./models/karyawan');
const Cuti = require('./models/cuti');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyPaser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require('./util/database');

app.use(dashboardRoutes);
app.use('/karyawan',karyawanRoutes);
app.use('/cuti',cutiRoutes);

// app.use(flash());

Karyawan.hasMany(Cuti,  {foreignKey: 'karyawanNik', as: 'karyawanCuti' });
Cuti.belongsTo(Karyawan , { constraints:true});

sequelize
  .sync()
  // .sync({alter: true})
//   .sync({force: true})
  .then(result => {
    app.listen(3000);
  })
  .catch( err => {
    console.log(err);
    process.exit(1);
  });