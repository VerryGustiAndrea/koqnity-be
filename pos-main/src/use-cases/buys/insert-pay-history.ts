const addPayHistory = (makePayHistory: Function, buyDB: any) => {
    return async function post(info: any) {
        let data = await makePayHistory(info); // entity

        data = {
            history_id: data.getHistoryId(),
            buy_id: data.getBuyId(),
            amount: data.getAmount(),
            date_payment: data.getDatePayment(),
            ordinal_number: 0,
            created_at: new Date(),
            update_at: new Date()
        };

        const ordinalNumber = await buyDB.getOrdinalNumberPayHistory(data.buy_id);

        if (ordinalNumber.data) {
            data.ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
        } else {
            data.ordinal_number = 1;
        }

        const buyData = await buyDB.selectBuy(data.buy_id);
        let status = 'Lunas';
        let totalPayment: number = 0;
        if (buyData.data) {
            totalPayment = parseInt(buyData.data.amount_pay) + parseInt(data.amount);
            if (totalPayment < parseInt(buyData.data.total)) {
                status = 'Dibayar Sebagian';
            } else {
                status = 'Lunas';
            }
            console.log(status);
        } else {
            throw new Error('Buy Not Found');
        }

        const insertPayHistory = await buyDB.addPayHistory(data);
        const updateAmountPay = await buyDB.updateAmountPay({ amount_pay: totalPayment, status: status, buy_id: data.buy_id });
        if (updateAmountPay) {
            return { buy_id: data.history_id };
        } else {
            throw new Error(updateAmountPay.errorMessage);
        }
    };
};

export default addPayHistory;
