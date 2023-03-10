const Cnes = require('../models/cnes')

module.exports = {
  async index(req, res) {
    const cnes = await Cnes.findAll()

    return res.json(cnes)
  },

  async registrationEstablishment(numero_cnes, nome_cnes) {
    const [cnes, created] = await Cnes.findOrCreate({
      where: {
        numero_cnes: numero_cnes, nome_cnes: nome_cnes
      }
    })

    return created
  }
}