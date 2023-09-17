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
    selectStockFlows
};

export default inventoryController;
