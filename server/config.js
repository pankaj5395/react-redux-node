module.exports = {
  secret: '23432432425',
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "mern_prj",
  dialect: "mysql",
  query_log: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  port: 3000,
  rpcPort:4000
};