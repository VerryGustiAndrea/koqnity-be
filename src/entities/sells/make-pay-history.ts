const makePayHistory = (encrypt: Function, generatePayHistoryID: Function) => {
    return function make(info: any) {
        const { sell_id, amount, date_payment, date_invoice, end_pay_date, send_date } = info; // deconstruct
        if (!sell_id) {
            throw new Error('Please enter sell id.');
        }
        if (!amount) {
            throw new Error('Please enter amount');
        }
        if (!date_payment) {
            throw new Error('Please enter date payment.');
        }

        return Object.freeze({
            getSellId: () => sell_id,
            getAmount: () => amount,
            getDatePayment: () => date_payment,
            getHistoryId: () => generatePayHistoryID()
        });
    };
};

export default makePayHistory;
