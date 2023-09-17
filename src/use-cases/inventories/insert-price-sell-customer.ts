const insertPriceSellCustomer = (makeType: Function, inventoryDB: any) => {
    return async function post(info: Object) {
        let data = await makeType(info); // entity
        console.log(new Date());
        data = {
            inventory_id: data.getInventoryId(),
            customer_id: data.getCustomerId(),
            price: data.getPrice(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await inventoryDB.addPriceSellCustomer(data);
        if (res.status) {
            return { inventory_id: data.inventory_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default insertPriceSellCustomer;
