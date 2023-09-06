const selectTopCustomer = (dashboardDB: any) => {
    return async function selectTopCustomer(info: any) {
        let data = [];
        const res = await dashboardDB.topCustomer(info);
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

export default selectTopCustomer;
