const bcrypt = require('bcryptjs');

const userLogin = (loginUsersAction: Function, insertTokenAction: Function, dec: Function, generateToken: Function) => {
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
                // id: httpRequest.params.id // when id is passed
            };
            const view = await loginUsersAction(dataRequest);
            if (view.length > 0) {
                let isValid = dec(view[0].hash_password);
                if (isValid == info.password) {
                    let token = generateToken(view[0].password);
                    let data = { token: token, user_id: view[0].user_id };
                    let updateToken = await insertTokenAction(data);
                    console.log(updateToken);
                    if (updateToken.status) {
                        return {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            statusCode: 200,
                            body: {
                                data: { token: token, full_name: view[0].full_name, username: view[0].username, role_id: view[0].role_id, role_name: view[0].role_name },
                                errorMessage: null,
                                statusCode: 200
                            }
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

export default userLogin;
