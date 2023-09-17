const deletePriceSellCustomer = (inventoryDB: any) => {
    return async function deletePriceSellCustomer(info: any) {
        const res = await inventoryDB.deletePriceSellCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default deletePriceSellCustomer;
