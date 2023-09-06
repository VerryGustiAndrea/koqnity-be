const selectBuyProduct = (reportDB: any) => {
    return async function selectBuyProduct(info: any) {
        let data = [];
        const res = await reportDB.getBuyOfProduct(info);
        if (res.status) {
            const items = res.data;
            console.log(items);
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push(e);
            }
            return { data: data, count: res.count };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectBuyProduct;
