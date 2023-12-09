import sequelize from 'sequelize';

const { Op } = require('sequelize');

const query = (conn: any, models: any) => {
    return Object.freeze({
        addWarehouse,
        selectWarehouse,
        updateWarehouse,
        getListWarehouse
    });

    async function addWarehouse(data: any) {
        try {
            const warehouse = models.warehouse;
            const res = await warehouse.create(data);
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }

    async function selectWarehouse(data: any) {
        try {
            const warehouse = models.warehouse;
            const res = await warehouse.findAll();
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
    async function getListWarehouse(data: any) {
        try {
            const pool = await conn();

            const { length, page, search, sort_by, sort_type } = data; // deconstruct
            const res = await new Promise((resolve) => {
                const sortField: any = {
                    warehouse_id: 'warehouses.warehouse_id',
                    warehouse_name: 'warehouses.warehouse_name'
                };

                let sql = `SELECT * FROM warehouses where warehouses.warehouse_id is not null `;
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

    async function updateWarehouse(data: any) {
        try {
            console.log(data);
            const warehouse = models.warehouse;
            const res = await warehouse.update(data, { where: { warehouse_id: data.warehouse_id } });
            return { data: res, status: true, errorMessage: null };
        } catch (e: any) {
            return { data: null, status: false, errorMessage: e?.original?.sqlMessage ? e?.original?.sqlMessage : e };
        }
    }
};

export default query;
