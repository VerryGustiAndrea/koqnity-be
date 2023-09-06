import customerController from '../../controller/customers/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/', validateAuth, makeExpressCallback(customerController.selectCustomers));
    router.get('/list', validateAuth, makeExpressCallback(customerController.selectListCustomers));
    router.get('/contact', validateAuth, makeExpressCallback(customerController.selectContactTypes));

    // POST
    router.post('/', validateAuth, makeExpressCallback(customerController.customerAdds));

    // PATCH
    router.patch('/', validateAuth, makeExpressCallback(customerController.customerUpdates));

    // DELETE

    return router;
};

export default route;
