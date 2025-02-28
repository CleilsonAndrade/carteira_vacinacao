const { Model, DataTypes } = require('sequelize');

class Vacina extends Model {
  static init(sequelize) {
    super.init(
      {
        id_vacina: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        lote_vacina: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        nome_vacina: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        descricao_vacina: {
          type: DataTypes.STRING(400),
          allowNull: false,
        },
        faixa_etaria: {
          type: DataTypes.ENUM(
            'crianca',
            'adolecente',
            'idoso',
            'adulto',
            'todos'
          ),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'vacina',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_vacina' }, { name: 'lote_vacina' }],
          },
        ],
      }
    );
  }
}

module.exports = Vacina;
