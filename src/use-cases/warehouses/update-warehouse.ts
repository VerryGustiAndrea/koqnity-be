const updateWarehouse = (customerDB: any) => {
    return async function updateWarehouse(info: any) {
        const res = await customerDB.updateWarehouse(info);
        console.log(info, "info");

        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateWarehouse;
