const selectUserById = (userDb: any) => {
    return async function selectUserById(info: any) {
        let data = [];
        const res = await userDb.selectUserByUserId(info.user_id);
        if (res.status) {
            const items = res.data;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                data.push({
                    full_name: e.full_name,
                    username: e.username,
                    hash_password: e.hash_password
                });
            }
            return data;
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default selectUserById;
