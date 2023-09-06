const selectCustomer = (customerDB: any) => {
    return async function selectCustomer(info: any) {
        const res = await customerDB.selectCustomer(info.customer_id);
        if (res.status) {
            const items = res.data;
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectCustomer;
