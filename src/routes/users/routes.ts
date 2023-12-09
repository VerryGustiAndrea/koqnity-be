import userController from '../../controller/users/app';
import _ from '../../functions/app';

const route = (router: any, makeExpressCallback: Function, validateAuth: Function, validateAdmin: Function) => {
    // GET
    router.get('/', validateAuth, makeExpressCallback(userController.selectListUsers));

    //login api
    router.post('/login', makeExpressCallback(userController.userLogins));

    // POST
    router.post('/', validateAuth, validateAdmin, makeExpressCallback(userController.userAdds));
    router.post('/logout', validateAuth, makeExpressCallback(userController.userLogouts));
    router.post('/update', validateAuth, makeExpressCallback(userController.userUpdates));
    router.post('/reset-password', validateAuth, makeExpressCallback(userController.resetPasswords));
    router.post('/hard-reset-password', validateAuth, makeExpressCallback(userController.hardResetPasswords));

    // PATCH

    // DELETE

    return router;
};

export default route;
