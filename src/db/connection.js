const { Sequelize } = require("sequelize")

const connection = new Sequelize(process.env.DB_CONNECTION_URI)

connection.authenticate()

console.log("DB is connected")

module.exports = connection