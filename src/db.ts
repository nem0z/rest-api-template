import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB = new Sequelize(
    process.env.DB_NAME ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: "localhost",
        dialect: "postgres"
    }
);

function AuthDB(): Promise<Sequelize | null> {
    return DB.authenticate()
        .then(res => {
            console.log(`Auth to DB : ${res}`);
            return DB;
        })
        .catch(err => {
            console.error(`Unable to auth to DB ${err}`);
            return null;
        });
};

export { DB, AuthDB };