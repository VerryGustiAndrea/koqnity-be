const updateVariation = (variationDB: any) => {
    return async function updateVariation(info: any) {
        const res = await variationDB.updateVariation(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateVariation;
