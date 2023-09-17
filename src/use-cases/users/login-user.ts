const loginUser = (userDb: any) => {
    return async function selectUserForLogin(info: any) {
        let data = [];
        const res = await userDb.userLogin(info.username);
        if (res.status) {
            const items = res.data;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push({
                    user_id: e.user_id,
                    hash_password: e.hash_password,
                    full_name: e.full_name,
                    username: e.username,
                    role_id: e.role,
                    role_name: e.roles.name
                });
            }
            return data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default loginUser;
