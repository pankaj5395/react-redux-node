var Sequelize = require('sequelize');
var config = require('../config')


var ConnectionPool = {
      max: 3,
      min: 1,
      idle: 10000,
      evict: 60000,
      handleDisconnects: true
}; 

var sequelizer = new Sequelize(config.DB, config.USER, config.PASSWORD, {
            host: config.HOST,
            dialectOptions: {
                  multipleStatements: true,
                  connectTimeout: 30000
            },
            dialect: "mysql",
            logging: function (str) {
                  if (config.query_log) {
                        console.log(str)
                  }
            },
            pool: ConnectionPool,
            define: {
                  paranoid: true
            },
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
      });
sequelizer.dialect.supports.schemas = true;
sequelizer.authenticate()
  .then(() => {
    console.log('connected to DB');
  });


const database = {
	Sequelize: Sequelize,
    sequelizer: sequelizer,
    //User: sequelizer.import('../models/user', require('../models/user')),
}
database.User = require("../models/user")(sequelizer, Sequelize);

module.exports = database;