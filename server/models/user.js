const Sequelize = require('sequelize');
var config = require('../config');
var SchemaName = config.connect_db_name;
import bcrypt from 'bcrypt-nodejs';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    firstName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'first_name'
    },
    lastName: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'last_name'
    },
    email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'email'
    },
    password: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'password'
    },
    status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'status'
    },
    role: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'role'
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

  User.beforeCreate( async (user, options) => {
    const SALT_FACTOR = 5;
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.comparePassword = async (candidatePassword, hash) =>{
    return await bcrypt.compareSync(candidatePassword, hash);
  };
  return User;
}