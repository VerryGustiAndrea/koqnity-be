import inventoryController from '../../controller/inventory/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/type', validateAuth, makeExpressCallback(inventoryController.selectTypes));
    router.get('/list', validateAuth, makeExpressCallback(inventoryController.selectListInventorys));
    router.get('/list/buy', validateAuth, makeExpressCallback(inventoryController.selectListInventoryBuys));
    router.get('/variation', validateAuth, makeExpressCallback(inventoryController.selectListVariations));
    router.get('/', makeExpressCallback(inventoryController.selectInventorys));
    router.get('/stock', makeExpressCallback(inventoryController.selectStockWarehouses));
    router.get('/flow/stock', makeExpressCallback(inventoryController.selectStockFlows));
    router.get('/sell', makeExpressCallback(inventoryController.selectSellByInventorys));
    router.get('/price', makeExpressCallback(inventoryController.selectPriceSellCustomers));
    router.get('/buy/price', makeExpressCallback(inventoryController.selectPriceBuyCustomers));
    router.get('/list/selected', makeExpressCallback(inventoryController.selectListSelectedInventorys));
    router.get('/name', makeExpressCallback(inventoryController.selectInventoryNameCustomers));
    router.get('/note', makeExpressCallback(inventoryController.selectInventoryNotes));
    // POST
    router.post('/type', validateAuth, makeExpressCallback(inventoryController.typeAdds));
    router.post('/', validateAuth, makeExpressCallback(inventoryController.inventoryAdds));
    router.post('/variation', validateAuth, makeExpressCallback(inventoryController.insertVariations));
    router.post('/update', validateAuth, makeExpressCallback(inventoryController.updateInventorys));
    router.post('/update/variation', validateAuth, makeExpressCallback(inventoryController.updateVariations));
    router.post('/update/stock', makeExpressCallback(inventoryController.updateStocks));
    router.post('/price/', makeExpressCallback(inventoryController.addPriceSellCustomers));
    router.post('/price/update', makeExpressCallback(inventoryController.updatePriceSellCustomers));
    router.post('/price/delete', makeExpressCallback(inventoryController.deletePriceSellCustomers));
    router.post('/name/', makeExpressCallback(inventoryController.addInventoryNameCustomers));
    router.post('/name/update', makeExpressCallback(inventoryController.updateInventoryNameCustomers));
    router.post('/name/delete', makeExpressCallback(inventoryController.deleteInventoryNameCustomers));
    router.post('/note/', makeExpressCallback(inventoryController.addInventoryNotes));
    router.post('/buy/price/', makeExpressCallback(inventoryController.addPriceBuyCustomers));
    router.post('/buy/price/update', makeExpressCallback(inventoryController.updatePriceBuyCustomers));
    router.post('/buy/price/delete', makeExpressCallback(inventoryController.deletePriceBuyCustomers));
    // PATCH
    // DELETE

    return router;
};

export default route;
