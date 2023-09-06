const makeSell = (encrypt: Function, generateBuyID: Function) => {
    return function make(info: any) {
        const { vendor_id, invoice_number, pay_type, warehouse_id, date_invoice, end_pay_date, send_date } = info; // deconstruct
        if (!vendor_id) {
            throw new Error('Please enter customer.');
        }
        if (!invoice_number) {
            throw new Error('Please enter invoice number.');
        }
        if (!pay_type) {
            throw new Error('Please enter termin.');
        }
        if (!end_pay_date) {
            throw new Error('Please enter Tanggal Jatuh Tompo.');
        }

        if (!send_date) {
            throw new Error('Please enter Tanggal Pengiriman.');
        }
        if (!date_invoice) {
            throw new Error('Please enter date.');
        }

        return Object.freeze({
            getVendorId: () => vendor_id,
            getInvoiceNumber: () => invoice_number,
            getPayType: () => pay_type,
            getEndPayType: () => end_pay_date,
            getWarehouse: () => warehouse_id,
            getSendDate: () => send_date,
            getDateInvoice: () => date_invoice,
            getBuyID: () => generateBuyID()
        });
    };
};

export default makeSell;
