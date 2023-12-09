const selectOwner = (customerDB: any) => {
    return async function selectOwner(info: any) {
        const res = await customerDB.selectOwner(info.customer_id);
        if (res.status) {
            const items = res.data;
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectOwner;
