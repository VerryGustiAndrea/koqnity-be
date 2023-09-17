const makeInventory = (encrypt: Function, generateInventoryID: Function) => {
    return function make(info: any) {
        const { name, merk_id, category_id, capital_price, price } = info; // deconstruct
        if (!name) {
            throw new Error('Please enter name.');
        }
        if (!category_id) {
            throw new Error('Please enter category.');
        }
        if (!capital_price) {
            throw new Error('Please enter category.');
        }
        if (!price) {
            throw new Error('Please enter category.');
        }
        if (!merk_id) {
            throw new Error('Please enter merk.');
        }

        return Object.freeze({
            getInventoryName: () => name,
            getCategoryID: () => category_id,
            getMerkID: () => merk_id,
            getCapicalPrice: () => capital_price,
            getPrice: () => price,
            getInventoryId: () => generateInventoryID()
        });
    };
};

export default makeInventory;
