const updateCustomer = (customerDB: any) => {
    return async function updateCustomer(info: any) {
        const res = await customerDB.updateCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateCustomer;
