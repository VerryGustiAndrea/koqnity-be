import userUC from '../../use-cases/users/app';
import _ from '../../functions/app';
import userAdd from './insert-user';
import userLogin from './login-user';
import userLogout from './logout-user';
import userUpdate from './update-user';
import resetPassword from './reset-password';
import utilUC from '../../use-cases/utils/app';
// #####
const userAdds = userAdd(userUC.addUsers, utilUC.insertLogs);
const userLogins = userLogin(userUC.loginUsers, userUC.insertTokens, _.dec, _.gToken, utilUC.insertLogs);
const userLogouts = userLogout(userUC.logoutUsers, utilUC.insertLogs);
const userUpdates = userUpdate(userUC.updateUsers, utilUC.insertLogs);
const resetPasswords = resetPassword(userUC.resetPasswords, userUC.selectUsers, _.enc, _.dec, utilUC.insertLogs);
// #####
const userController = {
    userAdds,
    userLogins,
    userLogouts,
    userUpdates,
    resetPasswords
};

export default userController;
