const Sequelize = require('sequelize');
var config = require('../config');
var SchemaName = config.connect_db_name;

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'role_name'
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
      get() {
            if (this.getDataValue('is_deleted') == undefined) {
                  return;
            }
            return this.getDataValue('is_deleted') ? true : false;
      } 
    },
    createdAt: { type: DataTypes.DATEONLY, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATEONLY, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    deletedAt: { type: DataTypes.DATEONLY, allowNull: true },
  });
  return Role;
}