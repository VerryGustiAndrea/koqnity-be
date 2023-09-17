const addUser = (makeUsers: Function, userDb: any) => {
    return async function post(info: Object) {
        let data = await makeUsers(info); // entity

        data = {
            username: data.getUsername(),
            full_name: data.getFullname(),
            hash_password: data.getPassword(),
            role: data.getRole(),
            user_id: data.getUserId(),
            created_at: new Date(),
            update_at: new Date()
        };
        const res = await userDb.insertUser(data);
        if (res.status) {
            return { user_id: data.user_id };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default addUser;
