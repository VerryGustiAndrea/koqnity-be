const jwt = require('jsonwebtoken');
const password = process.env.ENCRYPTION_KEY;

import userDb from '../data-access/users/app';
// ####
import myAuth from './basic-auth';
import onlyAdmin from './only-admin';
// ####
const validateAuth = myAuth(jwt, password, userDb);
const validateAdmin = onlyAdmin(jwt, password, userDb);
// ####

const middleware = {
    validateAuth,
    validateAdmin
};
export default middleware;
