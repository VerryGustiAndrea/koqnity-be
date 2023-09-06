const selectListVariation = (variationDB: any) => {
    return async function selectListVariation(info: any) {
        let data = [];

        const res = await variationDB.getListVariation(info);
        if (res.status) {
            const items = res.data;
            console.log(items);
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

export default selectListVariation;
