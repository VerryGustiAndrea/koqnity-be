import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const reportDB = query(conn, models);
// ######
export default reportDB;
