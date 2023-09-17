const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        userLogin,
        insertUser,
        insertToken,
        deleteTokenUser,
        updateProfileUser,
        selectUser,
        updatePasswordUser
    });

    async function userLogin(data: String) {
        try {
            const User = models.user;
            const role = models.role;
            const res = await User.findAll({
                where: {
                    [Op.or]: [{ username: data }]
                },
                include: {
                    model: role,
                    as: 'roles'
                }
            });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectUser(data: String) {
        try {
            const User = models.user;
            const res = await User.findAll({
                where: {
                    [Op.or]: [{ token: data }]
                }
            });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function insertUser(data: Object) {
        try {
            const User = models.user;
            const res = await User.create(data);
            return { data: data, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function insertToken(data: { token: String; user_id: String }) {
        try {
            const User = models.user;
            const res = await User.update(
                {
                    token: data.token,
                    last_login: new Date()
                },
                { where: { user_id: data.user_id } }
            );
            return { data: data, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function deleteTokenUser(token: String) {
        try {
            const User = models.user;
            const res = await User.update(
                {
                    token: null
                },
                { where: { token: token } }
            );
            return { data: { token: token }, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateProfileUser(data: { token: String; full_name: String }) {
        try {
            const User = models.user;
            const res = await User.update(
                {
                    full_name: data.full_name.toLowerCase()
                },
                { where: { token: data.token } }
            );
            return { data: { full_name: data.full_name.toLowerCase() }, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updatePasswordUser(data: { token: String; hash_password: String }) {
        try {
            const User = models.user;
            const res = await User.update(
                {
                    hash_password: data.hash_password
                },
                { where: { token: data.token } }
            );
            return { data: null, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
