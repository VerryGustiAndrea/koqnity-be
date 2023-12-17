import customerDB from '../../data-access/customers/app';
import inventoryDB from '../../data-access/inventory/app';
import sellDB from '../../data-access/sells/app';
import warehouseDB from '../../data-access/warehouses/app';
import entity from '../../entities/inventory/app';
import _ from '../../functions/app';
import addWarehouse from './insert-warehouse';
import selectListWarehouse from './select-list-warehouse';
import selectWarehouse from './select-warehouse';
import getWarehouse from './select-warehouse';
import updateWarehouse from './update-warehouse';

const getWarehouses = getWarehouse(warehouseDB);
const selectListWarehouses = selectListWarehouse(warehouseDB);
const selectWarehouses = selectWarehouse(warehouseDB);
const addWarehouses = addWarehouse(entity.makeWarehouses, warehouseDB);
const updateWarehouses = updateWarehouse(warehouseDB);

// inventory use case
const warehouseUC = {
    getWarehouses,
    selectListWarehouses,
    selectWarehouses,
    addWarehouses,
    updateWarehouses
};

export default warehouseUC;
