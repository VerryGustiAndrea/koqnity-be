const makeUser = (encrypt: Function, generateUserId: Function) => {
    return function make(info: any) {
        const { username, full_name, password, role } = info; // deconstruct
        if (!username) {
            throw new Error('Please enter username.');
        }
        if (!full_name) {
            throw new Error('Please enter full name.');
        }
        if (!password) {
            throw new Error('Please enter password.');
        }
        if (password.length < 8) {
            throw new Error('Min length password 8 Character.');
        }
        if (!role) {
            throw new Error('Please enter role user.');
        }

        return Object.freeze({
            getUsername: () => username.toLowerCase(),
            getFullname: () =>
                full_name.replace(/\w+/g, function (w: any) {
                    return w[0].toUpperCase() + w.slice(1).toLowerCase();
                }),
            getRole: () => role,
            getPassword: () => encrypt(password),
            getUserId: () => generateUserId()
        });
    };
};

export default makeUser;
