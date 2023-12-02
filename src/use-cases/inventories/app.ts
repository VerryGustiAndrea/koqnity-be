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
import insertPriceSellCustomer from './insert-price-sell-customer';
import updatePriceSellCustomer from './update-price-sell-customer';
import deletePriceSellCustomer from './update-variation';
import selectPriceSellCustomer from './select-price-sell-customer';
import selectSellByInventory from './select-sell_by_inventory';
import selectStockFlow from './select-stock-flow';
import selectListInventoryBuy from './select-list-inventory-buy';
import selectListSelectedInventory from './select-list-selected-inventory';
import insertInventoryNameCustomer from './insert-inventory-name-customer';
import updateInventoryNameCustomer from './update-inventory-name-customer';
import deleteInventoryNameCustomer from './delete-inventory-name-customer';
import selectInventoryNameCustomer from './select-inventory-name-customer';
import insertInventoryNote from './insert-inventory-note';
import selectInventoryNote from './select-inventory-note';
import insertPriceBuyCustomer from './insert-price-buy-customer';
import updatePriceBuyCustomer from './update-price-buy-customer';
import deletePriceBuyCustomer from './delete-price-buy-customer';
import selectPriceBuyCustomer from './select-price-buy-customer';

const addTypes = addType(entity.makeTypes, inventoryDB);
const addInventorys = addInventory(entity.makeInventorys, entity.makeVariations, inventoryDB);
const selectTypes = selectType(inventoryDB);
const selectListInventorys = selectListInventory(inventoryDB);
const selectListInventoryBuys = selectListInventoryBuy(inventoryDB);
const selectListSelectedInventorys = selectListSelectedInventory(inventoryDB);
const selectListVariations = selectListVariation(inventoryDB);
const selectInventorys = selectInventory(inventoryDB);
const updateInventorys = updateInventory(inventoryDB);
const updateVariations = updateVariation(inventoryDB);
const addVariationInventorys = addVariationInventory(entity.makeVariations, inventoryDB);
const updateStocks = updateStock(_.gHistoryId, inventoryDB);
const selectStockWarehouses = selectStockWarehouse(inventoryDB);
const insertPriceSellCustomers = insertPriceSellCustomer(entity.makePriceSellCustomers, inventoryDB);
const updatePriceSellCustomers = updatePriceSellCustomer(inventoryDB);
const deletePriceSellCustomers = deletePriceSellCustomer(inventoryDB);
const selectPriceSellCustomers = selectPriceSellCustomer(inventoryDB);
const selectSellByInventorys = selectSellByInventory(inventoryDB);
const selectStockFlows = selectStockFlow(inventoryDB);
const insertInventoryNameCustomers = insertInventoryNameCustomer(entity.makeInventoryNameCustomers, inventoryDB);
const updateInventoryNameCustomers = updateInventoryNameCustomer(inventoryDB);
const deleteInventoryNameCustomers = deleteInventoryNameCustomer(inventoryDB);
const selectInventoryNameCustomers = selectInventoryNameCustomer(inventoryDB);
const insertInventoryNotes = insertInventoryNote(entity.makeInventoryNotes, inventoryDB);
const selectInventoryNotes = selectInventoryNote(inventoryDB);
const insertPriceBuyCustomers = insertPriceBuyCustomer(entity.makePriceSellCustomers, inventoryDB);
const updatePriceBuyCustomers = updatePriceBuyCustomer(inventoryDB);
const deletePriceBuyCustomers = deletePriceBuyCustomer(inventoryDB);
const selectPriceBuyCustomers = selectPriceBuyCustomer(inventoryDB);

// inventory use case
const sellUC = {
    addTypes,
    selectTypes,
    addInventorys,
    selectListInventorys,
    selectListInventoryBuys,
    selectListVariations,
    selectInventorys,
    updateInventorys,
    updateVariations,
    addVariationInventorys,
    updateStocks,
    selectStockWarehouses,
    insertPriceSellCustomers,
    updatePriceSellCustomers,
    deletePriceSellCustomers,
    selectPriceSellCustomers,
    selectSellByInventorys,
    selectStockFlows,
    selectListSelectedInventorys,
    insertInventoryNameCustomers,
    updateInventoryNameCustomers,
    deleteInventoryNameCustomers,
    selectInventoryNameCustomers,
    insertInventoryNotes,
    selectInventoryNotes,
    insertPriceBuyCustomers,
    updatePriceBuyCustomers,
    deletePriceBuyCustomers,
    selectPriceBuyCustomers
};

export default sellUC;
