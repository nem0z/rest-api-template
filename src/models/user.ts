import { DataTypes } from 'sequelize';
import { DB } from '../db';

const User = DB.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
});

export default User;