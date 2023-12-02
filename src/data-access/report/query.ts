import sequelize from 'sequelize';
import customer from '../sequelize/models/customer';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        getSellReport,
        getSellOfCustomer,
        getSellOfPeriod,
        getSellOfProduct,
        getSellOutstandingOfCustomer,
        getBuyReport,
        getBuyOfCustomer,
        getBuyOfPeriod,
        getBuyOfProduct,
        getBuyOutstandingOfVendor
    });

    async function getSellReport(data: { search: string; customer: string; warehouse: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, warehouse, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'sells.code'
                };
                let sql = `SELECT sells.*, customers.customer_name as customer_name from sells left join customers on sells.customer_id = customers.customer_id where sell_id is not null `;
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
                if (customer) {
                    sql += ' AND sells.customer_id in (' + customer + ')';
                }
                if (warehouse) {
                    sql += ' AND sells.warehouse_id in (' + warehouse + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(sells.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(sells.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' ORDER BY sells.created_at';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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

    async function getSellOfCustomer(data: { search: string; customer: string; warehouse: string; customer_id: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, warehouse, customer_id, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'sells.code'
                };

                let sql = `SELECT SUM(sells.amount) as amount, SUM(sells.tax) as tax, SUM(sells.total) as total, customers.customer_name as customer_name from sells left join customers on sells.customer_id = customers.customer_id where sell_id is not null `;
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
                if (customer) {
                    sql += ' AND sells.customer_id in (' + customer + ')';
                }
                if (warehouse) {
                    sql += ' AND sells.warehouse_id in (' + warehouse + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(sells.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(sells.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' GROUP BY  sells.customer_id';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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

    async function getSellOfPeriod(data: { filter_by: string; search: string; start_date: string; end_date: string; status: string; customer: string; warehouse: string; company_status: string }) {
        try {
            const pool = await conn();

            const { filter_by, start_date, end_date, status, customer, warehouse, company_status } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    // customer_name: 'customers.customer_name',
                    // invoice_code: 'sells.code'
                };
                let sql = '';
                let join = '';
                if (status != '' || customer != '' || warehouse != '' || company_status != '') {
                    join = `left join sells on sells.sell_id = sell_items.sell_id left join customers on sells.customer_id = customers.customer_id`;
                }
                if (filter_by == 'by_day') {
                    sql = `SELECT SUM(sell_items.qty) as qty, SUM(sell_items.total) as total, DATE(sell_items.created_at) as by_date from sell_items ${join} where sell_items.sell_id is not null `;
                } else {
                    sql = `SELECT SUM(sell_items.qty) as qty, SUM(sell_items.total) as total,  DATE_FORMAT(sell_items.created_at, "%Y") AS year,
                    DATE_FORMAT(sell_items.created_at, "%M") AS month from sell_items ${join} where sell_items.sell_id is not null `;
                }

                let params: any = [];

                let countData = 0;

                if (status) {
                    sql += ' AND sells.status in (' + status + ')';
                }
                if (company_status) {
                    sql += ' AND customers.customer_status in (' + company_status + ')';
                }
                if (customer) {
                    sql += ' AND sells.customer_id in (' + customer + ')';
                }
                if (warehouse) {
                    sql += ' AND sells.warehouse_id in (' + warehouse + ')';
                }

                if (start_date) {
                    if (filter_by == 'by_day') {
                        sql += ' AND DATE(sell_items.created_at) >= ?';
                        params = [...params, start_date];
                    } else if (filter_by == 'by_month') {
                        sql += ' AND MONTH(sell_items.created_at) >= MONTH(?) AND YEAR(sell_items.created_at) >= YEAR(?)';
                        params = [...params, start_date, start_date];
                    } else {
                        sql += ' AND YEAR(sell_items.created_at) >= YEAR(?)';
                        params = [...params, start_date];
                    }
                }
                if (end_date) {
                    if (filter_by == 'by_day') {
                        sql += ' AND DATE(sell_items.created_at) <= ?';
                        params = [...params, end_date];
                    } else if (filter_by == 'by_month') {
                        sql += ' AND MONTH(sell_items.created_at) <= MONTH(?) AND YEAR(sell_items.created_at) <= YEAR(?)';
                        params = [...params, end_date, end_date];
                    } else {
                        sql += ' AND YEAR(sell_items.created_at) <= YEAR(?)';
                        params = [...params, end_date];
                    }
                }
                if (filter_by == 'by_day') {
                    sql += ' GROUP BY  by_date';
                } else if (filter_by == 'by_month') {
                    sql += ' GROUP BY  month, year';
                } else {
                    sql += ' GROUP BY year';
                }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

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

    async function getSellOfProduct(data: { search: string; inventory: string; warehouse: string; start_date: string; end_date: string, customer: string }) {
        try {
            const pool = await conn();

            const { start_date, end_date, inventory, warehouse, customer } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'sell_items.code'
                };

                let sql = `SELECT sell_items.inventory_id, GROUP_CONCAT(DISTINCT inc.inventory_name separator ', ') as reference_name, inv.code as inventory_code, inv.name as inventory_name, category.name as category_name, merk.name as merk_name, sum(sell_items.qty) as qty, sum(sell_items.total) as total, sum(sell_items.total-sell_items.amount) as tax from sell_items left join inventories as inv on sell_items.inventory_id = inv.inventory_id left join sells on sells.sell_id = sell_items.sell_id left join type_inventories as category on category.type_id = inv.category_id left join type_inventories as merk on merk.type_id = inv.merk_id left join inventory_name_customers as inc on inc.inventory_id =inv.inventory_id where sell_items.sell_id is not null `;
                let params: any = [];

                let countData = 0;

                if (inventory) {
                    sql += ' AND sell_items.inventory_id in (' + inventory + ')';
                }
                if (warehouse) {
                    sql += ' AND sells.warehouse_id in (' + warehouse + ')';
                }
                console.log(customer)
                if (customer) {
                    sql += ' AND sells.customer_id in (' + customer + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(sell_items.created_at) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(sell_items.created_at) <= ?';
                    params = [...params, end_date];
                }

                sql += ' GROUP BY  sell_items.inventory_id';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        console.log(sql)

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

    async function getSellOutstandingOfCustomer(data: { search: string; customer: string; warehouse: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, warehouse, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name'
                };

                let sql = `SELECT SUM(sells.amount) as amount, SUM(sells.tax) as tax, SUM(sells.total) as total, SUM(sells.amount_pay) as amount_pay, SUM(sells.total - sells.amount_pay) as rest_of_the_bill, customers.customer_name as customer_name from sells left join customers on sells.customer_id = customers.customer_id where sell_id is not null `;
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
                if (customer) {
                    sql += ' AND sells.customer_id in (' + customer + ')';
                }
                if (warehouse) {
                    sql += ' AND sells.warehouse_id in (' + warehouse + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(sells.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(sells.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' GROUP BY  sells.customer_id';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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

    async function getBuyReport(data: { search: string; customer: string; warehouse: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, warehouse, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'sells.code'
                };
                let sql = `SELECT buys.*, customers.customer_name as customer_name from buys left join customers on buys.vendor_id  = customers.customer_id where buy_id is not null `;
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
                if (customer) {
                    sql += ' AND buys.vendor_id in (' + customer + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(buys.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(buys.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' ORDER BY buys.created_at';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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
    async function getBuyOfCustomer(data: { search: string; customer: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'buys.code'
                };

                let sql = `SELECT SUM(buys.amount) as amount, SUM(buys.tax) as tax, SUM(buys.total) as total, customers.customer_name as customer_name from buys left join customers on buys.vendor_id  = customers.customer_id where buy_id is not null `;
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
                if (customer) {
                    sql += ' AND buys.vendor_id in (' + customer + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(buys.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(buys.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' GROUP BY  buys.vendor_id ';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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

    async function getBuyOfPeriod(data: { filter_by: string; search: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { filter_by, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    // customer_name: 'customers.customer_name',
                    // invoice_code: 'sells.code'
                };
                let sql = '';
                if (filter_by == 'by_day') {
                    sql = `SELECT SUM(qty) as qty, SUM(total) as total, DATE(buy_items.created_at) as by_date from buy_items where buy_id is not null `;
                } else {
                    sql = `SELECT SUM(qty) as qty, SUM(total) as total,  DATE_FORMAT(buy_items.created_at, "%Y") AS year,
                    DATE_FORMAT(buy_items.created_at, "%M") AS month from buy_items where buy_id is not null `;
                }
                let params: any = [];

                let countData = 0;

                if (start_date) {
                    if (filter_by == 'by_day') {
                        sql += ' AND DATE(buy_items.created_at) >= ?';
                        params = [...params, start_date];
                    } else {
                        sql += ' AND MONTH(buy_items.created_at) >= MONTH(?) AND YEAR(buy_items.created_at) >= YEAR(?)';
                        params = [...params, start_date, start_date];
                    }
                }
                if (end_date) {
                    if (filter_by == 'by_day') {
                        sql += ' AND DATE(buy_items.created_at) <= ?';
                        params = [...params, end_date];
                    } else {
                        sql += ' AND MONTH(buy_items.created_at) <= MONTH(?) AND YEAR(buy_items.created_at) <= YEAR(?)';
                        params = [...params, end_date, end_date];
                    }
                }
                if (filter_by == 'by_day') {
                    sql += ' GROUP BY  by_date';
                } else {
                    sql += ' GROUP BY  month, year';
                }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

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

    async function getBuyOfProduct(data: { search: string; inventory: string; warehouse: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { start_date, end_date, inventory, warehouse } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    invoice_code: 'buy_items.code'
                };

                let sql = `SELECT buy_items.inventory_id,inv.code as inventory_code, inv.name as inventory_name, category.name as category_name, merk.name as merk_name, sum(buy_items.qty) as qty, sum(buy_items.total) as total, sum(buy_items.total-buy_items.amount) as tax from buy_items left join inventories as inv on buy_items.inventory_id = inv.inventory_id left join type_inventories as category on category.type_id = inv.category_id left join type_inventories as merk on merk.type_id = inv.merk_id where buy_id is not null `;
                let params: any = [];

                let countData = 0;
                if (inventory) {
                    sql += ' AND buy_items.inventory_id in (' + inventory + ')';
                }
                if (warehouse) {
                    sql += ' AND buy_items.warehouse_id in (' + warehouse + ')';
                }
                if (start_date) {
                    sql += ' AND DATE(buy_items.created_at) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(buy_items.created_at) <= ?';
                    params = [...params, end_date];
                }

                sql += ' GROUP BY  buy_items.inventory_id';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

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

    async function getBuyOutstandingOfVendor(data: { search: string; customer: string; start_date: string; end_date: string }) {
        try {
            const pool = await conn();

            const { search, customer, start_date, end_date } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name'
                };

                let sql = `SELECT SUM(buys.amount) as amount, SUM(buys.tax) as tax, SUM(buys.total) as total, SUM(buys.amount_pay) as amount_pay, SUM(buys.total - buys.amount_pay) as rest_of_the_bill, customers.customer_name as customer_name from buys left join customers on buys.vendor_id = customers.customer_id where buy_id is not null `;
                let params: any = [];

                let countData = 0;

                if (customer) {
                    sql += ' AND buys.vendor_id in (' + customer + ')';
                }
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                if (start_date) {
                    sql += ' AND DATE(buys.date_invoice) >= ?';
                    params = [...params, start_date];
                }
                if (end_date) {
                    sql += ' AND DATE(buys.date_invoice) <= ?';
                    params = [...params, end_date];
                }
                sql += ' GROUP BY  buys.vendor_id';

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;

                        pool.query(sql, params, (err: Error, res: Response) => {
                            pool.end(); // end connection
                            console.log(err);
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
