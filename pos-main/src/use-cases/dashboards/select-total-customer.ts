const selectTotalCustomer = (dashboardDB: any) => {
    return async function selectTotalCustomer(info: any) {
        let data = [];
        const res = await dashboardDB.totalCustomer(info);
        if (res.status) {
            const items: { totalCustomerLast: number; totalCustomer: number } = res.data;
            let percentation = 100;
            let percentationType = 'netral';
            if (info.type != 'by_date') {
                if (items.totalCustomerLast > items.totalCustomer) {
                    if (items.totalCustomer > 0) {
                        percentation = (items.totalCustomerLast / items.totalCustomer) * 100;
                    }
                    percentationType = 'min';
                } else {
                    percentation = (items.totalCustomer / items.totalCustomerLast) * 100;
                    percentationType = 'plus';
                }
            }
            console.log(items.totalCustomerLast);
            return { data: { ...items, percentation: percentation, percentationType: percentationType } };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectTotalCustomer;
