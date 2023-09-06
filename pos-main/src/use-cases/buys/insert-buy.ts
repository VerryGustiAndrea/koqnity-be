const addBuy = (makeBuy: Function, makeItem: Function, buyDB: any, inventoryDB: any, customerDB: any) => {
    return async function post(info: any) {
        let data = await makeBuy(info); // entity

        data = {
            vendor_id: data.getVendorId(),
            invoice_number: data.getInvoiceNumber(),
            pay_type: data.getPayType(),
            end_pay_date: data.getEndPayType(),
            send_date: data.getSendDate(),
            date_invoice: data.getDateInvoice(),
            buy_id: data.getBuyID(),
            ordinal_number: 0,
            code: '',
            tax: 0,
            status: 'Belum Dibayar',
            amount: 0,
            total: 0,
            created_at: new Date(),
            update_at: new Date()
        };

        const ordinalNumber = await buyDB.getOrdinalNumber(data);

        if (ordinalNumber.data) {
            data.ordinal_number = parseInt(ordinalNumber.data.ordinal_number) + 1;
            data.code = '#A' + String(data.ordinal_number).padStart(5, '0');
        } else {
            data.ordinal_number = 1;
            data.code = '#A' + String(1).padStart(5, '0');
        }
        let items: Array<[]> = [];
        for (let i = 0; i < info.item.length; i++) {
            let dataItem = await makeItem(info.item[i]); // entity
            dataItem = {
                history_id: dataItem.gHistory(),
                inventory_id: dataItem.getInventoryID(),
                qty: dataItem.getQTY(),
                item_id: dataItem.getItemID(),
                warehouse_id: dataItem.getWarehouseID(),
                date: data.date_invoice,
                buy_id: data.buy_id,
                stock_qty: dataItem.getQTY(),
                qty_before: 0,
                qty_after: 0,
                price: dataItem.getPrice(),
                code: '',
                ordinal_number: 0,
                tax: dataItem.getTax(),
                tax_name: dataItem.getTaxName(),
                amount: 0,
                total: 0,
                type: 'add',
                warehouseInfo: null,
                created_at: new Date(),
                update_at: new Date()
            };
            let itemData = await inventoryDB.selectInventory(dataItem.inventory_id);
            let warehouseInfo = await inventoryDB.selectStock({ inventory_id: dataItem.inventory_id, warehouse_id: dataItem.warehouse_id });
            dataItem.warehouseInfo = warehouseInfo.data;
            const ordinalNumberItem = await inventoryDB.getOrdinalNumberHistory();
            dataItem.code = 'P/';
            let ordinal_number_item = 0;
            if (ordinalNumberItem.data) {
                ordinal_number_item = parseInt(ordinalNumberItem.data.ordinal_number) + 1;
                dataItem.code = dataItem.code + String(ordinal_number_item).padStart(4, '0');
            } else {
                ordinal_number_item = 1;
                dataItem.code = dataItem.code + String(1).padStart(4, '0');
            }
            dataItem.ordinal_number = ordinal_number_item;

            if (warehouseInfo.data) {
                let dataWarehouse = warehouseInfo.data;
                dataItem.qty_before = dataWarehouse.stock_qty;
                dataItem.qty_after = dataWarehouse.stock_qty + parseInt(dataItem.stock_qty);
            } else {
                dataItem.qty_before = 0;
                dataItem.qty_after = parseInt(dataItem.stock_qty);
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
                    history_stock: { ...dataItem }
                });
            } else {
                updateStock = await inventoryDB.addStock({ ...dataItem, stock_qty: dataItem.qty_after, stock_qty_history: dataItem.stock_qty });
            }
            items = [...items].concat(dataItem);
        }
        const insertBuy = await buyDB.addBuy(data);
        if (insertBuy.status) {
            for (let i = 0; i < items.length; i++) {
                let sellAction = await buyDB.addItem(items[i]);
                console.log(sellAction);
            }
        }

        if (insertBuy) {
            return { buy_id: data.buy_id };
        } else {
            throw new Error(insertBuy.errorMessage);
        }
    };
};

export default addBuy;