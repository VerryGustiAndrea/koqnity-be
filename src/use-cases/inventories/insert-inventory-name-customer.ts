
const insertInventoryNameCustomer = (makeType: Function, inventoryDB: any) => {
    return async function post(info: any) {
        let data = await makeType(info); // entity
        console.log(new Date());
        data = {
            inventory_id: data.getInventoryId(),
            customer_id: data.getCustomerId(),
            inventory_name: data.getInventoryName(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await inventoryDB.addInventoryNameCustomer(data);
        if (res.status) {
            return { inventory_id: data.inventory_id };
        }
        else {
            throw new Error(res.errorMessage);
        }
    };
};
export default insertInventoryNameCustomer;
