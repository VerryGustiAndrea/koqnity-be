const generateLogId = (crypto: any, algorithm: any, password: any, iv: any) => {
    return function generateLogId(isLower: boolean) {
        let str = null;
        const cipher = crypto.createCipheriv(algorithm, password, iv);
        let encrypted = Buffer.concat([cipher.update(`${new Date().getTime()}`), cipher.final()]);
        str = encrypted.toString('hex');
        return 'LOG' + str;
    };
};

export default generateLogId;
