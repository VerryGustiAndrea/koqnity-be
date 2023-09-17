const decrypt = (crypto: any, algorithm: any, password: any, iv: any) => {
    return function decrypt(encrypted: string) {
        try {
            let str = null;
            if (encrypted) {
                const decipher = crypto.createDecipheriv(algorithm, password, iv);
                const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

                str = decrpyted.toString();
            }
            if (!str) return encrypted;
            return str;
        } catch (e) {
            return e;
        }
    };
};

export default decrypt;
