require('dotenv').config();

module.exports = {
    development: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: 'mysql',
        logging: false
    },
    test: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_TEST,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: 'mysql',
        logging: false
    },
    production: {
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT,
        host: process.env.HOST,
        dialect: 'mysql'
    }
};
