const selectTotalSell = (dashboardDB: any) => {
    return async function selectTotalSell(info: any) {
        let data = [];
        const res = await dashboardDB.totalSell(info);
        if (res.status) {
            const items: { totalAmountLast: any; totalAmount: any } = res.data;
            let percentation = 100;
            let percentationType = 'netral';
            console.log(items);
            if (info.type != 'by_date') {
                if (parseInt(items.totalAmountLast) > parseInt(items.totalAmount)) {
                    if (items.totalAmount > 0) {
                        percentation = (items.totalAmountLast / items.totalAmount) * 100;
                    }
                    percentationType = 'min';
                } else {
                    percentation = ((items.totalAmount - items.totalAmountLast) / items.totalAmountLast) * 100;
                    percentationType = 'plus';
                }
            }
            return { data: { ...items, percentation: percentation, percentationType: percentationType } };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectTotalSell;
