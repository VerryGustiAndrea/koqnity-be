const updateInventory = (inventoryDB: any) => {
    return async function updateInventory(info: any) {
        let data = {
            name: info.name,
            inventory_id: info.inventory_id,
            category_id: info.category_id,
            merk_id: info.merk_id,
            code: '',
            ordinal_number: 0
        };
        const dataInventory = await inventoryDB.selectInventory(info.inventory_id);
        const merk_data = await inventoryDB.getType(info.merk_id);
        const category_data = await inventoryDB.getType(info.category_id);
        let code = category_data.data.code + '-' + merk_data.data.code + '-';
        let change = 0;
        if (code != dataInventory.data.code.slice(0, 8)) {
            change = 1;
            let ordinal_number = 0;
            const ordinalNumber = await inventoryDB.getOrdinalNumber(info);
            if (ordinalNumber.data) {
                ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
                code += `${ordinal_number}`;
            } else {
                ordinal_number = 1;
                code += '1';
            }
            data.code = code;
            data.ordinal_number = ordinal_number;
        } else {
            data.code = dataInventory.data.code;
            data.ordinal_number = dataInventory.data.ordinal_number;
        }
        const res = await inventoryDB.updateInventory(data);
        let resVariation = { status: true };
        if (change === 1) {
            resVariation = await inventoryDB.updateAllVariationInventory(data);
        }

        if (res.status && resVariation.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateInventory;
