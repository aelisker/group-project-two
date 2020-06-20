const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NoteTag extends Model {}

NoteTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    note_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'note',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'note_tag'
  }
);

module.exports = NoteTag;