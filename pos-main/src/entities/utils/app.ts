import _ from '../../functions/app'; // functions
import makeLog from './make-log';

const makeLogs = makeLog(_.enc, _.gLogID);

const entity = {
    makeLogs
};

export default entity;
