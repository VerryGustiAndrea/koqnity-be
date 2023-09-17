import _ from '../../functions/app'; // functions

// ####
import makeSell from './make-sell';
import makeItem from './make-item';
import makePayHistory from './make-pay-history';

// ####
const makeSells = makeSell(_.enc, _.gSellID);
const makeItems = makeItem(_.enc, _.gItemID, _.gHistoryId);
const makePayHistories = makePayHistory(_.enc, _.gHistoryId);
// ####

const entity = {
    makeSells,
    makeItems,
    makePayHistories
};

export default entity;
