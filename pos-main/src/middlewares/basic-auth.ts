const myAuth = (jwt: any, password: any, userDb: any) => {
    return async function auths(req: any, res: any, next: any) {
        try {
            let data = [];
            jwt.verify(req.headers['token'], password);
            const view = await userDb.selectUser(req.headers['token']);
            if (res.status) {
                const items = view.data;
                for (let i = 0; i < items.length; i++) {
                    const e = items[i];
                    data.push({
                        full_name: e.full_name
                    });
                }
                if (data.length > 0) {
                    next();
                } else {
                    res.status(403).json({ messsage: 'Forbidden', data: null, statusCode: 403 });
                }
            } else {
                res.status(403).json({ messsage: 'Forbidden', data: null, statusCode: 403 });
            }
        } catch (err) {
            res.status(403).json({ messsage: 'Forbidden', data: null, statusCode: 403 });
        }
    };
};
export default myAuth;
