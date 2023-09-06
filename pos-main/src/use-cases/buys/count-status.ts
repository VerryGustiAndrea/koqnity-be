const getCountStatus = (buyDB: any) => {
    return async function getCountStatus(info: any) {
        const res = await buyDB.getCountStatus();
        if (res.status) {
            const items = res.data[0];
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default getCountStatus;
