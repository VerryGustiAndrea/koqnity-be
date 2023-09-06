const resetPassword = (userDb: any) => {
    return async function updatePasswordUser(info: any) {
        const res = await userDb.updatePasswordUser(info);
        if (res.status) {
            return res;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default resetPassword;
