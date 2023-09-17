const generateToken = (key: any, jwt: any) => {
    return function generateToken(text: string) {
        const token = jwt.sign(
            {
                pin: text,
                date: new Date()
            },
            key
        );
        return token;
    };
};

export default generateToken;
