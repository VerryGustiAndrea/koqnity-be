const makeVariation = (encrypt: Function, generateVariationID: Function) => {
    return function make(info: any) {
        const { inventory_id, name, description, price } = info; // deconstruct

        if (!name) {
            throw new Error('Please enter name.');
        }
        if (!description) {
            throw new Error('Please enter description.');
        }
        if (!price) {
            throw new Error('Please enter price.');
        }

        return Object.freeze({
            getVariationName: () => name,
            getVariationDesc: () => description,
            getVariationPrice: () => price,
            getInventoryID: () => inventory_id,
            getVariationId: () => generateVariationID()
        });
    };
};

export default makeVariation;
