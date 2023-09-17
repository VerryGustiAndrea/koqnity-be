import reportController from '../../controller/report/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/sell', validateAuth, makeExpressCallback(reportController.selectSells));
    router.get('/sell/customer', validateAuth, makeExpressCallback(reportController.selectSellCustomers));
    router.get('/sell/period', validateAuth, makeExpressCallback(reportController.selectSellPeriods));
    router.get('/sell/product', validateAuth, makeExpressCallback(reportController.selectSellProducts));
    router.get('/sell/outstanding', validateAuth, makeExpressCallback(reportController.selectSellOutstandingCustomers));
    router.get('/buy', validateAuth, makeExpressCallback(reportController.selectBuys));
    router.get('/buy/customer', validateAuth, makeExpressCallback(reportController.selectBuyCustomers));
    router.get('/buy/period', validateAuth, makeExpressCallback(reportController.selectBuyPeriods));
    router.get('/buy/product', validateAuth, makeExpressCallback(reportController.selectBuyProducts));
    router.get('/buy/outstanding', validateAuth, makeExpressCallback(reportController.selectBuyOutstandingVendors));

    return router;
};

export default route;
