const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        userLogin,
        insertUser,
        insertToken,
        deleteTokenUser,
        updateProfileUser,
        selectUser,
        updatePasswordUser,
        getListUser,
        selectUserByUserId,
        updatePasswordUserById
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

    async function selectUserByUserId(data: String) {
        try {
            const User = models.user;
            const res = await User.findAll({
                where: {
                    [Op.or]: [{ user_id: data }]
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

    async function updatePasswordUserById(data: { user_id: String; hash_password: String }) {
        try {
            const User = models.user;
            const res = await User.update(
                {
                    hash_password: data.hash_password
                },
                { where: { user_id: data.user_id } }
            );
            return { data: null, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getListUser(data: any) {
        try {
            const pool = await conn();

            const { length, page, search, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    username: 'username',
                    full_name: 'full_name',
                    role: 'roles.name',
                };

                let sql = `SELECT user_id, username, full_name, last_login, roles.name as role_name, users.created_at FROM users left join roles on users.role = roles.role_id where users.user_id is not null `;
                let params: any = [];

                let countData = 0;
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }

                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                if (sort_by) {
                    sql += ' ORDER BY ' + sort_by + ' ' + sort_type;
                }

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection

                            if (err) resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    } else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });

            return res;
        } catch (e) {
            console.log('Error: ', e);
        }
    }
};

export default query;
