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
import generateID from './generateID';
// ########
const enc = encrypt(crypto, algorithm, password, iv);
const dec = decrypt(crypto, algorithm, password, iv);
const gUserId = generateUserId(crypto, algorithm, password, iv);
const gID = generateID(crypto, algorithm, password, iv);
const gToken = generateToken(password, jwt);
// ########

const _ = {
    enc,
    dec,
    gToken,
    gUserId,
    gID,
};

export default _;
