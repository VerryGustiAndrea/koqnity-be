const selectInventory = (selectInventoryAction: Function, insertLogs: Function) => {
    return async function get(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            //get the httprequest body
            const { source = {}, ...info } = httpRequest.query;
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
            const view = await selectInventoryAction(dataRequest);
            if (view) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    body: { data: view, errorMessage: null, statusCode: 200 }
                };
            } else {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 401,
                    body: { data: {}, errorMessage: '', statusCode: 404 }
                };
            }
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

export default selectInventory;
