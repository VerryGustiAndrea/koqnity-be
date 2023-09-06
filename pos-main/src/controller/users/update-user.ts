const bcrypt = require('bcryptjs');

const userUpdate = (userUpdateAction: Function, insertLogs: Function) => {
    return async function post(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const posted = await userUpdateAction({
                ...info,
                token: httpRequest.headers['token'],
                source
            });
            let insertLog = await insertLogs({
                type_activity: 'update_profile_user',
                token: httpRequest.headers['token'],
                data: JSON.stringify({ full_name: info.full_name }),
                status: 1
            });
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: { data: { ...posted }, statusCode: 200, errorMessage: null }
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

export default userUpdate;
