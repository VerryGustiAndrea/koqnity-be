import _ from '../../functions/app';
import dashboatdUC from '../../use-cases/dashboards/app';
import selectListOvertimePayment from './select-list-overtime-payment';
import selectTopCustomer from './select-top-customer';
import selectTopGoods from './select-top-goods';
import selectTotalCustomer from './select-total-customer';
import selectTotalSell from './select-total-sell';
import selectTotalSellGoods from './select-total-sell-goods';
import selectTotalTransaction from './select-total-transaction';

// #####
const selectTotalSells = selectTotalSell(dashboatdUC.selectTotalSells);
const selectTotalTransactions = selectTotalTransaction(dashboatdUC.selectTotalTransactions);
const selectTotalSellGood = selectTotalSellGoods(dashboatdUC.selectTotalSellGood);
const selectTotalCustomers = selectTotalCustomer(dashboatdUC.selectTotalCustomers);
const selectTopCustomers = selectTopCustomer(dashboatdUC.selectTopCustomers);
const selectTopGood = selectTopGoods(dashboatdUC.selectTopGood);
const selectListOvertimePayments = selectListOvertimePayment(dashboatdUC.selectListOvertimePayments);

// #####
const dashboardController = {
    selectTotalSells,
    selectTotalTransactions,
    selectTotalSellGood,
    selectTotalCustomers,
    selectTopCustomers,
    selectTopGood,
    selectListOvertimePayments
};

export default dashboardController;
