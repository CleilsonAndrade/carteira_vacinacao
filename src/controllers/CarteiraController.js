const Carteira = require('../models/carteira');
const Enfermeiro = require('../models/enfermeiro');
const CNES = require('../models/cnes');

module.exports = {
  async store(req, res) {
    const {
      numero_paciente,
      coren_enfermeiro,
      numero_cnes,
      data_aplicacao,
      id_vacina,
    } = req.body;

    const enfermeiroVerified = await Enfermeiro.findOne({
      where: {
        coren_enfermeiro: coren_enfermeiro,
      },
    });

    console.log(enfermeiroVerified ? 'Nurse found' : 'Nurse: Didnt think so');

    const cnesVerified = await CNES.findOne({
      where: {
        numero_cnes: numero_cnes,
      },
    });

    if (!enfermeiroVerified && !cnesVerified) {
      return res.render('pages/error', {
        validation: true,
      });
    }

    const carteira = await Carteira.sequelize.query(
      'CALL sp_cadastrarCarteira(:paciente_numero, :coren_enfermeiro, :numero_cnes, :id_vacina, :data_aplicacao)',
      {
        replacements: {
          paciente_numero: numero_paciente,
          coren_enfermeiro: coren_enfermeiro,
          numero_cnes: numero_cnes,
          id_vacina: id_vacina,
          data_aplicacao: data_aplicacao,
        },
      }
    );

    res.redirect(req.url);
  },
};
