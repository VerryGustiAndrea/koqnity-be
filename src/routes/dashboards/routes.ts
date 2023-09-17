import dashboardController from '../../controller/dashboard/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/total/sell', validateAuth, makeExpressCallback(dashboardController.selectTotalSells));
    router.get('/total/transaction', validateAuth, makeExpressCallback(dashboardController.selectTotalTransactions));
    router.get('/total/goods', validateAuth, makeExpressCallback(dashboardController.selectTotalSellGood));
    router.get('/total/customer', validateAuth, makeExpressCallback(dashboardController.selectTotalCustomers));
    router.get('/top/goods', validateAuth, makeExpressCallback(dashboardController.selectTopGood));
    router.get('/top/customer', validateAuth, makeExpressCallback(dashboardController.selectTopCustomers));
    router.get('/list/overtime-payment', validateAuth, makeExpressCallback(dashboardController.selectListOvertimePayments));

    return router;
};

export default route;
