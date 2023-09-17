require('dotenv').config();

const connect = (dotenv: any, mysql: any) => {
    return async function conn() {
        let config = null;
        const env = process.env.NODE_ENV;
        if (env == `development` || env == `production`) {
            config = {
                user: process.env.USER,
                database: process.env.DATABASE,
                password: process.env.PASSWORD,
                port: process.env.PORT,
                host: process.env.HOST
            };
        }

        if (env == `test`) {
            config = {
                user: process.env.USER,
                database: process.env.DATABASE_TEST,
                password: process.env.PASSWORD,
                port: process.env.PORT,
                host: process.env.HOST
            };
        }

        const pool = new mysql.createPool(config);

        return pool;
    };
};

export default connect;
