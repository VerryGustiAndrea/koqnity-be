const insertToken = (userDb: any) => {
    return async function post(info: { token: String; user_id: String }) {
        let data: Object = {
            user_id: info.user_id,
            token: info.token
        };
        const res = await userDb.insertToken(data);
        if (res.status) {
            return { status: res.status };
        } else {
            throw new Error(res.errorMessage);
        }
    };
};

export default insertToken;
