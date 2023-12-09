const addWarehouse = (makeWarehouse: Function, warehouseDb: any) => {
    return async function post(info: Object) {
        let data = await makeWarehouse(info); // entity

        data = {
            warehouse_id: data.getWarehouseId(),
            warehouse_name: data.getWarehouseName(),
            address: data.getAddress(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await warehouseDb.addWarehouse(data);
        if (res.status) {
            return { warehouse_id: data.warehouse_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addWarehouse;
