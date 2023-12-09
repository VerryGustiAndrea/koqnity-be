const jwt = require('jsonwebtoken');
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const algorithm = process.env.ALGORITHM;
const password = process.env.ENCRYPTION_KEY;
const iv = process.env.IV;
// ########
import encrypt from './encrypt';
import decrypt from './decrypt';
import generateToken from './generateToken';
import generateUserId from './generateUserId';
import generateLogId from './generateLogId';
import generateCustomerId from './generateCustomerId';
import generateTypeId from './generateTypeId';
import generateInventoryID from './generateInventoryId';
import generateVariationInventoryId from './generateVariationInventoryId';
import generateSellId from './generateSellId';
import generateItemId from './generateItemId';
import generateHistoryId from './generateHistoryId';
import generateBuyId from './generateBuyId';
import generateWarehouseId from './generateWarehouseId';
// ########
const enc = encrypt(crypto, algorithm, password, iv);
const dec = decrypt(crypto, algorithm, password, iv);
const gUserId = generateUserId(crypto, algorithm, password, iv);
const gLogID = generateLogId(crypto, algorithm, password, iv);
const gCustomer = generateCustomerId(crypto, algorithm, password, iv);
const gTypeID = generateTypeId(crypto, algorithm, password, iv);
const gInventoryID = generateInventoryID(crypto, algorithm, password, iv);
const gVariationInventoryID = generateVariationInventoryId(crypto, algorithm, password, iv);
const gSellID = generateSellId(crypto, algorithm, password, iv);
const gItemID = generateItemId(crypto, algorithm, password, iv);
const gHistoryId = generateHistoryId(crypto, algorithm, password, iv);
const gWarehouseId = generateWarehouseId(crypto, algorithm, password, iv);
const gBuyId = generateBuyId(crypto, algorithm, password, iv);
const gToken = generateToken(password, jwt);
// ########

const _ = {
    enc,
    dec,
    gToken,
    gUserId,
    gLogID,
    gCustomer,
    gTypeID,
    gInventoryID,
    gVariationInventoryID,
    gSellID,
    gItemID,
    gHistoryId,
    gBuyId,
    gWarehouseId
};

export default _;
