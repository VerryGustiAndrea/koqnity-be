const userAdd = (addUsersAction: Function, insertLogs: Function) => {
    return async function post(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }

            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 10) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }

            const posted = await addUsersAction({
                ...info,
                password: result,
                source
            });
            let insertLog = await insertLogs({
                type_activity: 'create_user',
                token: httpRequest.headers['token'],
                data: JSON.stringify({ username: info.username, full_name: info.full_name, role: info.role, }),
                status: 1
            });
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { data: { password: result, }, statusCode: 201, errorMessage: null }
            };
        } catch (e: any) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    data: null,
                    statusCode: 400,
                    errorMessage: e.message
                }
            };
        }
    };
};

export default userAdd;
