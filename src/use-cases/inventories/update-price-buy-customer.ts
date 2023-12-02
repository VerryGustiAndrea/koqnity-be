const updatePriceBuyCustomer = (variationDB: any) => {
    return async function updatePriceBuyCustomer(info: any) {
        const res = await variationDB.updatePriceBuyCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};
export default updatePriceBuyCustomer;
