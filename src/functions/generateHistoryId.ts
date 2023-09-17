const generateHistoryID = (crypto: any, algorithm: any, password: any, iv: any) => {
    return function generateHistoryID(isLower: boolean) {
        let str = null;
        const cipher = crypto.createCipheriv(algorithm, password, iv);
        let encrypted = Buffer.concat([cipher.update(`${new Date().getTime()}`), cipher.final()]);
        str = encrypted.toString('hex');
        return 'HIS' + str;
    };
};

export default generateHistoryID;
