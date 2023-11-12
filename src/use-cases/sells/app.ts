import customerDB from '../../data-access/customers/app';
import inventoryDB from '../../data-access/inventory/app';
import sellDB from '../../data-access/sells/app';
import makePriceSellCustomer from '../../entities/inventory/make-price-sell-customer';
import entity from '../../entities/sells/app';
import _ from '../../functions/app';
import getCountStatus from './count-status';
import addPayHistory from './insert-pay-history';
import addSell from './insert-sell';
import selectListSell from './select-list-sell';
import selectSell from './select-sell';
import updateSell from './update-sell';
import updateStatusSell from './update-status-sell';

const addSells = addSell(entity.makeSells, entity.makeItems, sellDB, inventoryDB, customerDB, makePriceSellCustomer);
const updateStatusSells = updateStatusSell(sellDB);
const selectSells = selectSell(sellDB);
const selectListSells = selectListSell(sellDB);
const getCountStatues = getCountStatus(sellDB);
const addPayHistories = addPayHistory(entity.makePayHistories, sellDB);
const updateSells = updateSell(entity.makeItems, sellDB, inventoryDB, customerDB);

// inventory use case
const sellUC = {
    addSells,
    updateStatusSells,
    selectSells,
    selectListSells,
    getCountStatues,
    addPayHistories,
    updateSells
};

export default sellUC;
