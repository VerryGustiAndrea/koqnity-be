const onlyAdmin = (jwt: any, password: any, userDb: any) => {
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
                        role: e.role
                    });
                }
                if (data.length > 0) {
                    if (data[0].role == 1) {
                        next();
                    } else {
                        res.status(400).json({ messsage: 'Only Admin', data: null, statusCode: 400 });
                    }
                } else {
                    res.status(400).json({ messsage: 'Only Admin', data: null, statusCode: 400 });
                }
            } else {
                res.status(400).json({ messsage: 'Only Admin', data: null, statusCode: 400 });
            }
        } catch (err) {
            res.status(400).json({ messsage: 'Only Admin', data: null, statusCode: 400 });
        }
    };
};
export default onlyAdmin;
