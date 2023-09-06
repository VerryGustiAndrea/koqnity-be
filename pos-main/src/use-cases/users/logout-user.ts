const logoutUser = (userDb: any) => {
    return async function deleteTokenUser(info: any) {
        const res = await userDb.deleteTokenUser(info.token);
        if (res.status) {
            return { token: info.token };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default logoutUser;
