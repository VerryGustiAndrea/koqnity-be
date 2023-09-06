const addPayHistory = (makePayHistory: Function, sellDB: any) => {
    return async function post(info: any) {
        let data = await makePayHistory(info); // entity

        data = {
            history_id: data.getHistoryId(),
            sell_id: data.getSellId(),
            amount: data.getAmount(),
            date_payment: data.getDatePayment(),
            ordinal_number: 0,
            created_at: new Date(),
            update_at: new Date()
        };

        const ordinalNumber = await sellDB.getOrdinalNumberPayHistory(data.sell_id);

        if (ordinalNumber.data) {
            data.ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
        } else {
            data.ordinal_number = 1;
        }

        const sellData = await sellDB.selectSell(data.sell_id);
        let status = 'Lunas';
        let totalPayment: number = 0;
        if (sellData.data) {
            totalPayment = parseInt(sellData.data.amount_pay) + parseInt(data.amount);
            if (totalPayment < parseInt(sellData.data.total)) {
                status = 'Dibayar Sebagian';
            } else {
                status = 'Lunas';
            }
            console.log(status);
        } else {
            throw new Error('Sell Not Found');
        }

        const insertPayHistory = await sellDB.addPayHistory(data);
        const updateAmountPay = await sellDB.updateAmountPay({ amount_pay: totalPayment, status: status, sell_id: data.sell_id });
        console.log(insertPayHistory);
        if (updateAmountPay) {
            return { sell_id: data.history_id };
        } else {
            throw new Error(updateAmountPay.errorMessage);
        }
    };
};

export default addPayHistory;
