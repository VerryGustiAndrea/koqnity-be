const deletePriceBuyCustomer = (inventoryDB: any) => {
    return async function deletePriceBuyCustomer(info: any) {
        const res = await inventoryDB.deletePriceBuyCustomer(info);
        if (res.status) {
            return res.data;
        }
        else {
            throw new Error(res.errorMessage);
        }
    };
};
export default deletePriceBuyCustomer;
