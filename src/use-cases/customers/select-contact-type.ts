const selectContactType = (customerDB: any) => {
    return async function selectContactType(info: any) {
        const res = await customerDB.getContactType();
        let data = [];
        console.log(res);
        if (res.status) {
            const items = res.data;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push(e);
            }
            return { data: data };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectContactType;
