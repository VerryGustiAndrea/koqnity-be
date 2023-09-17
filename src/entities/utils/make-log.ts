const makeLog = (encrypt: Function, generateLog: Function) => {
    return function make(info: any) {
        const { type_activity, user_id, data, status } = info; // deconstruct
        if (!type_activity) {
            throw new Error('Please enter type_activity.');
        }
        if (!user_id) {
            throw new Error('Please enter user_id.');
        }
        if (!data) {
            throw new Error('Please enter data.');
        }
        if (!status) {
            throw new Error('Please enter status.');
        }

        return Object.freeze({
            getActivityID: () => generateLog(),
            getTypeActivity: () => type_activity,
            getUserID: () => user_id,
            getData: () => data,
            getStatus: () => status
        });
    };
};

export default makeLog;
