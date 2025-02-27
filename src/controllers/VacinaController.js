const Vacina = require('../models/vacina');

module.exports = {
  async index(req, res) {
    const vacinasStored = await Vacina.findAll();
    const vacinasString = JSON.stringify(vacinasStored);

    return vacinasString;
  },

  async store(req, res) {
    const { lote_vacina, nome_vacina, descricao_vacina, faixa_etaria } = req.body;

    const vacina = await Vacina.create({
      lote_vacina,
      nome_vacina,
      descricao_vacina,
      faixa_etaria
    });
    res.redirect(req.url);
  }
};