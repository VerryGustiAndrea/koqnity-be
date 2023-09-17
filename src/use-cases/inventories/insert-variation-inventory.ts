const addVariationInventory = (makeVariationInventory: Function, inventoryDB: any) => {
    return async function post(info: Object) {
        let data = await makeVariationInventory(info); // entity

        data = {
            name: data.getVariationName(),
            description: data.getVariationDesc(),
            price: data.getVariationPrice(),
            variation_id: data.getVariationId(),
            inventory_id: data.getInventoryID()
        };
        const dataInventory = await inventoryDB.selectInventory(data.inventory_id);
        const ordinalNumber = await inventoryDB.getOrdinalNumberVariation(data.inventory_id);
        let ordinal_number = 0;
        let code = '';
        if (ordinalNumber.data) {
            ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
            code = dataInventory.data.code + `-${ordinal_number}`;
        } else {
            ordinal_number = 1;
            code = dataInventory.data.code + '-1';
        }
        const res = await inventoryDB.addVariationInventory({ ...data, code: code, ordinal_number: ordinal_number });
        if (res.status) {
            return { customer_id: data.customer_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addVariationInventory;
