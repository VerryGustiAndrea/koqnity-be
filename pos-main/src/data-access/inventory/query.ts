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
        selectStockWarehouse
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

    async function selectInventory(data: String) {
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

    async function getListInventory(data: { length: string; page: string; search: string; category: string; merk: string; warehouse: string }) {
        try {
            const pool = await conn();

            const { length, page, search, category, merk, warehouse } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    inventory_name: 'inventories.name',
                    inventory_code: 'inventories.code',
                    category_name: 'ts.name',
                    merk_name: 'ta.name'
                };
                let warehouse_query: string = '';
                let warehouse_join_query: string = '';

                if (warehouse) {
                    warehouse_query = `, stock_warehouses.stock_qty as stock_qty`;
                    warehouse_join_query =
                        ` left join (SELECT stock_qty, inventory_id FROM stock_warehouses WHERE warehouse_id="` +
                        warehouse +
                        `") as stock_warehouses on stock_warehouses.inventory_id = inventories.inventory_id `;
                }

                let sql: string =
                    `SELECT inventories.inventory_id, inventories.price, inventories.code as code_inventory, inventories.name as name_inventory, ts.name as category_name, ta.name as merk_name` +
                    warehouse_query +
                    ` FROM inventories join type_inventories as ts on ts.type_id = inventories.category_id join type_inventories as ta on ta.type_id = inventories.merk_id` +
                    warehouse_join_query +
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
                // if (warehouse) {
                //     sql += ' AND stock_warehouses.warehouse_id = "' + warehouse + '"';
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
            const price_sell_customer = models.price_sell_customer;
            const res = await price_sell_customer.destroy({ where: { inventory_id: data.inventory_id, customer_id: data.customer_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
