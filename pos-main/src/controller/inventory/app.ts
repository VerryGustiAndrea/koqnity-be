import _ from '../../functions/app';
import typeAdd from './insert-type';
import utilUC from '../../use-cases/utils/app';
import inventoryUC from '../../use-cases/inventories/app';
import selectType from './select-type';
import inventoryAdd from './add-inventory';
import selectListInventory from './select-list-inventory';
import selectListVariation from './select-list-variation';
import selectInventory from './select-inventory';
import updateInventory from './update-inventory';
import updateVariation from './update-variation';
import insertVariation from './insert-variation';
import updateStock from './update-stock';
import selectStockWarehouse from './select-stock-warehouse';
// #####
const typeAdds = typeAdd(inventoryUC.addTypes, utilUC.insertLogs);
const selectTypes = selectType(inventoryUC.selectTypes);
const inventoryAdds = inventoryAdd(inventoryUC.addInventorys, utilUC.insertLogs);
const selectListInventorys = selectListInventory(inventoryUC.selectListInventorys);
const selectListVariations = selectListVariation(inventoryUC.selectListVariations);
const selectInventorys = selectInventory(inventoryUC.selectInventorys, utilUC.insertLogs);
const updateInventorys = updateInventory(inventoryUC.updateInventorys, utilUC.insertLogs);
const updateVariations = updateVariation(inventoryUC.updateVariations, utilUC.insertLogs);
const insertVariations = insertVariation(inventoryUC.addVariationInventorys, utilUC.insertLogs);
const updateStocks = updateStock(inventoryUC.updateStocks, utilUC.insertLogs);
const selectStockWarehouses = selectStockWarehouse(inventoryUC.selectStockWarehouses);

// #####
const inventoryController = {
    typeAdds,
    selectTypes,
    inventoryAdds,
    selectListInventorys,
    selectListVariations,
    selectInventorys,
    updateInventorys,
    updateVariations,
    insertVariations,
    updateStocks,
    selectStockWarehouses
};

export default inventoryController;
