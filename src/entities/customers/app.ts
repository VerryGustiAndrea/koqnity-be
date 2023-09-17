import _ from '../../functions/app'; // functions

// ####
import makeCustomer from './make-customer';
// ####
const makeCustomers = makeCustomer(_.enc, _.gCustomer);
// ####

const entity = {
    makeCustomers
};

export default entity;
