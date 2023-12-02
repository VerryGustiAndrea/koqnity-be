'use strict';
const deleteInventoryNameCustomer = (inventoryDB: any) => {
    return async function deleteInventoryNameCustomer(info: any) {
        const res = await inventoryDB.deleteInventoryNameCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};
export default deleteInventoryNameCustomer;
