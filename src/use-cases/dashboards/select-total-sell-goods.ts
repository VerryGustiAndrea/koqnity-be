const selectTotalSellGoods = (dashboardDB: any) => {
    return async function selectTotalSellGoods(info: any) {
        let data = [];
        const res = await dashboardDB.totalSellGoods(info);
        if (res.status) {
            const items: { totalGoodsLast: number; totalGoods: number } = res.data;
            let percentation = 100;
            let percentationType = 'netral';
            console.log(items);
            if (info.type != 'by_date') {
                if (items.totalGoodsLast > items.totalGoods) {
                    if (items.totalGoods > 0) {
                        percentation = (items.totalGoodsLast / items.totalGoods) * 100;
                    }
                    percentationType = 'min';
                } else {
                    percentation = (items.totalGoods / items.totalGoodsLast) * 100;
                    percentationType = 'plus';
                }
            }
            return { data: { ...items, percentation: percentation, percentationType: percentationType } };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectTotalSellGoods;
