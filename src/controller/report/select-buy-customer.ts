const selectBuyCustomer = (selectBuyCustomerAction: Function) => {
    return async function get(httpRequest: any) {
        try {
            const { source = {}, ...info } = httpRequest.body;
            const { length, page, search, customer, start_date, end_date } = httpRequest.query;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer'];
            }
            console.log(start_date, end_date, 'hore');
            const res = await selectBuyCustomerAction({
                length,
                page,
                search,
                customer,
                start_date,
                end_date
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

export default selectBuyCustomer;
