const selectSellOutstandingCustomer = (reportDB: any) => {
    return async function selectSellOutstandingCustomer(info: any) {
        let data = [];
        const res = await reportDB.getSellOutstandingOfCustomer(info);
        console.log(res);
        if (res.status) {
            const items = res.data;
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

export default selectSellOutstandingCustomer;
