const selectWarehouse = (warehouseDB: any) => {
    return async function selectWarehouse(info: any) {
        let data = [];
        const res = await warehouseDB.selectWarehouse(info);
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

export default selectWarehouse;
