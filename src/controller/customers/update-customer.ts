const bcrypt = require('bcryptjs');

const customerUpdate = (customerUpdateAction: Function, insertLogs: Function) => {
    return async function post(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const posted = await customerUpdateAction({
                ...info,
                source
            });
            if (posted[0] == 1) {
                let insertLog = await insertLogs({
                    type_activity: 'update_customer',
                    token: httpRequest.headers['token'],
                    data: JSON.stringify({ ...info }),
                    status: 1
                });
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: { data: { ...info }, statusCode: 200, errorMessage: null }
                };
            } else {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 400,
                    body: {
                        data: null,
                        statusCode: 400,
                        errorMessage: 'Update Gagal'
                    }
                };
            }
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

export default customerUpdate;
