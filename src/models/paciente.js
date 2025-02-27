const { Model, DataTypes } = require('sequelize');

class Paciente extends Model {
  static init(sequelize) {
    super.init({
      id_paciente: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      numero_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nome_paciente: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      faixa_etaria: {
        type: DataTypes.ENUM('crianca', 'adolescente', 'adulto', 'idoso'),
        allowNull: false
      },
      sexo: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false
      },
      login_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'nome_usuario_UNIQUE'
      },
      senha_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'paciente',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id_paciente' },
            { name: 'numero_paciente' },
          ]
        },
        {
          name: 'id_usuario_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'numero_paciente' },
          ]
        },
        {
          name: 'nome_usuario_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'login_paciente' },
          ]
        },
        {
          name: 'id_paciente_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id_paciente' },
          ]
        },
      ]
    });
  }
}

module.exports = Paciente;