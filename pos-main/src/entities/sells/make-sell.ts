const makeSell = (encrypt: Function, generateSellID: Function) => {
    return function make(info: any) {
        const { customer_id, pay_type, warehouse_id, date_invoice, end_pay_date, send_date } = info; // deconstruct
        if (!customer_id) {
            throw new Error('Please enter customer.');
        }
        if (!pay_type) {
            throw new Error('Please enter termin.');
        }
        if (!end_pay_date) {
            throw new Error('Please enter Tanggal Jatuh Tompo.');
        }
        if (!warehouse_id) {
            throw new Error('Please enter Gudang.');
        }
        if (!send_date) {
            throw new Error('Please enter Tanggal Pengiriman.');
        }
        if (!date_invoice) {
            throw new Error('Please enter date.');
        }

        return Object.freeze({
            getCustomerID: () => customer_id,
            getPayType: () => pay_type,
            getEndPayType: () => end_pay_date,
            getWarehouse: () => warehouse_id,
            getSendDate: () => send_date,
            getDateInvoice: () => date_invoice,
            getSellID: () => generateSellID()
        });
    };
};

export default makeSell;
