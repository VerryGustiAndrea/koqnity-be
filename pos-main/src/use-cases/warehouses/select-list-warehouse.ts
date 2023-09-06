const selectListWarehouse = (warehouseDB: any) => {
    return async function selectListWarehouse(info: any) {
        let data = [];
        const res = await warehouseDB.getListWarehouse(info);
        if (res.status) {
            const items = res.data;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push(e);
            }
            return { data: data, count: res.count, totalPage: Math.ceil(res.count / info.length) };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectListWarehouse;
