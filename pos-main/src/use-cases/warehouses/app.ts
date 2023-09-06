import customerDB from '../../data-access/customers/app';
import inventoryDB from '../../data-access/inventory/app';
import sellDB from '../../data-access/sells/app';
import warehouseDB from '../../data-access/warehouses/app';
import entity from '../../entities/sells/app';
import _ from '../../functions/app';
import selectListWarehouse from './select-list-warehouse';
import getWarehouse from './select-warehouse';

const getWarehouses = getWarehouse(warehouseDB);
const selectListWarehouses = selectListWarehouse(warehouseDB);

// inventory use case
const warehouseUC = {
    getWarehouses,
    selectListWarehouses
};

export default warehouseUC;
