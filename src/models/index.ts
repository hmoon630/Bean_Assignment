import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';

const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json')).assignment;

export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

sequelize.addModels([User]);

export {
    User,
};
