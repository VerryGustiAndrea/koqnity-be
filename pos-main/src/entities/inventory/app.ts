import _ from '../../functions/app'; // functions

// ####
import makeInventory from './make-inventory';
import makeType from './make-type';
import makeVariation from './make-variation';

// ####
const makeInventorys = makeInventory(_.enc, _.gInventoryID);
const makeVariations = makeVariation(_.enc, _.gVariationInventoryID);
const makeTypes = makeType(_.enc, _.gTypeID);
// ####

const entity = {
    makeInventorys,
    makeVariations,
    makeTypes
};

export default entity;
