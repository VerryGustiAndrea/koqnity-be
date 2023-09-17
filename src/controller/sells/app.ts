import _ from '../../functions/app';
import utilUC from '../../use-cases/utils/app';
import addSell from './add-sell';
import selectListSell from './select-list-sell';
import updateSellStatus from './update-sell-status';
import sellUC from '../../use-cases/sells/app';
import selectSell from './select-sell';
import getCountStatus from './get-count-status';
import payHistoryAdd from './add-pay-history';
// #####
const addSells = addSell(sellUC.addSells, utilUC.insertLogs);
const updateSellStatues = updateSellStatus(sellUC.updateStatusSells, utilUC.insertLogs);
const selectSells = selectSell(sellUC.selectSells);
const selectListSells = selectListSell(sellUC.selectListSells);
const getCountStatues = getCountStatus(sellUC.getCountStatues);
const addPayHistories = payHistoryAdd(sellUC.addPayHistories, utilUC.insertLogs);

// #####
const sellController = {
    addSells,
    updateSellStatues,
    selectSells,
    selectListSells,
    getCountStatues,
    addPayHistories
};

export default sellController;
