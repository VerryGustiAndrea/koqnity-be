import buyController from '../../controller/buys/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/', validateAuth, makeExpressCallback(buyController.selectBuys));
    router.get('/list', validateAuth, makeExpressCallback(buyController.selectListBuys));
    router.get('/status/count', validateAuth, makeExpressCallback(buyController.getCountStatues));

    // POST
    router.post('/', makeExpressCallback(buyController.addBuys));
    router.post('/pay', makeExpressCallback(buyController.addPayHistories));

    // PATCH
    router.patch('/', validateAuth, makeExpressCallback(buyController.updateBuyStatues));

    // DELETE

    return router;
};

export default route;
