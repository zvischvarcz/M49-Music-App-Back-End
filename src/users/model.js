const {DataTypes} = require("sequelize")

const connection = require("../db/connection")

const User = connection.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favoriteAlbums: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    favoriteArtists: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
    
},
    {indexes: [{unique: true, fields: ["username", "email"]}]}

)

module.exports = User