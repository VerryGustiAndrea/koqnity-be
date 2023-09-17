import _ from '../../functions/app'; // functions

// ####
import makeUser from './make-user';
// ####
const makeUsers = makeUser(_.enc, _.gUserId);
// ####

const entity = {
    makeUsers
};

export default entity;
