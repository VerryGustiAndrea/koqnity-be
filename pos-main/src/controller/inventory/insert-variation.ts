const insertVariation = (insertVariationAction: Function, insertLogs: Function) => {
    return async function post(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const posted = await insertVariationAction({
                ...info,
                source
            });
            let insertLog = await insertLogs({
                type_activity: 'create_variation_inventory',
                token: httpRequest.headers['token'],
                data: JSON.stringify({ ...info }),
                status: 1
            });
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: { data: posted, statusCode: 201, errorMessage: null }
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

export default insertVariation;
