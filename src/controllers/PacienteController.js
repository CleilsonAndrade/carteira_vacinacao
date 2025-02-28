const Paciente = require('../models/paciente');
const VacinaController = require('./VacinaController');

const { Op } = require('sequelize');
const { md5, generate_key } = require('../utils/helper.utils');

let bodyData;

async function setBody(body) {
  bodyData = await body;
}

module.exports = {
  async authenticate(req, res) {
    const { login_paciente, senha_paciente } = req.body;

    const pacienteAuth = await Paciente.findOne({
      attributes: { exclude: ['senha_paciente'] },
      where: {
        [Op.and]: [
          { login_paciente: login_paciente },
          { senha_paciente: md5(senha_paciente) },
        ],
      },
    });

    if (!pacienteAuth) {
      return res.render('pages/paciente', {
        signInError: 'Favor validar as credenciais de acesso',
      });
    }

    let data = { ...pacienteAuth.dataValues };

    const { numero_paciente, nascimento } = data;

    const pacienteDados = await Paciente.sequelize.query(
      'CALL sp_consultarCarteira(:acao_paciente, :num_paciente, :nascimento, :login, :senha)',
      {
        replacements: {
          acao_paciente: 'selectPacienteDados',
          num_paciente: numero_paciente,
          nascimento: nascimento,
          login: login_paciente,
          senha: senha_paciente,
        },
      }
    );

    const userId = generate_key();

    pacienteDados[0].data_nascimento = nascimento;
    pacienteDados[0].user_id = userId;
    pacienteDados[0].login_paciente = login_paciente;
    pacienteDados[0].senha_paciente = senha_paciente;

    data = { ...pacienteDados[0] };

    req.body.data = data;

    setBody(req.body.data);

    res.redirect(`/paciente/${userId}`);
  },

  async registration(req, res) {
    const {
      numero_paciente,
      nome_paciente,
      nascimento_paciente,
      sexo_paciente,
      login_paciente,
      senha_paciente,
    } = req.body;

    const pacienteVerified = await Paciente.findOne({
      where: {
        [Op.and]: [
          { login_paciente: login_paciente },
          { senha_paciente: senha_paciente },
        ],
      },
    });

    if (!pacienteVerified) {
      const paciente = await Paciente.sequelize.query(
        'CALL sp_cadastrarPaciente (:paciente_numero, :paciente_nome, :paciente_nascimento, :sexo_paciente, :login, :senha)',
        {
          replacements: {
            paciente_numero: numero_paciente,
            paciente_nome: nome_paciente,
            paciente_nascimento: nascimento_paciente,
            sexo_paciente: sexo_paciente,
            login: login_paciente,
            senha: senha_paciente,
          },
        }
      );

      return res.render('pages/paciente', {
        signUpError: 'Usuário cadastrado com sucesso',
      });
    }

    return res.render('pages/paciente', {
      signUpError: 'Usuário já cadastrado',
    });
  },

  async dash(req, res) {
    const { numero_paciente, data_nascimento, login_paciente, senha_paciente } =
      bodyData;

    const carteiraDados = await Paciente.sequelize.query(
      'CALL sp_consultarCarteira(:acao_paciente, :num_paciente, :nascimento, :login, :senha)',
      {
        replacements: {
          acao_paciente: 'selectCarteiraDados',
          num_paciente: numero_paciente,
          nascimento: data_nascimento,
          login: login_paciente,
          senha: senha_paciente,
        },
      }
    );

    bodyData = { ...bodyData, carteiraDados };

    if (req.params.user_id == bodyData.user_id) {
      return res.render('pages/dash_paciente', { data: bodyData });
    } else {
      return res.redirect('/');
    }
  },
};
