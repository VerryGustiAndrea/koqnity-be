const insertPriceBuyCustomer = (makeType: Function, inventoryDB: any) => {
    return async function post(info: any) {
        let data = await makeType(info); // entity
        data = {
            inventory_id: data.getInventoryId(),
            customer_id: data.getCustomerId(),
            price: data.getPrice(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await inventoryDB.addPriceBuyCustomer(data);
        if (res.status) {
            return { inventory_id: data.inventory_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};
export default insertPriceBuyCustomer;
