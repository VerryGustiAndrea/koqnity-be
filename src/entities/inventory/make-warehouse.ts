const makeWarehouse = (encrypt: Function, generateWarehouseID: Function) => {
    return function make(info: any) {
        const { warehouse_name, address } = info; // deconstruct

        if (!warehouse_name) {
            throw new Error('Please enter warehouse name.');
        }
        if (!address) {
            throw new Error('Please enter address.');
        }

        return Object.freeze({
            getWarehouseName: () => warehouse_name,
            getAddress: () => address,
            getWarehouseId: () => generateWarehouseID()
        });
    };
};

export default makeWarehouse;
