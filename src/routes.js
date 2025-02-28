const express = require('express');

const routes = express.Router();

const VacinaController = require('./controllers/VacinaController');
const EnfermeiroController = require('./controllers/EnfermeiroController');
const CnesController = require('./controllers/CnesController');
const PacienteController = require('./controllers/PacienteController');
const CarteiraController = require('./controllers/CarteiraController');

// Renderizar pagina inicial
routes.get('/', (req, res) => {
  return res.render('pages/index');
});

// Renderizar a pagina de login e cadastro do enfermeiro
routes.get('/enfermeiro', (req, res) => {
  return res.render('pages/enfermeiro');
});

// Rota do login do enfermeiro e listar as vacinas
routes.post('/enfermeiro', EnfermeiroController.authenticate);

// Rota de cadastro do enfermeiro e cnes
routes.post('/enfermeiro/cadastro', EnfermeiroController.registration);

// Rota do dashboard do enfermeiro
routes.get('/enfermeiro/:user_id', EnfermeiroController.dash);

// Rota de cadastrar vacinas no acesso do enfermeiro
routes.post('/enfermeiro/:user_id', VacinaController.store);

// Renderizar a pagina de login e cadastro do paciente
routes.get('/paciente', (req, res) => {
  return res.render('pages/paciente');
});

// Rota de cadastro do paciente
routes.post('/paciente/cadastro', PacienteController.registration);

// Rota do login do paciente e listar as vacinas
routes.post('/paciente', PacienteController.authenticate);

// Rota do dashboard do paciente
routes.get('/paciente/:user_id', PacienteController.dash);

// Rota do login do paciente e listar as vacinas
routes.post('/paciente/:user_id', CarteiraController.store);

// Rota de logoff
routes.get('/logout', (req, res) => {
  req.body.user_id = undefined;
  return res.redirect('/');
});

// Tratador de exceções
routes.all('*', (req, res, next) => {
  res.render('pages/error');
});

// TESTE - Rota de listar vacinas
// routes.post('/listar_vacina', VacinaController.index)

module.exports = routes;
