import sequelize from 'sequelize';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        addType,
        getType,
        getAllType,
        selectType,
        addInventory,
        getOrdinalNumber,
        selectInventory,
        getListInventory,
        addVariationInventory,
        getListVariation,
        updateVariation,
        updateInventory,
        getOrdinalNumberVariation,
        updateAllVariationInventory,
        selectVariation,
        selectStock,
        updateStock,
        getOrdinalNumberHistory,
        addStock,
        selectStockWarehouse,
        addPriceSellCustomer,
        updatePriceSellCustomer,
        deletePriceSellCustomer,
        getPriceSellCustomer,
        selectInventorySell,
        getSellByInventory,
        getStockFlow,
        getListSelectedInventory,
        addInventoryNameCustomer,
        updateInventoryNameCustomer,
        deleteInventoryNameCustomer,
        getInventoryNameCustomer,
        addInventoryNote,
        getInventoryNote,
        addPriceBuyCustomer,
        updatePriceBuyCustomer,
        deletePriceBuyCustomer,
        getPriceBuyCustomer,
        selectInventoryBuy,
        getListInventoryBuy
    });

    async function addType(data: any) {
        try {
            const type_inventory = models.type_inventory;
            const res = await type_inventory.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getType(data: any) {
        try {
            const type_inventory = models.type_inventory;
            const res = await type_inventory.findOne({ where: { type_id: data } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getAllType(data: any) {
        try {
            const type_inventory = models.type_inventory;
            const res = await type_inventory.findAll({ where: { type: data.type } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectType(data: any) {
        try {
            const pool = await conn();

            const { type, length, page } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql = `SELECT * FROM type_inventories where type_id is not null `;
                let params: any = [];
                if (type) {
                    sql += ' and type_inventories.type = ?';
                    params = [type];
                }

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
                    }
                });
            });

            return res;
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    async function getOrdinalNumber(data: any) {
        try {
            const inventory = models.inventory;
            const res = await inventory.findOne({ where: { category_id: data.category_id, merk_id: data.merk_id }, order: [['ordinal_number', 'DESC']] });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getOrdinalNumberVariation(inventory_id: any) {
        try {
            const variation_inventory = models.variation_inventory;
            const res = await variation_inventory.findOne({ where: { inventory_id: inventory_id }, order: [['ordinal_number', 'DESC']] });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function addInventory(data: any) {
        try {
            const inventory = models.inventory;
            const res = await inventory.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectInventory(data: any) {
        try {
            const inventory = models.inventory;
            const history_stock = models.history_stock;
            const sell_item = models.sell_item;

            const res = await inventory.findOne({
                where: { inventory_id: data },
                include: ['category', 'merk', { model: history_stock, as: 'history_stock', include: ['warehouse'] }, { model: sell_item, as: 'sell_item', include: ['sell'] }]
            });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectInventorySell(data: { inventory_id: String; customer_id: String }) {
        try {
            const pool = await conn();

            const res = await new Promise((resolve, reject) => {
                const { inventory_id, customer_id } = data; // deconstruct
                let customer_query: string = '';
                let customer_join_query: string = '';
                if (customer_id) {
                    customer_query = ' if(psc.price > 0, psc.price, inventories.price) as price';
                    customer_join_query =
                        ` left join (SELECT price_sell_customers.inventory_id, price_sell_customers.price from price_sell_customers where customer_id ="` +
                        customer_id +
                        `") as psc on psc.inventory_id = inventories.inventory_id `;
                } else {
                    customer_query = ' ,inventories.price as price';
                }

                let sql: string = `SELECT ` + customer_query + ` FROM inventories ` + customer_join_query + ` where inventories.inventory_id = "` + inventory_id + `" limit 1`;
                let params: any = [];
                console.log(sql);
                pool.query(sql, params, (err: Error, res: any) => {
                    console.log(res);
                    pool.end(); // end connection
                    if (err) resolve({ data: [], status: false, errorMessage: err });
                    resolve({ data: res[0], status: true, errorMessage: '' });
                });
            });

            return res;
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectInventoryBuy(data: any) {
        try {
            const pool = await conn();
            const res = await new Promise((resolve, reject) => {
                const { inventory_id, customer_id } = data; // deconstruct
                let customer_query = '';
                let customer_join_query = '';
                if (customer_id) {
                    customer_query = ' if(psc.price > 0, psc.price, inventories.price) as price, if(psc.price > 0, 1, 0) as isPriceBuyCustomers';
                    customer_join_query =
                        ` left join (SELECT price_buy_customers.inventory_id, price_buy_customers.price from price_buy_customers where customer_id ="` +
                        customer_id +
                        `") as psc on psc.inventory_id = inventories.inventory_id `;
                }
                else {
                    customer_query = ' ,inventories.price as price';
                }
                let sql = `SELECT ` + customer_query + ` FROM inventories ` + customer_join_query + ` where inventories.inventory_id = "` + inventory_id + `" limit 1`;
                let params: any = [];
                pool.query(sql, params, (err: Error, res: any) => {
                    console.log(res);
                    pool.end(); // end connection
                    if (err)
                        resolve({ data: [], status: false, errorMessage: err });
                    resolve({ data: res[0], status: true, errorMessage: '' });
                });
            });
            return res;
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateInventory(data: any) {
        try {
            const inventory = models.inventory;
            const res = await inventory.update(data, { where: { inventory_id: data.inventory_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateAllVariationInventory(data: any) {
        try {
            const pool = await conn();

            const res = await new Promise((resolve, reject) => {
                let sql = `UPDATE variation_inventories SET code =concat(?,ordinal_number) where inventory_id = ?`;
                let params: any = [data.code + '-', data.inventory_id];

                pool.query(sql, params, (err: Error, result: any) => {
                    if (!err) {
                        reject(err);
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

    async function getListInventory(data: {
        length: string;
        page: string;
        search: string;
        category: string;
        merk: string;
        warehouse: string;
        customer_id: string;
        sort_by: string;
        sort_type: string;
    }) {
        try {
            const pool = await conn();

            const { length, page, search, category, merk, warehouse, customer_id, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    inventory_name: 'inventories.name',
                    inventory_code: 'inventories.code',
                    category_name: 'ts.name',
                    merk_name: 'ta.name'
                };
                let warehouse_query: string = '';
                let warehouse_join_query: string = '';
                let customer_query: string = '';
                let customer_join_query: string = '';

                if (warehouse) {
                    warehouse_query = `, stock_warehouses.stock_qty as stock_qty`;
                    warehouse_join_query =
                        ` left join (SELECT stock_qty, inventory_id FROM stock_warehouses WHERE warehouse_id="` +
                        warehouse +
                        `") as stock_warehouses on stock_warehouses.inventory_id = inventories.inventory_id `;
                }

                if (customer_id) {
                    customer_query = ' , if(psc.price > 0, psc.price, inventories.price) as price';
                    customer_join_query =
                        ` left join (SELECT price_sell_customers.inventory_id, price_sell_customers.price from price_sell_customers where customer_id ="` +
                        customer_id +
                        `") as psc on psc.inventory_id = inventories.inventory_id `;
                } else {
                    customer_query = ' ,inventories.price as price';
                }

                let sql: string =
                    `SELECT inventories.inventory_id` +
                    customer_query +
                    `, inventories.code as code_inventory, inventories.capital_price as capital_price, inventories.name as name_inventory, ts.name as category_name, ta.name as merk_name` +
                    warehouse_query +
                    ` FROM inventories join type_inventories as ts on ts.type_id = inventories.category_id join type_inventories as ta on ta.type_id = inventories.merk_id` +
                    warehouse_join_query +
                    customer_join_query +
                    ` where inventories.inventory_id is not null `;
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
                if (category) {
                    sql += ' AND inventories.category_id in (' + category + ')';
                }
                if (merk) {
                    sql += ' AND inventories.merk_id in (' + merk + ')';
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
    async function getListInventoryBuy(data: any) {
        try {
            const pool = await conn();
            const { length, page, search, category, merk, warehouse, customer_id, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    inventory_name: 'inventories.name',
                    inventory_code: 'inventories.code',
                    category_name: 'ts.name',
                    merk_name: 'ta.name'
                };
                let customer_query = '';
                let customer_join_query = '';
                if (customer_id) {
                    customer_query = ' , if(psc.price > 0, psc.price, inventories.capital_price) as capital_price, inventories.name as name_inventory';
                    customer_join_query =
                        ` left join (SELECT price_buy_customers.inventory_id, price_buy_customers.price from price_buy_customers where customer_id ="` +
                        customer_id +
                        `") as psc on psc.inventory_id = inventories.inventory_id `;
                }
                else {
                    customer_query = ' ,inventories.capital_price as capital_price, inventories.name as name_inventory';
                }
                let sql = `SELECT inventories.inventory_id` +
                    customer_query +
                    `, inventories.code as code_inventory, inventories.price, ts.name as category_name, ta.name as merk_name` +
                    ` FROM inventories join type_inventories as ts on ts.type_id = inventories.category_id join type_inventories as ta on ta.type_id = inventories.merk_id` +
                    customer_join_query +
                    ` where inventories.inventory_id is not null `;
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
                if (category) {
                    sql += ' AND inventories.category_id in (' + category + ')';
                }
                if (merk) {
                    sql += ' AND inventories.merk_id in (' + merk + ')';
                }
                if (sort_by) {
                    sql += ' ORDER BY ' + sort_by + ' ' + sort_type;
                }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];
                        pool.query(sql, params, (err: Error, res: any) => {
                            pool.end(); // end connection
                            if (err)
                                resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    }
                    else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });
            return res;
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }

    async function getListSelectedInventory(data: any) {
        try {
            const pool = await conn();
            const { warehouse, customer_id, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField = {
                    inventory_name: 'inventories.name',
                    inventory_code: 'inventories.code',
                    category_name: 'ts.name',
                    merk_name: 'ta.name'
                };
                let warehouse_query = '';
                let warehouse_join_query = '';
                let customer_query = '';
                let customer_join_query = '';
                if (warehouse) {
                    warehouse_query = `, stock_warehouses.stock_qty as stock_qty`;
                    warehouse_join_query =
                        ` left join (SELECT stock_qty, inventory_id FROM stock_warehouses WHERE warehouse_id="` +
                        warehouse +
                        `") as stock_warehouses on stock_warehouses.inventory_id = inventories.inventory_id `;
                }
                if (customer_id) {
                    customer_query = ' , if(psc.price > 0, psc.price, inventories.price) as price, if(inc.inventory_name is not null, inc.inventory_name, inventories.name) as name_inventory';
                    customer_join_query =
                        ` left join (SELECT price_sell_customers.inventory_id, price_sell_customers.price from price_sell_customers where customer_id ="` +
                        customer_id +
                        `") as psc on psc.inventory_id = inventories.inventory_id ` +
                        ` left join (SELECT inventory_name_customers.inventory_id, inventory_name_customers.inventory_name from inventory_name_customers where customer_id ="` +
                        customer_id +
                        `") as inc on inc.inventory_id = inventories.inventory_id `;
                }
                else {
                    customer_query = ' ,inventories.price as price';
                }
                let sql = `SELECT inventories.inventory_id` +
                    customer_query +
                    `, inventories.code as code_inventory, inventories.capital_price as capital_price, ts.name as category_name, ta.name as merk_name` +
                    warehouse_query +
                    ` FROM inventories join type_inventories as ts on ts.type_id = inventories.category_id join type_inventories as ta on ta.type_id = inventories.merk_id` +
                    warehouse_join_query +
                    customer_join_query +
                    ` where inventories.inventory_id is not null `;
                let params: any = [];
                let countData = 0;
                sql += ' AND inventories.inventory_id in (' + inventory_id + ')';
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        pool.query(sql, params, (err: Error, result: any) => {
                            pool.end(); // end connection
                            if (err)
                                resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    }
                    else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });
            return res;
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }

    async function addVariationInventory(data: any) {
        try {
            const variation_inventory = models.variation_inventory;
            const res = await variation_inventory.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateVariation(data: any) {
        try {
            const variation_inventory = models.variation_inventory;
            const res = await variation_inventory.update(data, { where: { variation_id: data.variation_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectVariation(data: any) {
        try {
            const variation_inventory = models.variation_inventory;
            const res = await variation_inventory.findOne({ where: { variation_id: data } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getListVariation(data: { inventory_id: string; customer_status: string; length: string; page: string; search: string }) {
        try {
            const pool = await conn();

            const { inventory_id, length, page, search } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    variation_inventories: 'variation_inventories.name',
                    variation_inventories_code: 'variation_inventories.code'
                };

                let sql = `SELECT * FROM variation_inventories where inventory_id is not null`;
                let params: any = [];

                let countData = 0;

                if (inventory_id) {
                    sql += ' AND variation_inventories.inventory_id = ?';
                    params = [...params, inventory_id];
                }
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                console.log(sql);
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        if (page != 'all') {
                            countData = result[0].total;
                            sql += ' LIMIT ? OFFSET ?';
                            params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];
                        }
                        console.log(sql, params);
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

    async function selectStock(data: { inventory_id: string; warehouse_id: string }) {
        try {
            const stock_warehouse = models.stock_warehouse;
            const res = await stock_warehouse.findOne({ where: { inventory_id: data.inventory_id, warehouse_id: data.warehouse_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function addStock(data: any) {
        try {
            const stock_warehouse = models.stock_warehouse;
            const history_stock = models.history_stock;
            const res = await stock_warehouse.create(data);
            const resHistoryStock = await history_stock.create({ ...data, stock_qty: data.stock_qty_history });
            console.log(resHistoryStock, 'resHistoryStock');
            return { data: resHistoryStock, status: true, errorMessage: null };
        } catch (e: any) {
            console.log(e);
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateStock(data: { stock_qty: number; inventory_id: string; warehouse_id: string; history_stock: any }) {
        try {
            const stock_warehouse = models.stock_warehouse;
            const history_stock = models.history_stock;
            const res = await stock_warehouse.update({ stock_qty: data.stock_qty }, { where: { inventory_id: data.inventory_id, warehouse_id: data.warehouse_id } });
            const resHistoryStock = await history_stock.create(data.history_stock);
            console.log(resHistoryStock, 'resHistoryStock');
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            console.log(e);
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function getOrdinalNumberHistory() {
        try {
            const history_stocks = models.history_stock;
            const res = await history_stocks.findOne({ order: [['ordinal_number', 'DESC']] });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectStockWarehouse(data: String) {
        try {
            const stock_warehouse = models.stock_warehouse;
            const res = await stock_warehouse.findAll({ where: { inventory_id: data }, include: ['warehouse'] });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function addPriceSellCustomer(data: any) {
        try {
            const price_sell_customer = models.price_sell_customer;
            const res = await price_sell_customer.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updatePriceSellCustomer(data: any) {
        try {
            const price_sell_customer = models.price_sell_customer;
            const res = await price_sell_customer.update({ price: data.price }, { where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function deletePriceSellCustomer(data: any) {
        try {
            const price_sell_customer = models.price_sell_customer;
            const res = await price_sell_customer.destroy({ where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function getPriceSellCustomer(data: any) {
        try {
            const pool = await conn();

            const { length, page, search, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name'
                };

                let sql: string = `SELECT price_sell_customers.price, price_sell_customers.customer_id, customers.customer_name, customers.customer_code FROM price_sell_customers left join customers on customers.customer_id = price_sell_customers.customer_id where price_sell_customers.inventory_id = ?`;
                let params: any = [inventory_id];

                let countData = 0;
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }

                // if (customer_id) {
                //     sql += ' AND price_sell_customers.customer_id = ' + customer_id;
                // }

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];

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

    async function getSellByInventory(data: any) {
        try {
            const pool = await conn();

            const { length, page, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                let sql: string = `SELECT sells.code, sell_items.qty as qty_inv, sell_items.amount as amount, sell_items.amount * sell_items.qty as total
                    FROM sell_items left join sells on sell_items.sell_id = sells.sell_id where sell_items.inventory_id = ?`;
                let params: any = [inventory_id];

                let countData = 0;

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];

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

    async function getStockFlow(data: any) {
        try {
            const pool = await conn();

            const { length, page, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                console.log(inventory_id);
                let sql: string = `SELECT history_stocks.code, warehouses.warehouse_name, history_stocks.date,history_stocks.stock_qty, history_stocks.qty_before, history_stocks.qty_after, history_stocks.type
                    FROM history_stocks left join warehouses on warehouses.warehouse_id = history_stocks.warehouse_id where history_stocks.inventory_id = ?`;
                let params: any = [inventory_id];

                sql += ' ORDER BY history_stocks.created_at DESC';

                let countData = 0;

                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];

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

    async function addInventoryNameCustomer(data: any) {
        try {
            const inventory_name_customer = models.inventory_name_customer;
            const res = await inventory_name_customer.create(data);
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function updateInventoryNameCustomer(data: any) {
        try {
            const inventory_name_customer = models.inventory_name_customer;
            const res = await inventory_name_customer.update({ inventory_name: data.inventory_name }, { where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function deleteInventoryNameCustomer(data: any) {
        try {
            const inventory_name_customer = models.inventory_name_customer;
            const res = await inventory_name_customer.destroy({ where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function getInventoryNameCustomer(data: any) {
        try {
            const pool = await conn();
            const { length, page, search, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name',
                    inventory_name: 'inventory_name_customers.inventory_name'
                };
                let sql = `SELECT inventory_name_customers.inventory_name, inventory_name_customers.customer_id, customers.customer_name, customers.customer_code FROM inventory_name_customers left join customers on customers.customer_id = inventory_name_customers.customer_id where inventory_name_customers.inventory_id = ?`;
                let params = [inventory_id];
                let countData = 0;
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];
                        pool.query(sql, params, (err: Error, res: any) => {
                            pool.end(); // end connection
                            if (err)
                                resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    }
                    else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });
            return res;
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }
    async function addInventoryNote(data: any) {
        try {
            const inventory_note = models.inventory_note;
            const res = await inventory_note.create(data);
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function getInventoryNote(data: any) {
        try {
            const pool = await conn();
            const { length, page, search, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {};
                let sql = `SELECT inventory_notes.note FROM inventory_notes where inventory_notes.inventory_id = ?`;
                let params = [inventory_id];
                let countData = 0;
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];
                        pool.query(sql, params, (err: Error, result: any) => {
                            pool.end(); // end connection
                            console.log(err);
                            if (err)
                                resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    }
                    else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });
            return res;
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }

    async function addPriceBuyCustomer(data: any) {
        try {
            const price_buy_customer = models.price_buy_customer;
            const res = await price_buy_customer.create(data);
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function updatePriceBuyCustomer(data: any) {
        try {
            const price_buy_customer = models.price_buy_customer;
            const res = await price_buy_customer.update({ price: data.price }, { where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function deletePriceBuyCustomer(data: any) {
        try {
            const price_buy_customer = models.price_buy_customer;
            const res = await price_buy_customer.destroy({ where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        }
        catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function getPriceBuyCustomer(data: any) {
        try {
            const pool = await conn();
            const { length, page, search, inventory_id } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    customer_name: 'customers.customer_name'
                };
                let sql = `SELECT price_buy_customers.price, price_buy_customers.customer_id, customers.customer_name, customers.customer_code FROM price_buy_customers left join customers on customers.customer_id = price_buy_customers.customer_id where price_buy_customers.inventory_id = ?`;
                let params = [inventory_id];
                let countData = 0;
                if (search) {
                    sql += ' AND (';
                    Object.keys(sortField).forEach((d, i) => {
                        sql += ` ${i > 0 ? ' OR ' : ''}lower(${sortField[d]}) like ?`;
                        params = [...params, `%${search.toLowerCase()}%`];
                    });
                    sql += ' )';
                }
                // if (customer_id) {
                //     sql += ' AND price_sell_customers.customer_id = ' + customer_id;
                // }
                pool.query(`SELECT count(*) as total from(${sql}) as dtCount`, params, (err: Error, result: any) => {
                    if (!err) {
                        countData = result[0].total;
                        sql += ' LIMIT ? OFFSET ?';
                        params = [...params, parseInt(length), (parseInt(page) - 1) * parseInt(length)];
                        pool.query(sql, params, (err: Error, result: any) => {
                            pool.end(); // end connection
                            console.log(err);
                            if (err)
                                resolve({ data: [], count: 0, status: false, errorMessage: err });
                            resolve({ data: res, count: countData, status: true, errorMessage: '' });
                        });
                    }
                    else {
                        resolve({ data: [], count: 0, status: false, errorMessage: err });
                    }
                });
            });
            return res;
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }
};

export default query;
