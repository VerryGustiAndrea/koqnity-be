import inventoryController from '../../controller/inventory/app';
import warehouseController from '../../controller/warehouse/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/all', makeExpressCallback(warehouseController.selectWarehouses));
    router.get('/', makeExpressCallback(warehouseController.selectListWarehouses));

    // POST

    // PATCH
    // DELETE

    return router;
};

export default route;
