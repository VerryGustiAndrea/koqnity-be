import customerDB from '../../data-access/customers/app';
import inventoryDB from '../../data-access/inventory/app';
import buyDB from '../../data-access/buys/app';
import entity from '../../entities/buys/app';
import _ from '../../functions/app';
import getCountStatus from './count-status';
import addPayHistory from './insert-pay-history';
import addBuy from './insert-buy';
import selectListBuy from './select-list-buy';
import selectBuy from './select-buy';
import updateStatusBuy from './update-status-buy';

const addBuys = addBuy(entity.makeBuys, entity.makeItems, buyDB, inventoryDB, customerDB);
const updateStatusBuys = updateStatusBuy(buyDB);
const selectBuys = selectBuy(buyDB);
const selectListBuys = selectListBuy(buyDB);
const getCountStatues = getCountStatus(buyDB);
const addPayHistories = addPayHistory(entity.makePayHistories, buyDB);

// inventory use case
const buyUC = {
    addBuys,
    updateStatusBuys,
    selectBuys,
    selectListBuys,
    getCountStatues,
    addPayHistories
};

export default buyUC;
