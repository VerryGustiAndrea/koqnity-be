const updateUser = (userDb: any) => {
    return async function updateProfileUser(info: any) {
        const res = await userDb.updateProfileUser(info);
        if (res.status) {
            return res.data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default updateUser;
