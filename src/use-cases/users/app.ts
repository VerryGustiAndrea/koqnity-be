import entity from '../../entities/users/app';
import userDb from '../../data-access/users/app';
import _ from '../../functions/app';
import loginUser from './login-user';
import addUser from './insert-user';
import insertToken from './insert-token';
import logoutUser from './logout-user';
import updateUser from './update-user';
import resetPassword from './reset-password';
import selectUser from './select-user';
import selectListUser from './select-list-user';
import selectUserById from './select-user-id';
import resetPasswordById from './reset-password-by-id';

const loginUsers = loginUser(userDb);
const addUsers = addUser(entity.makeUsers, userDb);
const insertTokens = insertToken(userDb);
const logoutUsers = logoutUser(userDb);
const updateUsers = updateUser(userDb);
const resetPasswords = resetPassword(userDb);
const selectUsers = selectUser(userDb);
const selectListUsers = selectListUser(userDb);
const selectUserByIds = selectUserById(userDb);
const resetPasswordByIds = resetPasswordById(userDb);

// user use case
const userUC = {
    addUsers,
    loginUsers,
    insertTokens,
    logoutUsers,
    updateUsers,
    resetPasswords,
    selectUsers,
    selectListUsers,
    selectUserByIds,
    resetPasswordByIds
};

export default userUC;
