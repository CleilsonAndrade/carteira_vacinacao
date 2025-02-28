const Enfermeiro = require('../models/enfermeiro');
const VacinaController = require('./VacinaController');
const CnesController = require('./CnesController');

const { Op } = require('sequelize');
const { md5, generate_key } = require('../utils/helper.utils');

let bodyData;

async function setBody(body) {
  bodyData = await body;
}

module.exports = {
  async authenticate(req, res) {
    const { coren_enfermeiro, senha_enfermeiro } = req.body;

    const enfermeiro = await Enfermeiro.findOne({
      attributes: { exclude: ['senha_enfermeiro'] },
      where: {
        [Op.and]: [
          { coren_enfermeiro: coren_enfermeiro },
          { senha_enfermeiro: md5(senha_enfermeiro) },
        ],
      },
    });

    if (!enfermeiro) {
      return res.render('pages/enfermeiro', {
        signInError: 'Favor validar as credenciais de acesso',
      });
    }

    let userId = generate_key();

    enfermeiro.dataValues.user_id = userId;

    let data = { ...enfermeiro.dataValues };

    req.body.data = data;

    setBody(req.body.data);
    res.redirect(`/enfermeiro/${userId}`);
  },

  async registration(req, res) {
    const {
      numero_cnes,
      nome_cnes,
      coren_enfermeiro,
      nome_enfermeiro,
      senha_enfermeiro,
    } = req.body;

    const enfermeiroVerified = await Enfermeiro.findOne({
      where: {
        [Op.and]: [
          { coren_enfermeiro: coren_enfermeiro },
          { nome_enfermeiro: nome_enfermeiro },
        ],
      },
    });

    if (!enfermeiroVerified) {
      const cnesVerified = await CnesController.registrationEstablishment(
        numero_cnes,
        nome_cnes
      );

      const enfermeiro = await Enfermeiro.create({
        numero_cnes,
        coren_enfermeiro,
        nome_enfermeiro,
        senha_enfermeiro: md5(senha_enfermeiro),
      });

      return res.render('pages/enfermeiro', {
        signUpError: 'Usuário cadastrado com sucesso',
      });
    }

    return res.render('pages/enfermeiro', {
      signUpError: 'Usuário já cadastrado',
    });
  },

  async dash(req, res) {
    const vacinaReturned = await VacinaController.index();
    const vacinaCollection = JSON.parse(vacinaReturned);

    bodyData = { ...bodyData, vacinaCollection };

    if (req.params.user_id == bodyData.user_id) {
      return res.render('pages/dash_enfermeiro', { data: bodyData });
    } else {
      return res.redirect('/');
    }
  },
};
