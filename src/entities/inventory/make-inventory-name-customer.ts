'use strict';
const makeInventoryNameCustomer = () => {
    return function make(info: any) {
        const { inventory_id, customer_id, inventory_name } = info; // deconstruct
        if (!inventory_id) {
            throw new Error('Please enter inventory id.');
        }
        if (!customer_id) {
            throw new Error('Please enter customer id.');
        }
        if (!inventory_name) {
            throw new Error('Please enter inventory name.');
        }
        return Object.freeze({
            getInventoryId: () => inventory_id,
            getCustomerId: () => customer_id,
            getInventoryName: () => inventory_name
        });
    };
};
export default makeInventoryNameCustomer;
