const addCustomer = (makeCustomer: Function, customerDB: any) => {
    return async function post(info: Object) {
        let data = await makeCustomer(info); // entity

        data = {
            customer_id: data.getCustomerId(),
            customer_name: data.getCustomerName(),
            contact_id: data.getContactId(),
            customer_status: data.getCustomerStatus(),
            customer_npwp_number: data.getCustomerNPWPNumber(),
            customer_pic_name: data.getCustomerPICName(),
            customer_email: data.getCustomerEmail(),
            customer_address: data.getCustomerAddress(),
            customer_phone_number: data.getCustomerPhoneNumber(),
            customer_country_code: data.getCustomerCountryCode(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await customerDB.addCustomer(data);
        if (res.status) {
            return { customer_id: data.customer_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addCustomer;
