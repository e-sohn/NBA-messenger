const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: "NBA_messenger_db",
    dialect: "postgres",
    operatorsAliases: false,
    define: {
        underscored: true
    }
});

const User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password_digest: {
    type: Sequelize.STRING,
    allowNull: false
    }
});

module.exports = {
    sequelize,
    User
};
