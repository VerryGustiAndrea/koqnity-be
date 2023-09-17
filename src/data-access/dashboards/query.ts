import sequelize from 'sequelize';
import customer from '../sequelize/models/customer';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        totalSell,
        totalTransaction,
        totalSellGoods,
        totalCustomer,
        topCustomer,
        topGoods,
        getListOvertimePayment
    });

    async function totalSell(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT SUM(sells.amount) as totalAmount from sells where sell_id is not null `;
                let sqlLast = `SELECT SUM(sells.amount) as totalAmount from sells where sell_id is not null `;
                let params: any = [];

                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                    sqlLast += ' AND sells.date_invoice = DATE_ADD(CURDATE(), INTERVAL -1 DAY)';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                    sqlLast +=
                        ' AND sells.date_invoice >= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -7 DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -1 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                    sqlLast += ' AND MONTH(sells.date_invoice) = (MONTH(CURDATE()) -1) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                console.log(sql, sqlLast);
                let totalAmount = 0;
                let totalAmountLast = 0;
                pool.query(sql, params, (err: Error, res: any) => {
                    if (err) {
                        pool.end(); // end connection
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    } else {
                        if (res[0]?.totalAmount) {
                            totalAmount = res[0]?.totalAmount;
                        }
                        if (type != 'by_date') {
                            pool.query(sqlLast, params, (err: Error, res: any) => {
                                pool.end(); // end connection
                                if (err) {
                                    resolve({ data: [], count: 0, status: false, errorMessage: err });
                                } else {
                                    if (res[0]?.totalAmount) {
                                        totalAmountLast = res[0]?.totalAmount;
                                    }
                                    resolve({ data: { totalAmount: totalAmount, totalAmountLast: totalAmountLast }, status: true, errorMessage: '' });
                                }
                            });
                        } else {
                            resolve({ data: { totalAmount: totalAmount, totalAmountLast: totalAmountLast }, status: true, errorMessage: '' });
                        }
                    }
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function totalTransaction(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT COUNT(*) as totalTransaction from sells where sell_id is not null `;
                let sqlLast = `SELECT COUNT(*) as totalTransaction from sells where sell_id is not null `;
                let params: any = [];

                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                    sqlLast += ' AND sells.date_invoice = DATE_ADD(CURDATE(), INTERVAL -1 DAY)';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                    sqlLast +=
                        ' AND sells.date_invoice >= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -7 DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -1 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                    sqlLast += ' AND MONTH(sells.date_invoice) = (MONTH(CURDATE()) -1) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                let totalTransaction = 0;
                let totalTransactionLast = 0;
                pool.query(sql, params, (err: Error, res: any) => {
                    if (err) {
                        pool.end(); // end connection
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    } else {
                        if (res[0]?.totalTransaction) {
                            totalTransaction = res[0]?.totalTransaction;
                        }
                        if (type != 'by_date') {
                            pool.query(sqlLast, params, (err: Error, res: any) => {
                                pool.end(); // end connection
                                if (err) {
                                    resolve({ data: [], count: 0, status: false, errorMessage: err });
                                } else {
                                    if (res[0]?.totalTransaction) {
                                        totalTransactionLast = res[0]?.totalTransaction;
                                    }
                                    resolve({ data: { totalTransaction: totalTransaction, totalTransactionLast: totalTransactionLast }, status: true, errorMessage: '' });
                                }
                            });
                        } else {
                            resolve({ data: { totalTransaction: totalTransaction, totalTransactionLast: totalTransactionLast }, status: true, errorMessage: '' });
                        }
                    }
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function totalSellGoods(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise(async (resolve) => {
                let sql = `SELECT SUM(qty) as totalGoods from sell_items join sells on sell_items.sell_id = sells.sell_id where sells.sell_id is not null `;
                let sqlLast = `SELECT SUM(qty) as totalGoods from sell_items join sells on sell_items.sell_id = sells.sell_id where sells.sell_id is not null `;
                let params: any = [];

                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                    sqlLast += ' AND sells.date_invoice = DATE_ADD(CURDATE(), INTERVAL -1 DAY)';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                    sqlLast +=
                        ' AND sells.date_invoice >= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -7 DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -1 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                    sqlLast += ' AND MONTH(sells.date_invoice) = (MONTH(CURDATE()) -1) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                let totalGoods = 0;
                let totalGoodsLast = 0;

                pool.query(sql, params, (err: Error, res: any) => {
                    if (err) {
                        pool.end(); // end connection
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    } else {
                        if (res[0]?.totalGoods) {
                            totalGoods = res[0]?.totalGoods;
                        }
                        if (type != 'by_date') {
                            pool.query(sqlLast, params, (err: Error, res: any) => {
                                pool.end(); // end connection
                                if (err) {
                                    resolve({ data: [], count: 0, status: false, errorMessage: err });
                                } else {
                                    if (res[0]?.totalGoods) {
                                        totalGoodsLast = res[0]?.totalGoods;
                                    }
                                    resolve({ data: { totalGoods: totalGoods, totalGoodsLast: totalGoodsLast }, status: true, errorMessage: '' });
                                }
                            });
                        } else {
                            resolve({ data: { totalGoods: totalGoods, totalGoodsLast: totalGoodsLast }, status: true, errorMessage: '' });
                        }
                    }
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function totalCustomer(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT COUNT(*) as totalCustomer from sells where sells.sell_id is not null `;
                let sqlLast = `SELECT COUNT(*) as totalCustomer from sells where sells.sell_id is not null `;
                let params: any = [];

                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                    sqlLast += ' AND sells.date_invoice = DATE_ADD(CURDATE(), INTERVAL -1 DAY)';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                    sqlLast +=
                        ' AND sells.date_invoice >= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -7 DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL -1 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                    sqlLast += ' AND MONTH(sells.date_invoice) = (MONTH(CURDATE()) -1) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                let totalCustomer = 0;
                let totalCustomerLast = 0;

                pool.query(sql, params, (err: Error, res: any) => {
                    if (err) {
                        pool.end(); // end connection
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    } else {
                        if (res[0]?.totalCustomer) {
                            totalCustomer = res[0]?.totalCustomer;
                        }
                        if (type != 'by_date') {
                            pool.query(sqlLast, params, (err: Error, res: any) => {
                                pool.end(); // end connection
                                if (err) {
                                    resolve({ data: [], count: 0, status: false, errorMessage: err });
                                } else {
                                    if (res[0]?.totalCustomer) {
                                        totalCustomerLast = res[0]?.totalCustomer;
                                    }
                                    resolve({ data: { totalCustomer: totalCustomer, totalCustomerLast: totalCustomerLast }, status: true, errorMessage: '' });
                                }
                            });
                        } else {
                            resolve({ data: { totalCustomer: totalCustomer, totalCustomerLast: totalCustomerLast }, status: true, errorMessage: '' });
                        }
                    }
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function topCustomer(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT customer_name, COUNT(*) as totalTransaction , SUM(amount) as totalAmount from sells left join customers on sells.customer_id = customers.customer_id where sells.sell_id is not null `;
                let params: any = [];
                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                sql += ' group by sells.customer_id order by totalTransaction DESC limit 5';
                pool.query(sql, params, (err: Error, res: Response) => {
                    pool.end(); // end connection
                    console.log(err);
                    if (err) resolve({ data: [], count: 0, status: false, errorMessage: err });
                    resolve({ data: res, count: 5, status: true, errorMessage: '' });
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function topGoods(data: any) {
        try {
            const pool = await conn();

            const { type, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT inventories.code as inventory_code, SUM(qty) as totalQTY , SUM(sell_items.total) as totalAmount from sell_items left join inventories on sell_items.inventory_id = inventories.inventory_id join sells on sell_items.sell_id = sells.sell_id where sell_items.sell_id is not null `;
                let params: any = [];
                if (type == 'by_day') {
                    sql += ' AND sells.date_invoice = CURDATE()';
                }
                if (type == 'by_week') {
                    sql +=
                        ' AND sells.date_invoice >= DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) and sells.date_invoice <= DATE_ADD(DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)';
                }
                if (type == 'by_month') {
                    sql += ' AND MONTH(sells.date_invoice) = MONTH(CURDATE()) AND YEAR(sells.date_invoice) = YEAR(CURDATE())';
                }
                if (type == 'by_date') {
                    if (start_date) {
                        sql += ' AND DATE(sells.date_invoice) >= ?';
                        params = [...params, start_date];
                    }
                    if (end_date) {
                        sql += ' AND DATE(sells.date_invoice) <= ?';
                        params = [...params, end_date];
                    }
                }
                sql += ' group by sell_items.inventory_id order by totalQTY DESC limit 5 ';
                pool.query(sql, params, (err: Error, res: Response) => {
                    pool.end(); // end connection
                    if (err) resolve({ data: [], count: 0, status: false, errorMessage: err });
                    resolve({ data: res, count: 5, status: true, errorMessage: '' });
                });
            });
            return res;
        } catch (e: any) {
            console.log('Error: ', e);
        }
    }

    async function getListOvertimePayment(data: { length: string; page: string }) {
        try {
            const pool = await conn();
            const { length, page } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {};

                let sql = `select s.code, DATEDIFF(curdate(), s.end_pay_date) as date_diff, c.customer_name, date_invoice, end_pay_date, total, total - amount_pay as amount  from sells as s left join customers as c on s.customer_id = c.customer_id where s.end_pay_date < curdate() and s.status <> "Lunas" order by s.end_pay_date`;
                let params: any = [];

                let countData = 0;

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
