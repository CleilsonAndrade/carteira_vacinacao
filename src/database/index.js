const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Vacina = require('../models/vacina');
Vacina.init(connection);

const Cnes = require('../models/cnes');
Cnes.init(connection);

const Enfermeiro = require('../models/enfermeiro');
Enfermeiro.init(connection);

const Paciente = require('../models/paciente');
Paciente.init(connection);

const Carteira = require('../models/carteira');
Carteira.init(connection);

connection
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Database connection not established:' + err);
  });

module.exports = connection;
