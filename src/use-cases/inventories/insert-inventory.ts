const addInventory = (makeInventory: Function, makeVariations: Function, inventoryDB: any) => {
    return async function post(info: any) {
        let data = await makeInventory(info); // entity

        data = {
            name: data.getInventoryName(),
            category_id: data.getCategoryID(),
            merk_id: data.getMerkID(),
            inventory_id: data.getInventoryId(),
            capital_price: data.getCapicalPrice(),
            price: data.getPrice(),
            code: '',
            ordinal_number: 0,
            created_at: new Date(),
            update_at: new Date()
        };
        const ordinalNumber = await inventoryDB.getOrdinalNumber(data);
        const merk_data = await inventoryDB.getType(data.merk_id);
        const category_data = await inventoryDB.getType(data.category_id);
        data.code = category_data.data.code + '-' + merk_data.data.code + '-';
        let ordinal_number = 0;
        if (ordinalNumber.data) {
            ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
            data.code = data.code + String(ordinal_number).padStart(4, '0');
        } else {
            ordinal_number = 1;
            data.code = data.code + String(1).padStart(4, '0');
        }
        data.ordinal_number = ordinal_number;
        const res = await inventoryDB.addInventory(data);
        // for (let i = 0; i < info.variation.length; i++) {
        //     let dataVariation = await makeVariations(info.variation[i]); // entity
        //     const ordinalNumber = await inventoryDB.getOrdinalNumberVariation(data.inventory_id);
        //     let ordinal_number = 0;
        //     let code = '';
        //     if (ordinalNumber.data) {
        //         ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
        //         code = data.code + `-${ordinal_number}`;
        //     } else {
        //         ordinal_number = 1;
        //         code = data.code + '-1';
        //     }
        //     // let dataVariationRes = await inventoryDB.addVariationInventory({
        //     //     name: dataVariation.getVariationName(),
        //     //     description: dataVariation.getVariationDesc(),
        //     //     price: dataVariation.getVariationPrice(),
        //     //     variation_id: dataVariation.getVariationId(),
        //     //     inventory_id: data.inventory_id,
        //     //     code: code,
        //     //     ordinal_number: ordinal_number
        //     // });
        // }
        if (res.status) {
            return { inventory_id: data.inventory_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addInventory;
