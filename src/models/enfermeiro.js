const { Model, DataTypes } = require('sequelize');

class Enfermeiro extends Model {
  static init(sequelize) {
    super.init(
      {
        id_enfermeiro: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        coren_enfermeiro: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nome_enfermeiro: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        senha_enfermeiro: {
          type: DataTypes.STRING(45),
          allowNull: false,
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
      },
      {
        sequelize,
        tableName: 'enfermeiro',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [
              { name: 'id_enfermeiro' },
              { name: 'coren_enfermeiro' },
              { name: 'numero_cnes' },
            ],
          },
          {
            name: 'id_medico_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_enfermeiro' }],
          },
          {
            name: 'coren_enfermeiro_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'coren_enfermeiro' }],
          },
          {
            name: 'fk_enfermeiro_cnes1_idx',
            using: 'BTREE',
            fields: [{ name: 'numero_cnes' }],
          },
        ],
      }
    );
  }
}

module.exports = Enfermeiro;
