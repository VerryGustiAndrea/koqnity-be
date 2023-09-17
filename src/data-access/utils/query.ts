const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        insertLog
    });

    async function insertLog(data: String) {
        try {
            const ActivityLog = models.activity_log;
            const res = await ActivityLog.create(data);
            return { data: data, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
