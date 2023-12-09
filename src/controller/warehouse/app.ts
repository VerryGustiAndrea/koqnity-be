import userUC from '../../use-cases/users/app';
import _ from '../../functions/app';
import warehouseAdd from './insert-warehouse';
import utilUC from '../../use-cases/utils/app';
import selectWarehouse from './select-warehouse';
import warehouseUC from '../../use-cases/warehouses/app';
import selectListWarehouse from './select-list-warehouse';
import warehouseUpdate from './update-warehouse';
// #####
const warehouseAdds = warehouseAdd(warehouseUC.addWarehouses, utilUC.insertLogs);
const selectWarehouses = selectWarehouse(warehouseUC.getWarehouses);
const selectListWarehouses = selectListWarehouse(warehouseUC.selectListWarehouses);
const warehouseUpdates = warehouseUpdate(warehouseUC.updateWarehouses, utilUC.insertLogs);
// #####
const warehouseController = {
    warehouseAdds,
    selectWarehouses,
    selectListWarehouses,
    warehouseUpdates
};

export default warehouseController;
