import customerUC from '../../use-cases/customers/app';
import _ from '../../functions/app';
import customerAdd from './insert-customer';
import utilUC from '../../use-cases/utils/app';
import selectCustomer from './select-customer';
import customerUpdate from './update-customer';
import selectListCustomer from './select-list-customer';
import selectContactType from './select-contact-type';
import selectOwner from './select-owner';
// #####
const customerAdds = customerAdd(customerUC.addCustomers, utilUC.insertLogs);
const selectCustomers = selectCustomer(customerUC.selectCustomers, utilUC.insertLogs);
const selectOwners = selectOwner(customerUC.selectOwners, utilUC.insertLogs);
const customerUpdates = customerUpdate(customerUC.updateCustomers, utilUC.insertLogs);
const selectListCustomers = selectListCustomer(customerUC.selectListCustomers);
const selectContactTypes = selectContactType(customerUC.selectContactTypes);
// #####
const customerController = {
    customerAdds,
    selectCustomers,
    customerUpdates,
    selectListCustomers,
    selectContactTypes,
    selectOwners
};

export default customerController;
