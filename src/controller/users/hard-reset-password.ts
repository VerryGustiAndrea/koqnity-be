const bcrypt = require('bcryptjs');

const hardResetPassword = (hardResetPasswordAction: Function, selectUserAction: Function, enc: Function, dec: Function, insertLogs: Function) => {
    return async function get(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            //get the httprequest body
            const { source = {}, ...info } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const dataRequest = {
                ...info,
                source
            };
            const view = await selectUserAction(dataRequest);
            if (view.length > 0) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < 10) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                let updatePassword = await hardResetPasswordAction({ user_id: dataRequest.user_id, hash_password: enc(result) });
                if (updatePassword.status) {
                    let insertLog = await insertLogs({
                        type_activity: 'update_password_user',
                        token: httpRequest.headers['token'],
                        data: JSON.stringify({}),
                        status: 1
                    });
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: 200,
                        body: { data: { new_password: result }, errorMessage: null, statusCode: 200 }
                    };
                }
                else {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: 401,
                        body: { data: null, errorMessage: 'User Not Found', statusCode: 401 }
                    };
                }
            }
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 401,
                body: { data: null, errorMessage: 'User Not Found', statusCode: 401 }
            };
        } catch (e: any) {
            // TODO: Error logging
            return {
                headers,
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

export default hardResetPassword;
