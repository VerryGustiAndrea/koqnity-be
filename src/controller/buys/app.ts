import _ from '../../functions/app';
import utilUC from '../../use-cases/utils/app';
import addBuy from './add-buy';
import selectListBuy from './select-list-buy';
import updateBuyStatus from './update-buy-status';
import BuyUC from '../../use-cases/buys/app';
import selectBuy from './select-buy';
import getCountStatus from './get-count-status';
import payHistoryAdd from './add-pay-history';
// #####
const addBuys = addBuy(BuyUC.addBuys, utilUC.insertLogs);
const updateBuyStatues = updateBuyStatus(BuyUC.updateStatusBuys, utilUC.insertLogs);
const selectBuys = selectBuy(BuyUC.selectBuys);
const selectListBuys = selectListBuy(BuyUC.selectListBuys);
const getCountStatues = getCountStatus(BuyUC.getCountStatues);
const addPayHistories = payHistoryAdd(BuyUC.addPayHistories, utilUC.insertLogs);

// #####
const buyController = {
    addBuys,
    updateBuyStatues,
    selectBuys,
    selectListBuys,
    getCountStatues,
    addPayHistories
};

export default buyController;
