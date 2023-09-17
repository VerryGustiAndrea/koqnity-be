const selectInventory = (inventoryDB: any) => {
    return async function selectInventory(info: any) {
        console.log(info);
        const res = await inventoryDB.selectInventory(info.inventory_id);
        if (res.status) {
            console.log(res.data);
            const items = res.data;
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectInventory;
