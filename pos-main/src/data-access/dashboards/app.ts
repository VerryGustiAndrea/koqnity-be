import conn from '../app';
import models from '../sequelize/models/index';
// ######
import query from './query';
// ######
const dashboardDB = query(conn, models);
// ######
export default dashboardDB;
