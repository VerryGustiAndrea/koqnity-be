const selectListVariation = (selectListVariationAction: Function) => {
    return async function get(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            const { inventory_id, length, page, search } = httpRequest.query;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const res = await selectListVariationAction({
                inventory_id,
                length,
                page,
                search
            });
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                body: { data: res, errorMessage: null, statusCode: 200 }
            };
        } catch (e: any) {
            // TODO: Error logging
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

export default selectListVariation;
