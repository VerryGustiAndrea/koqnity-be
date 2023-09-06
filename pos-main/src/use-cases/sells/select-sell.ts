const selectSell = (sellDB: any) => {
    return async function selectSell(info: any) {
        const res = await sellDB.selectSell(info.sell_id);
        if (res.status) {
            const items = res.data;
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectSell;
