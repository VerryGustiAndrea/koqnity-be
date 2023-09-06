import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const customerDB = query(conn, models);
// ######
export default customerDB;
