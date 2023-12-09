import _ from '../../functions/app'; // functions

// ####
import makeInventory from './make-inventory';
import makeInventoryNameCustomer from './make-inventory-name-customer';
import makeInventoryNote from './make-inventory-note';
import makePriceSellCustomer from './make-price-sell-customer';
import makeType from './make-type';
import makeVariation from './make-variation';
import makeWarehouse from './make-warehouse';

// ####
const makeInventorys = makeInventory(_.enc, _.gInventoryID);
const makeVariations = makeVariation(_.enc, _.gVariationInventoryID);
const makeTypes = makeType(_.enc, _.gTypeID);
const makePriceSellCustomers = makePriceSellCustomer(_.enc, _.gTypeID);
const makeInventoryNameCustomers = makeInventoryNameCustomer();
const makeInventoryNotes = makeInventoryNote();
const makeWarehouses = makeWarehouse(_.enc, _.gWarehouseId);
// ####

const entity = {
    makeInventorys,
    makeVariations,
    makeTypes,
    makePriceSellCustomers,
    makeInventoryNameCustomers,
    makeInventoryNotes,
    makeWarehouses
};

export default entity;
