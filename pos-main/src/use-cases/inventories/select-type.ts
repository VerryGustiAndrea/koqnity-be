const selectType = (typeInventoryDB: any) => {
    return async function selectType(info: any) {
        let data = [];
        let res = null;
        if (info.page == 'all') {
            res = await typeInventoryDB.getAllType(info);
        } else {
            res = await typeInventoryDB.selectType(info);
        }
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

export default selectType;
