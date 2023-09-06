import entity from '../../entities/utils/app';
import userDb from '../../data-access/users/app';
import _ from '../../functions/app';
import insertLog from './insert-log';
import utilDB from '../../data-access/utils/app';

const insertLogs = insertLog(entity.makeLogs, userDb, utilDB);

// user use case
const utilUC = {
    insertLogs
};

export default utilUC;
