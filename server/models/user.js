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

  return User;
}




/*// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};
*/
//module.exports = mongoose.model('User', UserSchema);
