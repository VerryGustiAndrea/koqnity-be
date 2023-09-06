import _ from '../../functions/app';
import dashboardDB from '../../data-access/dashboards/app';
import selectTotalSell from './select-total-sell';
import selectTotalTransaction from './select-total-transaction';
import selectTotalSellGoods from './select-total-sell-goods';
import selectTotalCustomer from './select-total-customer';
import selectTopCustomer from './select-top-customer';
import selectTopGoods from './select-top-goods';
import selectListOvertimePayment from './select-list-overtime-payment';

const selectTotalSells = selectTotalSell(dashboardDB);
const selectTotalTransactions = selectTotalTransaction(dashboardDB);
const selectTotalSellGood = selectTotalSellGoods(dashboardDB);
const selectTotalCustomers = selectTotalCustomer(dashboardDB);
const selectTopCustomers = selectTopCustomer(dashboardDB);
const selectTopGood = selectTopGoods(dashboardDB);
const selectListOvertimePayments = selectListOvertimePayment(dashboardDB);

const dashboatdUC = {
    selectTotalSells,
    selectTotalTransactions,
    selectTotalSellGood,
    selectTotalCustomers,
    selectTopCustomers,
    selectTopGood,
    selectListOvertimePayments
};

export default dashboatdUC;
