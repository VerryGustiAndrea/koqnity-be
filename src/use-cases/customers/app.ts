import entity from '../../entities/customers/app';
import customerDB from '../../data-access/customers/app';
import _ from '../../functions/app';
import addCustomer from './insert-customer';
import selectCustomer from './select-customer';
import updateCustomer from './update-customer';
import selectListCustomer from './select-list-customer';
import selectContactType from './select-contact-type';

const addCustomers = addCustomer(entity.makeCustomers, customerDB);
const selectCustomers = selectCustomer(customerDB);
const updateCustomers = updateCustomer(customerDB);
const selectListCustomers = selectListCustomer(customerDB);
const selectContactTypes = selectContactType(customerDB);

// user use case
const cutomerUC = {
    addCustomers,
    selectCustomers,
    updateCustomers,
    selectListCustomers,
    selectContactTypes
};

export default cutomerUC;
