import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const sellDB = query(conn, models);
// ######
export default sellDB;
