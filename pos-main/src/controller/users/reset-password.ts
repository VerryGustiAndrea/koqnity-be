const bcrypt = require('bcryptjs');

const resetPassword = (resetPasswordAction: Function, selectUserAction: Function, enc: Function, dec: Function, insertLogs: Function) => {
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
                token: httpRequest.headers['token'],
                source
            };
            const view = await selectUserAction(dataRequest);
            if (view.length > 0) {
                let isValid = dec(view[0].hash_password);
                if (isValid == info.password) {
                    if (info.newPassword == info.newPasswordRepeat) {
                        let updatePassword = await resetPasswordAction({ token: httpRequest.headers['token'], hash_password: enc(info.newPassword) });
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
                                body: { data: null, errorMessage: null, statusCode: 200 }
                            };
                        }
                    } else {
                        return {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            statusCode: 401,
                            body: { data: null, errorMessage: 'New Password Not Same', statusCode: 401 }
                        };
                    }
                } else {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: 401,
                        body: { data: null, errorMessage: 'Password Was Wrong', statusCode: 401 }
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

export default resetPassword;
