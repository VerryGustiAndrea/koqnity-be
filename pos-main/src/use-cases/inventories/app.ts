import entity from '../../entities/inventory/app';
import _ from '../../functions/app';
import addType from './insert-type';
import inventoryDB from '../../data-access/inventory/app';
import selectType from './select-type';
import addInventory from './insert-inventory';
import selectListInventory from './select-list-inventory';
import selectListVariation from './select-list-variation';
import selectInventory from './select-inventory';
import updateInventory from './update-inventory';
import updateVariation from './update-variation';
import addVariationInventory from './insert-variation-inventory';
import updateStock from './update-stock';
import selectStockWarehouse from './select-stock-warehouse';

const addTypes = addType(entity.makeTypes, inventoryDB);
const addInventorys = addInventory(entity.makeInventorys, entity.makeVariations, inventoryDB);
const selectTypes = selectType(inventoryDB);
const selectListInventorys = selectListInventory(inventoryDB);
const selectListVariations = selectListVariation(inventoryDB);
const selectInventorys = selectInventory(inventoryDB);
const updateInventorys = updateInventory(inventoryDB);
const updateVariations = updateVariation(inventoryDB);
const addVariationInventorys = addVariationInventory(entity.makeVariations, inventoryDB);
const updateStocks = updateStock(_.gHistoryId, inventoryDB);
const selectStockWarehouses = selectStockWarehouse(inventoryDB);

// inventory use case
const sellUC = {
    addTypes,
    selectTypes,
    addInventorys,
    selectListInventorys,
    selectListVariations,
    selectInventorys,
    updateInventorys,
    updateVariations,
    addVariationInventorys,
    updateStocks,
    selectStockWarehouses
};

export default sellUC;
