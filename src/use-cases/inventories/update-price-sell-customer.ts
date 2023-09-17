const updatePriceSellCustomer = (variationDB: any) => {
    return async function updatePriceSellCustomer(info: any) {
        const res = await variationDB.updatePriceSellCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updatePriceSellCustomer;
