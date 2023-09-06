const selectStockWarehouse = (InventoryDB: any) => {
    return async function selectStockWarehouse(info: any) {
        let data = [];
        const res = await InventoryDB.selectStockWarehouse(info.inventory_id);
        if (res.status) {
            const items = res.data;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push(e);
            }
            return { data: data };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectStockWarehouse;
