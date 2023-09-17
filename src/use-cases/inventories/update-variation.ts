const deletePriceSellCustomer = (variationDB: any) => {
    return async function deletePriceSellCustomer(info: any) {
        const res = await variationDB.deletePriceSellCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default deletePriceSellCustomer;
