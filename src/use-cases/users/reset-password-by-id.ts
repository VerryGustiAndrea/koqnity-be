const resetPasswordById = (userDb: any) => {
    return async function updatePasswordUser(info: any) {
        const res = await userDb.updatePasswordUserById(info);
        if (res.status) {
            return res;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default resetPasswordById;
