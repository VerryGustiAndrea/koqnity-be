import reportDB from '../../data-access/report/app';
import _ from '../../functions/app';
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

const selectSells = selectSell(reportDB);
const selectSellCustomers = selectSellCustomer(reportDB);
const selectSellPeriods = selectSellPeriod(reportDB);
const selectSellProducts = selectSellProduct(reportDB);
const selectSellOutstandingCustomers = selectSellOutstandingCustomer(reportDB);
const selectBuys = selectBuy(reportDB);
const selectBuyCustomers = selectBuyCustomer(reportDB);
const selectBuyPeriods = selectBuyPeriod(reportDB);
const selectBuyProducts = selectBuyProduct(reportDB);
const selectBuyOutstandingVendors = selectBuyOutstandingVendor(reportDB);

// inventory use case
const reportUC = {
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
    // addSells,
};

export default reportUC;
