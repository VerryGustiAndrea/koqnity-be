const selectTotalTransaction = (dashboardDB: any) => {
    return async function selectTotalTransaction(info: any) {
        let data = [];
        const res = await dashboardDB.totalTransaction(info);
        if (res.status) {
            const items = res.data;
            let percentation = 100;
            let percentationType = 'netral';
            if (info.type != 'by_date') {
                if (items.totalTransactionLast > items.totalTransaction) {
                    if (items.totalTransaction > 0) {
                        percentation = (items.totalTransactionLast / items.totalTransaction) * 100;
                    }
                    percentationType = 'min';
                } else {
                    percentation = (items.totalTransaction / items.totalTransactionLast) * 100;
                    percentationType = 'plus';
                }
            }
            return { data: { ...items, percentation: percentation, percentationType: percentationType } };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectTotalTransaction;
