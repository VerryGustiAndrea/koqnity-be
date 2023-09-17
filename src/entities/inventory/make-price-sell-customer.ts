const makePriceSellCustomer = (encrypt: Function, generateTypeId: Function) => {
    return function make(info: any) {
        const { inventory_id, customer_id, price } = info; // deconstruct
        if (!inventory_id) {
            throw new Error('Please enter inventory id.');
        }
        if (!customer_id) {
            throw new Error('Please enter customer id.');
        }
        if (!price) {
            throw new Error('Please enter price.');
        }

        return Object.freeze({
            getInventoryId: () => inventory_id,
            getCustomerId: () => customer_id,
            getPrice: () => price
        });
    };
};

export default makePriceSellCustomer;
