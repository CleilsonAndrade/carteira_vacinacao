const { Model, DataTypes } = require('sequelize');

class carteira extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_paciente: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'paciente',
            key: 'numero_paciente',
          },
        },
        coren_enfermeiro: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'enfermeiro',
            key: 'coren_enfermeiro',
          },
        },
        numero_cnes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'cnes',
            key: 'numero_cnes',
          },
        },
        id_vacina: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'vacina',
            key: 'id_vacina',
          },
        },
        data_aplicacao: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'carteira',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [
              { name: 'numero_paciente' },
              { name: 'coren_enfermeiro' },
              { name: 'numero_cnes' },
              { name: 'id_vacina' },
            ],
          },
          {
            name: 'fk_paciente_has_medico_paciente1_idx',
            using: 'BTREE',
            fields: [{ name: 'numero_paciente' }],
          },
          {
            name: 'fk_carteira_medico1_idx',
            using: 'BTREE',
            fields: [{ name: 'coren_enfermeiro' }],
          },
          {
            name: 'fk_carteira_cnes1_idx',
            using: 'BTREE',
            fields: [{ name: 'numero_cnes' }],
          },
          {
            name: 'fk_carteira_vacina1_idx',
            using: 'BTREE',
            fields: [{ name: 'id_vacina' }],
          },
        ],
      }
    );
  }
}

module.exports = carteira;
