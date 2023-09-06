import _ from '../../functions/app';
import reportUC from '../../use-cases/report/app';
import selectSell from './select-sell';
import selectSellCustomer from './select-sell-customer';
import selectSellPeriod from './select-sell-period';
import selectSellProduct from './select-sell-product';
import selectSellOutstandingCustomer from './select-sell-outstanding-customer';
import selectBuy from './select-buy';
import selectBuyCustomer from './select-buy-customer';
import selectBuyPeriod from './select-buy-period';
import selectBuyProduct from './select-buy-product';
import selectBuyOutstandingVendor from './select-buy-outstanding-vendor';
// #####
const selectSells = selectSell(reportUC.selectSells);
const selectSellCustomers = selectSellCustomer(reportUC.selectSellOutstandingCustomers);
const selectSellPeriods = selectSellPeriod(reportUC.selectSellPeriods);
const selectSellProducts = selectSellProduct(reportUC.selectSellProducts);
const selectSellOutstandingCustomers = selectSellOutstandingCustomer(reportUC.selectSellOutstandingCustomers);
const selectBuys = selectBuy(reportUC.selectBuys);
const selectBuyCustomers = selectBuyCustomer(reportUC.selectBuyCustomers);
const selectBuyPeriods = selectBuyPeriod(reportUC.selectBuyPeriods);
const selectBuyProducts = selectBuyProduct(reportUC.selectBuyProducts);
const selectBuyOutstandingVendors = selectBuyOutstandingVendor(reportUC.selectBuyOutstandingVendors);

// #####
const reportController = {
    selectSells,
    selectSellCustomers,
    selectSellPeriods,
    selectSellProducts,
    selectSellOutstandingCustomers,
    selectBuys,
    selectBuyCustomers,
    selectBuyPeriods,
    selectBuyProducts,
    selectBuyOutstandingVendors
};

export default reportController;
