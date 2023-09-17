const makePayHistory = (encrypt: Function, generatePayHistoryID: Function) => {
    return function make(info: any) {
        const { buy_id, amount, date_payment } = info; // deconstruct
        if (!buy_id) {
            throw new Error('Please enter buy id.');
        }
        if (!amount) {
            throw new Error('Please enter amount');
        }
        if (!date_payment) {
            throw new Error('Please enter date payment.');
        }

        return Object.freeze({
            getBuyId: () => buy_id,
            getAmount: () => amount,
            getDatePayment: () => date_payment,
            getHistoryId: () => generatePayHistoryID()
        });
    };
};

export default makePayHistory;
