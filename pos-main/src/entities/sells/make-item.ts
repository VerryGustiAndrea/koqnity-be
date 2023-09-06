const makeItem = (encrypt: Function, generateItemID: Function, generateHistoryID: Function) => {
    return function make(info: any) {
        const { inventory_id, qty, tax, tax_name } = info; // deconstruct
        if (!inventory_id) {
            throw new Error('Please enter product.');
        }
        if (!qty) {
            throw new Error('Please enter quantity.');
        }

        return Object.freeze({
            getInventoryID: () => inventory_id,
            getQTY: () => qty,
            getTax: () => tax,
            getTaxName: () => tax_name,
            gHistory: () => generateHistoryID(),
            getItemID: () => generateItemID()
        });
    };
};

export default makeItem;
