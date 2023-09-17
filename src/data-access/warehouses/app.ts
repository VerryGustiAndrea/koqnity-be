import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const warehouseDB = query(conn, models);
// ######
export default warehouseDB;
