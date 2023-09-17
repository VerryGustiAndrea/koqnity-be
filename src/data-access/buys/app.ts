import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const buyDB = query(conn, models);
// ######
export default buyDB;
