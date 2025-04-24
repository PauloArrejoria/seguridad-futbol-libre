import { Dialect, Sequelize } from 'sequelize';

let dialtect: Dialect;

switch(process.env.SQL_DB_DIALECT) {
    case('mssql'):
        dialtect = 'mssql'
    break;
    default:
        dialtect = 'mysql'
    break;
}

export const sequelize = new Sequelize(
    process.env.SQL_DB_NAME,
    process.env.SQL_DB_USER,
    process.env.SQL_DB_PASSWORD,
    {
        host: process.env.SQL_DB_HOST,
        dialect: dialtect,
        dialectOptions: {
            encrypt: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        port: process.env.SQL_DB_PORT,
    }
);

export const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('DB Connection successful');
    } catch (err) {
        console.log('Unable to connect to database', err);
    }
};