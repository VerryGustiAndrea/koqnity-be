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
import addPriceSellCustomer from './insert-price-sell-customer';
import updatePriceSellCustomer from './update-price-sell-customer';
import deletePriceSellCustomer from './delete-price-sell-customer';
import selectPriceSellCustomer from './select-price-sell-customer';
import selectSellByInventory from './select-sell-by-inventory';
import selectStockFlow from './select-stock-flow';
import selectListInventoryBuy from './select-list-inventory-buy';
import selectListSelectedInventory from './select-list-selected-inventory';
import addInventoryNameCustomer from './insert-inventory-name-customer';
import updateInventoryNameCustomer from './update-inventory-name-customer';
import deleteInventoryNameCustomer from './delete-inventory-name-customer';
import selectInventoryNameCustomer from './select-inventory-name-customer';
import addInventoryNote from './insert-inventory-note';
import selectInventoryNote from './select-inventory-note';
import addPriceBuyCustomer from './insert-price-buy-customer';
import updatePriceBuyCustomer from './update-price-buy-customer';
import deletePriceBuyCustomer from './delete-price-buy-customer';
import selectPriceBuyCustomer from './select-price-buy-customer';
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
const addPriceSellCustomers = addPriceSellCustomer(inventoryUC.insertPriceSellCustomers, utilUC.insertLogs);
const updatePriceSellCustomers = updatePriceSellCustomer(inventoryUC.updatePriceSellCustomers, utilUC.insertLogs);
const deletePriceSellCustomers = deletePriceSellCustomer(inventoryUC.deletePriceSellCustomers, utilUC.insertLogs);
const selectPriceSellCustomers = selectPriceSellCustomer(inventoryUC.selectPriceSellCustomers);
const selectSellByInventorys = selectSellByInventory(inventoryUC.selectSellByInventorys);
const selectStockFlows = selectStockFlow(inventoryUC.selectStockFlows);
const selectListInventoryBuys = selectListInventoryBuy(inventoryUC.selectListInventoryBuys);
const selectListSelectedInventorys = selectListSelectedInventory(inventoryUC.selectListSelectedInventorys);
const addInventoryNameCustomers = addInventoryNameCustomer(inventoryUC.insertInventoryNameCustomers, utilUC.insertLogs);
const updateInventoryNameCustomers = updateInventoryNameCustomer(inventoryUC.updateInventoryNameCustomers, utilUC.insertLogs);
const deleteInventoryNameCustomers = deleteInventoryNameCustomer(inventoryUC.deleteInventoryNameCustomers, utilUC.insertLogs);
const selectInventoryNameCustomers = selectInventoryNameCustomer(inventoryUC.selectInventoryNameCustomers);
const addInventoryNotes = addInventoryNote(inventoryUC.insertInventoryNotes, utilUC.insertLogs);
const selectInventoryNotes = selectInventoryNote(inventoryUC.selectInventoryNotes);
const addPriceBuyCustomers = addPriceBuyCustomer(inventoryUC.insertPriceBuyCustomers, utilUC.insertLogs);
const updatePriceBuyCustomers = updatePriceBuyCustomer(inventoryUC.updatePriceBuyCustomers, utilUC.insertLogs);
const deletePriceBuyCustomers = deletePriceBuyCustomer(inventoryUC.deletePriceBuyCustomers, utilUC.insertLogs);
const selectPriceBuyCustomers = selectPriceBuyCustomer(inventoryUC.selectPriceBuyCustomers);

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
    selectStockWarehouses,
    addPriceSellCustomers,
    updatePriceSellCustomers,
    deletePriceSellCustomers,
    selectPriceSellCustomers,
    selectSellByInventorys,
    selectStockFlows,
    selectListInventoryBuys,
    selectListSelectedInventorys,
    addInventoryNameCustomers,
    updateInventoryNameCustomers,
    deleteInventoryNameCustomers,
    selectInventoryNameCustomers,
    addInventoryNotes,
    selectInventoryNotes,
    addPriceBuyCustomers,
    updatePriceBuyCustomers,
    deletePriceBuyCustomers,
    selectPriceBuyCustomers
};

export default inventoryController;
