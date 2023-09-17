const addType = (makeType: Function, inventoryDB: any) => {
    return async function post(info: Object) {
        let data = await makeType(info); // entity

        data = {
            name: data.getTypeName(),
            type: data.getType(),
            type_id: data.getTypeId(),
            code: data.getCode(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await inventoryDB.addType(data);
        if (res.status) {
            return { customer_id: data.customer_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addType;
