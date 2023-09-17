const selectListSell = (selectListSellAction: Function) => {
    return async function get(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            const { length, page, search, status, customer, min_price, max_price, start_date, end_date, sort_by, sort_type } = httpRequest.query;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            const res = await selectListSellAction({
                length,
                page,
                search,
                status,
                customer,
                min_price,
                max_price,
                start_date,
                end_date,
                sort_by,
                sort_type
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
            console.log(e);

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

export default selectListSell;
