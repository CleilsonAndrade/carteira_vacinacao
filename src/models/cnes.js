const { Model, DataTypes } = require('sequelize');

class Cnes extends Model {
  static init(sequelize) {
    super.init({
      id_cnes: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      numero_cnes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nome_cnes: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'cnes',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id_cnes' },
            { name: 'numero_cnes' },
          ]
        },
        {
          name: 'numero_cnes_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'numero_cnes' },
          ]
        },
        {
          name: 'id_cnes_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id_cnes' },
          ]
        },
      ]
    });
  }
}

module.exports = Cnes;