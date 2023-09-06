import inventoryController from '../../controller/inventory/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/type', validateAuth, makeExpressCallback(inventoryController.selectTypes));
    router.get('/list', validateAuth, makeExpressCallback(inventoryController.selectListInventorys));
    router.get('/variation', validateAuth, makeExpressCallback(inventoryController.selectListVariations));
    router.get('/', makeExpressCallback(inventoryController.selectInventorys));
    router.get('/stock', makeExpressCallback(inventoryController.selectStockWarehouses));

    // POST
    router.post('/type', validateAuth, makeExpressCallback(inventoryController.typeAdds));
    router.post('/', validateAuth, makeExpressCallback(inventoryController.inventoryAdds));
    router.post('/variation', validateAuth, makeExpressCallback(inventoryController.insertVariations));
    router.post('/update', validateAuth, makeExpressCallback(inventoryController.updateInventorys));
    router.post('/update/variation', validateAuth, makeExpressCallback(inventoryController.updateVariations));
    router.post('/update/stock', makeExpressCallback(inventoryController.updateStocks));

    // PATCH

    // DELETE

    return router;
};

export default route;
