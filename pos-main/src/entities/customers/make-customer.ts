const makeCustomer = (encrypt: Function, generateCustomerId: Function) => {
    return function make(info: any) {
        const { contact_id, customer_name, customer_status, customer_npwp_number, customer_pic_name, customer_email, customer_phone_number, customer_country_code } = info; // deconstruct
        if (!customer_name) {
            throw new Error('Please enter company name.');
        }
        if (!customer_status) {
            throw new Error('Please enter customer status.');
        }
        if (!contact_id) {
            throw new Error('Please enter contact id.');
        }
        if (customer_status == 'PKP' && !customer_npwp_number) {
            throw new Error('Please enter NPWP.');
        }
        if (!customer_pic_name) {
            throw new Error('Please enter pic name.');
        }

        return Object.freeze({
            getCustomerName: () => customer_name,
            getContactId: () => contact_id,
            getCustomerStatus: () => customer_status,
            getCustomerNPWPNumber: () => customer_npwp_number,
            getCustomerPICName: () => customer_pic_name,
            getCustomerEmail: () => customer_email,
            getCustomerPhoneNumber: () => customer_country_code + customer_phone_number,
            getCustomerCountryCode: () => (customer_phone_number ? customer_country_code : ''),
            getCustomerId: () => generateCustomerId()
        });
    };
};

export default makeCustomer;
