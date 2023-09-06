import userUC from '../../use-cases/users/app';
import _ from '../../functions/app';
import warehouseAdd from './insert-warehouse';
import utilUC from '../../use-cases/utils/app';
import selectWarehouse from './select-warehouse';
import warehouseUC from '../../use-cases/warehouses/app';
import selectListWarehouse from './select-list-warehouse';
// #####
const warehouseAdds = warehouseAdd(userUC.addUsers, utilUC.insertLogs);
const selectWarehouses = selectWarehouse(warehouseUC.getWarehouses);
const selectListWarehouses = selectListWarehouse(warehouseUC.selectListWarehouses);
// #####
const warehouseController = {
    warehouseAdds,
    selectWarehouses,
    selectListWarehouses
};

export default warehouseController;
