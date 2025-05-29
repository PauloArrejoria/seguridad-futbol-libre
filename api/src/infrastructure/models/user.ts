import { DataTypes } from 'sequelize';
import { sequelize } from '@infrastructure/sql';

const USERS_TABLE_NAME = 'Users';
const USERS_ID_KEY = 'id';

export {
    USERS_TABLE_NAME,
    USERS_ID_KEY
};

export const UserModel = sequelize.define(USERS_TABLE_NAME, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumme: {
        type: DataTypes.TEXT,
        allowNull: false
    },    
});