"use strict";

const updateSell = (makeItem: Function, sellDB: any, inventoryDB: any, customerDB: any) => {
    return async function post(info: any) {
        console.log("masuk")
        let data = {
            sell_id: info.sell_id,
            pay_type: info.pay_type,
            end_pay_date: info.end_pay_date,
            send_date: info.send_date,
            date_invoice: info.date_invoice,
            warehouse_id: info.warehouse_id,
            customer_id: info.customer_id,
            reference_number: info.reference_number,
            tax: 0,
            amount: 0,
            total: 0,
            update_at: new Date()
        };
        let dataSellItem = [];
        const resGetSellItem = await sellDB.getSellItem(info.sell_id);
        for (let i = 0; i < resGetSellItem.data.length; i++) {
            const e = resGetSellItem.data[i];
            dataSellItem.push(e);
        }
        let items: any = [];
        for (let i = 0; i < info.item.length; i++) {
            let itemData = info.item[i];
            console.log("kesini gak ya")
            if (itemData.action == 'pass') {
                let sellItemOldData = dataSellItem.find((item) => {
                    return item.item_id === itemData.item_id;
                });
                if (sellItemOldData.qty == itemData.qty) {
                    let dataItem = {
                        qty: itemData.qty,
                        item_id: sellItemOldData.item_id,
                        warehouse_id: data.warehouse_id,
                        date: data.date_invoice,
                        sell_id: data.sell_id,
                        price: itemData.price,
                        ordinal_number: 0,
                        tax: itemData.tax,
                        tax_name: itemData.tax,
                        amount: 0,
                        total: 0
                    };
                    dataItem.amount = dataItem.price * dataItem.qty;
                    dataItem.total = dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                    data.tax += (dataItem.amount * dataItem.tax) / 100;
                    data.amount += dataItem.price * dataItem.qty;
                    data.total += dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                    let sellAction = await sellDB.updateItem(dataItem);
                }
                else {
                    let dataItem = await makeItem(info.item[i]); // entity
                    dataItem = {
                        history_id: dataItem.gHistory(),
                        inventory_id: dataItem.getInventoryID(),
                        qty: dataItem.getQTY(),
                        item_id: sellItemOldData.item_id,
                        warehouse_id: data.warehouse_id,
                        date: data.date_invoice,
                        sell_id: data.sell_id,
                        stock_qty: 0,
                        qty_before: 0,
                        qty_after: 0,
                        price: dataItem.getPrice(),
                        code: '',
                        ordinal_number: 0,
                        tax: dataItem.getTax(),
                        tax_name: dataItem.getTaxName(),
                        amount: 0,
                        total: 0,
                        type: '',
                        warehouseInfo: null,
                        created_at: new Date(),
                        update_at: new Date()
                    };
                    if (sellItemOldData.qty > dataItem.qty) {
                        dataItem.type = 'add';
                        dataItem.stock_qty = sellItemOldData.qty - dataItem.qty;
                        let warehouseInfo = await inventoryDB.selectStock({ inventory_id: dataItem.inventory_id, warehouse_id: data.warehouse_id });
                        dataItem.warehouseInfo = warehouseInfo.data;
                        const ordinalNumberItem = await inventoryDB.getOrdinalNumberHistory();
                        dataItem.code = 'P/';
                        let ordinal_number_item = 0;
                        if (ordinalNumberItem.data) {
                            ordinal_number_item = parseInt(ordinalNumberItem.data.ordinal_number) + 1;
                            dataItem.code = dataItem.code + String(ordinal_number_item).padStart(4, '0');
                        }
                        else {
                            ordinal_number_item = 1;
                            dataItem.code = dataItem.code + String(1).padStart(4, '0');
                        }
                        dataItem.ordinal_number = ordinal_number_item;
                        if (warehouseInfo.data) {
                            let dataWarehouse = warehouseInfo.data;
                            dataItem.qty_before = dataWarehouse.stock_qty;
                            dataItem.qty_after = dataWarehouse.stock_qty + sellItemOldData.qty - dataItem.qty;
                        }
                        else {
                            dataItem.qty_before = 0;
                            dataItem.qty_after = sellItemOldData.qty - dataItem.qty;
                        }
                        dataItem.amount = dataItem.price * dataItem.qty;
                        dataItem.total = dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                        data.tax += (dataItem.amount * dataItem.tax) / 100;
                        data.amount += dataItem.price * dataItem.qty;
                        data.total += dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                        let updateStock;
                        if (warehouseInfo.data) {
                            updateStock = await inventoryDB.updateStock({
                                stock_qty: dataItem.qty_after,
                                inventory_id: dataItem.inventory_id,
                                warehouse_id: dataItem.warehouse_id,
                                history_stock: Object.assign({}, dataItem)
                            });
                        }
                        else {
                            updateStock = await inventoryDB.addStock(Object.assign(Object.assign({}, dataItem), { stock_qty: dataItem.qty_after, stock_qty_history: dataItem.stock_qty }));
                        }
                        let sellAction = await sellDB.updateItem(dataItem);
                    }
                    else {
                        dataItem.type = 'min';
                        dataItem.stock_qty = dataItem.qty - sellItemOldData.qty;
                        let warehouseInfo = await inventoryDB.selectStock({ inventory_id: dataItem.inventory_id, warehouse_id: data.warehouse_id });
                        dataItem.warehouseInfo = warehouseInfo.data;
                        const ordinalNumberItem = await inventoryDB.getOrdinalNumberHistory();
                        dataItem.code = 'P/';
                        let ordinal_number_item = 0;
                        if (ordinalNumberItem.data) {
                            ordinal_number_item = parseInt(ordinalNumberItem.data.ordinal_number) + 1;
                            dataItem.code = dataItem.code + String(ordinal_number_item).padStart(4, '0');
                        }
                        else {
                            ordinal_number_item = 1;
                            dataItem.code = dataItem.code + String(1).padStart(4, '0');
                        }
                        dataItem.ordinal_number = ordinal_number_item;
                        if (warehouseInfo.data) {
                            let dataWarehouse = warehouseInfo.data;
                            dataItem.qty_before = dataWarehouse.stock_qty;
                            dataItem.qty_after = dataWarehouse.stock_qty - (dataItem.qty - sellItemOldData.qty);
                        }
                        else {
                            dataItem.qty_before = 0;
                            dataItem.qty_after = -1 * (dataItem.qty - sellItemOldData.qty);
                        }
                        dataItem.amount = dataItem.price * dataItem.qty;
                        dataItem.total = dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                        data.tax += (dataItem.amount * dataItem.tax) / 100;
                        data.amount += dataItem.price * dataItem.qty;
                        data.total += dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                        let updateStock;
                        if (warehouseInfo.data) {
                            updateStock = await inventoryDB.updateStock({
                                stock_qty: dataItem.qty_after,
                                inventory_id: dataItem.inventory_id,
                                warehouse_id: dataItem.warehouse_id,
                                history_stock: Object.assign({}, dataItem)
                            });
                        }
                        else {
                            updateStock = await inventoryDB.addStock(Object.assign(Object.assign({}, dataItem), { stock_qty: dataItem.qty_after, stock_qty_history: dataItem.stock_qty }));
                        }
                        let sellAction = await sellDB.updateItem(dataItem);
                    }
                }
            }
            else if (itemData.action == 'add') {
                let dataItem = await makeItem(info.item[i]); // entity
                dataItem = {
                    history_id: dataItem.gHistory(),
                    inventory_id: dataItem.getInventoryID(),
                    qty: dataItem.getQTY(),
                    item_id: dataItem.getItemID(),
                    warehouse_id: data.warehouse_id,
                    date: data.date_invoice,
                    sell_id: data.sell_id,
                    stock_qty: dataItem.getQTY(),
                    price: dataItem.getPrice(),
                    qty_before: 0,
                    qty_after: 0,
                    code: '',
                    ordinal_number: 0,
                    tax: dataItem.getTax(),
                    tax_name: dataItem.getTaxName(),
                    amount: 0,
                    total: 0,
                    type: 'min',
                    warehouseInfo: null,
                    created_at: new Date(),
                    update_at: new Date()
                };
                let itemData = await inventoryDB.selectInventorySell({ inventory_id: dataItem.inventory_id, customer_id: data.customer_id });
                let warehouseInfo = await inventoryDB.selectStock({ inventory_id: dataItem.inventory_id, warehouse_id: data.warehouse_id });
                dataItem.warehouseInfo = warehouseInfo.data;
                const ordinalNumberItem = await inventoryDB.getOrdinalNumberHistory();
                dataItem.code = 'P/';
                let ordinal_number_item = 0;
                if (ordinalNumberItem.data) {
                    ordinal_number_item = parseInt(ordinalNumberItem.data.ordinal_number) + 1;
                    dataItem.code = dataItem.code + String(ordinal_number_item).padStart(4, '0');
                }
                else {
                    ordinal_number_item = 1;
                    dataItem.code = dataItem.code + String(1).padStart(4, '0');
                }
                dataItem.ordinal_number = ordinal_number_item;
                if (warehouseInfo.data) {
                    let dataWarehouse = warehouseInfo.data;
                    dataItem.qty_before = dataWarehouse.stock_qty;
                    dataItem.qty_after = dataWarehouse.stock_qty - parseInt(dataItem.stock_qty);
                }
                else {
                    dataItem.qty_before = 0;
                    dataItem.qty_after = -1 * parseInt(dataItem.stock_qty);
                }
                dataItem.amount = dataItem.price * dataItem.qty;
                dataItem.total = dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                data.tax += (dataItem.amount * dataItem.tax) / 100;
                data.amount += dataItem.price * dataItem.qty;
                data.total += dataItem.amount + (dataItem.amount * dataItem.tax) / 100;
                let updateStock;
                if (warehouseInfo.data) {
                    updateStock = await inventoryDB.updateStock({
                        stock_qty: dataItem.qty_after,
                        inventory_id: dataItem.inventory_id,
                        warehouse_id: dataItem.warehouse_id,
                        history_stock: Object.assign({}, dataItem)
                    });
                }
                else {
                    updateStock = await inventoryDB.addStock(Object.assign(Object.assign({}, dataItem), { stock_qty: dataItem.qty_after, stock_qty_history: dataItem.stock_qty }));
                }
                let sellAction = await sellDB.addItem(dataItem);
            }
            else if (itemData.action == 'delete') {
                let sellItemOldData = dataSellItem.find((item) => {
                    return item.item_id === itemData.item_id;
                });
                let dataItem = await makeItem(info.item[i]); // entity
                dataItem = {
                    qty: dataItem.getQTY(),
                    item_id: sellItemOldData.item_id,
                    warehouse_id: data.warehouse_id,
                    date: data.date_invoice,
                    sell_id: data.sell_id,
                    stock_qty: 0,
                    qty_before: 0,
                    qty_after: 0,
                    price: dataItem.getPrice(),
                    code: '',
                    ordinal_number: 0,
                    type: '',
                    warehouseInfo: null,
                    created_at: new Date(),
                    update_at: new Date()
                };
                dataItem.type = 'add';
                dataItem.stock_qty = sellItemOldData.qty - itemData.qty;
                let warehouseInfo = await inventoryDB.selectStock({ inventory_id: dataItem.inventory_id, warehouse_id: data.warehouse_id });
                dataItem.warehouseInfo = warehouseInfo.data;
                const ordinalNumberItem = await inventoryDB.getOrdinalNumberHistory();
                dataItem.code = 'P/';
                let ordinal_number_item = 0;
                if (ordinalNumberItem.data) {
                    ordinal_number_item = parseInt(ordinalNumberItem.data.ordinal_number) + 1;
                    dataItem.code = dataItem.code + String(ordinal_number_item).padStart(4, '0');
                }
                else {
                    ordinal_number_item = 1;
                    dataItem.code = dataItem.code + String(1).padStart(4, '0');
                }
                dataItem.ordinal_number = ordinal_number_item;
                if (warehouseInfo.data) {
                    let dataWarehouse = warehouseInfo.data;
                    dataItem.qty_before = dataWarehouse.stock_qty;
                    dataItem.qty_after = dataWarehouse.stock_qty + sellItemOldData.qty;
                    let updateStock = await inventoryDB.updateStock({
                        stock_qty: dataItem.qty_after,
                        inventory_id: dataItem.inventory_id,
                        warehouse_id: dataItem.warehouse_id,
                        history_stock: Object.assign({}, dataItem)
                    });
                }
                else {
                    dataItem.qty_before = 0;
                    dataItem.qty_after = sellItemOldData.qty;
                    let updateStock = await inventoryDB.updateStock({
                        stock_qty: dataItem.qty_after,
                        inventory_id: dataItem.inventory_id,
                        warehouse_id: dataItem.warehouse_id,
                        history_stock: Object.assign({}, dataItem)
                    });

                }
                let sellAction = await sellDB.deleteItem(dataItem);
            }
        }
        const insertSell = await sellDB.updateSell(data);
        if (insertSell.status) {
            for (let i = 0; i < items.length; i++) {
                let sellAction = await sellDB.addItem(items[i]);
            }
        }
        if (insertSell) {
            return { sell_id: 'data.sell_id' };
        }
        else {
            throw new Error(insertSell.errorMessage);
        }
    };
};
export default updateSell;
