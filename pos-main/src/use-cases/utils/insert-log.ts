const insertLog = (makeLogs: Function, userDb: any, utilDB: any) => {
    return async function post(info: any) {
        const res = await userDb.selectUser(info.token);
        const items = res.data;
        let user_id = '';
        for (let i = 0; i < items.length; i++) {
            const e = items[i];
            user_id = e.user_id;
        }
        let data = await makeLogs({ ...info, user_id: user_id }); // entity

        data = {
            activity_id: data.getActivityID(),
            type_activity: data.getTypeActivity(),
            user_id: data.getUserID(),
            data: data.getData(),
            status: data.getStatus(),
            created_at: new Date(),
            update_at: new Date()
        };
        const insertLog = await utilDB.insertLog(data);
        return { user_id: data.user_id };
    };
};

export default insertLog;
