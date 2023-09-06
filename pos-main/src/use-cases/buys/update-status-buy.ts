const updateStatusBuy = (sellDB: any) => {
    return async function updateStatusBuy(info: any) {
        const res = await sellDB.updateStatus(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateStatusBuy;
