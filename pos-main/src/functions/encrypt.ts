const encrypt = (crypto: any, algorithm: any, password: any, iv: any) => {
    return function encrypt(text: string, isLower: boolean) {
        let str = null;
        if (text) {
            const cipher = crypto.createCipheriv(algorithm, password, iv);
            let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
            str = encrypted.toString('hex');
        }
        return str;
    };
};

export default encrypt;
