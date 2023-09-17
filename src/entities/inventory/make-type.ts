const makeType = (encrypt: Function, generateTypeId: Function) => {
    return function make(info: any) {
        const { name, type, code } = info; // deconstruct
        if (!name) {
            throw new Error('Please enter name.');
        }
        if (!type) {
            throw new Error('Please enter type.');
        }
        if (!code) {
            throw new Error('Please enter code.');
        }

        return Object.freeze({
            getTypeName: () => name,
            getType: () => type,
            getCode: () => code.toUpperCase(),
            getTypeId: () => generateTypeId()
        });
    };
};

export default makeType;
