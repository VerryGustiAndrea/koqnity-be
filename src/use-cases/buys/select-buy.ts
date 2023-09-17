const selectBuy = (buyDB: any) => {
    return async function selectBuy(info: any) {
        const res = await buyDB.selectBuy(info.buy_id);
        if (res.status) {
            const items = res.data;
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectBuy;
