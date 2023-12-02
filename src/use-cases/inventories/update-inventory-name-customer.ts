const updateInventoryNameCustomer = (variationDB: any) => {
    return async function updateInventoryNameCustomer(info: any) {
        const res = await variationDB.updateInventoryNameCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};
export default updateInventoryNameCustomer;
