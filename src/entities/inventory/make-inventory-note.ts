'use strict';
const makeInventoryNote = () => {
    return function make(info: any) {
        const { inventory_id, note } = info; // deconstruct
        if (!inventory_id) {
            throw new Error('Please enter inventory id.');
        }
        if (!note) {
            throw new Error('Please enter inventory name.');
        }
        return Object.freeze({
            getInventoryId: () => inventory_id,
            getNote: () => note
        });
    };
};
export default makeInventoryNote;
