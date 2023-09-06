const getCountStatus = (sellDB: any) => {
    return async function getCountStatus(info: any) {
        const res = await sellDB.getCountStatus();
        console.log(info);
        if (res.status) {
            const items = res.data[0];
            return items;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default getCountStatus;
