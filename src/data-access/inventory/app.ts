import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const inventoryDB = query(conn, models);
// ######
export default inventoryDB;
