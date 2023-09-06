import _ from '../../functions/app'; // functions

// ####
import makeBuy from './make-buy';
import makeItem from './make-item';
import makePayHistory from './make-pay-history';

// ####
const makeBuys = makeBuy(_.enc, _.gBuyId);
const makeItems = makeItem(_.enc, _.gItemID, _.gHistoryId);
const makePayHistories = makePayHistory(_.enc, _.gHistoryId);
// ####

const entity = {
    makeBuys,
    makeItems,
    makePayHistories
};

export default entity;
