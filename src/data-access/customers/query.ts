import sequelize from 'sequelize';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        addCustomer,
        selectCustomer,
        updateCustomer,
        getListCustomer,
        getContactType
    });

    async function addCustomer(data: any) {
        try {
            const customer = models.customer;
            const res = await customer.create(data, { type: sequelize.QueryTypes.INSERT });
            const updateCode = await customer.update({ customer_code: 'C' + String(res.null).padStart(4, '0') }, { where: { id: res.null } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectCustomer(data: String) {
        try {
            const customer = models.customer;
            const res = await customer.findOne({ where: { customer_id: data } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function updateCustomer(data: any) {
        try {
            const customer = models.customer;
            const res = await customer.update(data, { where: { customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getListCustomer(data: { contact_id: Number; customer_status: string; length: string; page: string; search: string; sort_by: string; sort_type: string }) {
        try {
            const pool = await conn();

            const { contact_id, customer_status, length, page, search, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_code: 'customers.customer_code',
                    customer_name: 'customers.customer_name',
                    customer_status: 'customers.customer_status',
                    customer_npwp_number: 'customers.customer_npwp_number',
                    customer_pic_name: 'customers.customer_pic_name',
                    customer_email: 'customers.customer_email',
                    customer_phone_number: 'customers.customer_phone_number'
                };

                let sql = `SELECT customers.customer_id, customers.customer_code, customers.customer_name, customers.customer_status, customers.customer_npwp_number, customers.customer_pic_name, customers.customer_email, customers.customer_phone_number, customers.created_at, customers.updated_at, ct.name as contact_name FROM customers left join contact_types as ct on ct.id = customers.contact_id where customers.id is not null `;
                let params: any = [];
                if (customer_status) {
                    sql += ' and customers.customer_status = ?';
                    params = [customer_status];
                }

                if (contact_id) {
                    sql += ' and customers.contact_id = ?';
                    params = [contact_id];
                }

                let countData = 0;
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
    async function getContactType() {
        try {
            const contact_type = models.contact_type;
            const res = await contact_type.findAll();
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
