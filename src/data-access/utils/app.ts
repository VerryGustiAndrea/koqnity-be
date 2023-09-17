import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const utilDB = query(conn, models);
// ######
export default utilDB;
