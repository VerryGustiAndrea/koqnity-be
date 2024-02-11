const generateID = (crypto: any, algorithm: any, password: any, iv: any) => {
    return function generateID(isLower: boolean) {

        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        let str = null;
        const cipher = crypto.createCipheriv(algorithm, password, iv);
        let encrypted = Buffer.concat([cipher.update(result), cipher.final()]);
        str = encrypted.toString('hex');
        return str;
    };
};

export default generateID;
