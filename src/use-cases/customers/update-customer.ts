const updateCustomer = (customerDB: any) => {
    return async function updateCustomer(info: any) {
        info.customer_phone_number = info.customer_country_code + info.customer_phone_number;
        const res = await customerDB.updateCustomer(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateCustomer;
