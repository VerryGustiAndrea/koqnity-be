import sellController from '../../controller/sells/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/', validateAuth, makeExpressCallback(sellController.selectSells));
    router.get('/list', validateAuth, makeExpressCallback(sellController.selectListSells));
    router.get('/status/count', validateAuth, makeExpressCallback(sellController.getCountStatues));
    // POST
    router.post('/', makeExpressCallback(sellController.addSells));
    router.post('/pay', makeExpressCallback(sellController.addPayHistories));
    router.post('/update', validateAuth, makeExpressCallback(sellController.updateSells));
    // PATCH
    router.patch('/', validateAuth, makeExpressCallback(sellController.updateSellStatues));
    // DELETE
    return router;
};

export default route;
