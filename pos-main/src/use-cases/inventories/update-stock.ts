const updateStock = (gHistoryID: Function, inventoryDB: any) => {
    return async function post(info: any) {
        let data = {
            history_id: gHistoryID(),
            warehouse_id: info.warehouse_id,
            inventory_id: info.inventory_id,
            date: info.date,
            sell_id: null,
            buy_id: null,
            type: parseInt(info.stock_qty) > 0 ? 'add' : 'min',
            stock_qty: info.stock_qty,
            qty_before: 0,
            qty_after: 0,
            price: 0,
            code: '',
            ordinal_number: 0,
            created_at: new Date(),
            update_at: new Date()
        };
        const ordinalNumber = await inventoryDB.getOrdinalNumberHistory();
        const warehouseInfo = await inventoryDB.selectStock(data);
        const inventoryInfo = await inventoryDB.selectInventory(data.inventory_id);
        data.price = inventoryInfo.data.capital_price;
        data.code = 'P/';
        let ordinal_number = 0;
        if (ordinalNumber.data) {
            ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
            data.code = data.code + String(ordinal_number).padStart(4, '0');
        } else {
            ordinal_number = 1;
            data.code = data.code + String(1).padStart(4, '0');
        }
        if (warehouseInfo.data) {
            let dataWarehouse = warehouseInfo.data;
            data.qty_before = dataWarehouse.stock_qty;
            data.qty_after = dataWarehouse.stock_qty + parseInt(data.stock_qty);
        } else {
            data.qty_before = 0;
            data.qty_after = parseInt(data.stock_qty);
        }
        if (data.type == 'min') {
            data.stock_qty = -1 * parseInt(data.stock_qty);
        }
        data.ordinal_number = ordinal_number;
        console.log(data);
        let updateStock;
        if (warehouseInfo.data) {
            updateStock = await inventoryDB.updateStock({ stock_qty: data.qty_after, inventory_id: data.inventory_id, warehouse_id: data.warehouse_id, history_stock: { ...data } });
        } else {
            updateStock = await inventoryDB.addStock({ ...data, stock_qty_history: data.stock_qty });
        }

        if (updateStock) {
            return { history: updateStock };
        } else {
            throw new Error('updateStock.errorMessage');
        }
    };
};

export default updateStock;
