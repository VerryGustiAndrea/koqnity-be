import sequelize from 'sequelize';
import customer from '../sequelize/models/customer';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        addBuy,
        getOrdinalNumber,
        addItem,
        updateStatus,
        selectBuy,
        getListBuy,
        getCountStatus,
        addPayHistory,
        getOrdinalNumberPayHistory,
        updateAmountPay
    });

    async function addBuy(data: any) {
        try {
            const buy = models.buy;
            const res = await buy.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getOrdinalNumber(data: any) {
        try {
            const buy = models.buy;
            const res = await buy.findOne({ order: [['ordinal_number', 'DESC']] });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function addItem(data: any) {
        try {
            const buy_item = models.buy_item;
            const res = await buy_item.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateStatus(data: any) {
        try {
            const buy = models.buy;
            const res = await buy.update(data, { where: { buy_id: data.buy_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectBuy(data: any) {
        try {
            const buy = models.buy;
            const buy_item = models.buy_item;
            const res = await buy.findOne({
                where: { buy_id: data },
                include: ['vendor', 'pay_buy_history', { model: buy_item, as: 'buy_item', include: ['inventory', 'warehouse'] }]
            });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getListBuy(data: {
        length: string;
        page: string;
        search: string;
        status: string;
        customer: string;
        min_price: string;
        max_price: string;
        start_date: string;
        end_date: string;
        sort_by: string;
        sort_type: string;
    }) {
        try {
            const pool = await conn();

            const { length, page, search, status, customer, min_price, max_price, start_date, end_date, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'buys.code'
                };

                let sql = `SELECT buys.buy_id, buys.date_invoice, buys.code, buys.total, buys.status, buys.amount, buys.amount_pay,  buys.end_pay_date, customers.customer_name as customer_name from buys left join customers on buys.vendor_id = customers.customer_id where buy_id is not null `;
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
                if (status) {
                    sql += ' AND buys.status = ?';
                    params = [...params, status];
                }
                if (customer) {
                    sql += ' AND buys.customer_id in (' + customer + ')';
                }
                if (min_price) {
                    sql += ' AND buys.total >= ?';
                    params = [...params, min_price];
                }
                if (max_price) {
                    sql += ' AND buys.total <= ?';
                    params = [...params, max_price];
                }
                if (start_date) {
                    sql += ' AND DATE(buys.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(buys.date_invoice) <= ?';
                    params = [...params, end_date];
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
    async function getCountStatus() {
        try {
            const pool = await conn();

            const res = await new Promise((resolve) => {
                let sql = `SELECT SUM(CASE WHEN status = 'Belum Dibayar' THEN 1 ELSE 0 END) AS unpaid, SUM(CASE WHEN status = 'Dibayar Sebagian' THEN 1 ELSE 0 END) AS partial_paid, SUM(CASE WHEN status = 'Lunas' THEN 1 ELSE 0 END) AS paid, SUM(CASE WHEN status = 'Jatuh Tempo' THEN 1 ELSE 0 END) AS over_unpaid, SUM(CASE WHEN status = 'Lunas' THEN 1 ELSE 0 END) AS paid, SUM(CASE WHEN status = 'Retur' THEN 1 ELSE 0 END) AS retur
                            FROM buys`;
                let params: any = [];

                pool.query(sql, params, (err: Error, res: Response) => {
                    pool.end(); // end connection
                    console.log(err);
                    if (err) resolve({ data: [], count: 0, status: false, errorMessage: err });
                    resolve({ data: res, status: true, errorMessage: '' });
                });
            });

            return res;
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    async function addPayHistory(data: any) {
        try {
            const pay_buy_history = models.pay_buy_history;
            const res = await pay_buy_history.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getOrdinalNumberPayHistory(data: String) {
        try {
            const pay_buy_history = models.pay_buy_history;
            const res = await pay_buy_history.findOne({ order: [['ordinal_number', 'DESC']], where: { buy_id: data } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateAmountPay(data: any) {
        try {
            const buy = models.buy;
            const res = await buy.update(data, { where: { buy_id: data.buy_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
