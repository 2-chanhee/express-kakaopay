const axios = require('axios');

module.exports.kakaopay = async (req, res, next) => {
    // set variables
    const item_name = '초코파이';
    const quantity = 1;
    const total_amount = 2200;
    const vat_amount = 200;
    const tax_free_amount = 0;

    const approval_url = 'http://example.com/success';
    const fail_url = 'http://example.com/fail';
    const cancel_url = 'http://example.com/cancel';

    // set data
    const data = [
        'cid=TC0ONETIME',
        'partner_order_id=partner_order_id',
        'partner_user_id=partner_user_id',
        `item_name=${item_name}`,
        `quantity=${quantity}`,
        `total_amount=${total_amount}`,
        `vat_amount=${vat_amount}`,
        `tax_free_amount=${tax_free_amount}`,
        `approval_url=${approval_url}`,
        `fail_url=${fail_url}`,
        `cancel_url=${cancel_url}`
    ].join('&'); // encode data (application/x-www-form-urlencoded)

    // send request (kakao payment)
    const reqToKakao = await axios.post('https://kapi.kakao.com/v1/payment/ready', data, {
        headers: {
            Authorization: 'KakaoAK 4c75e49b77bba7b7442226e8f18780cb', // 'xxx...' = admin key
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    console.log('req nest re', reqToKakao);

    const pc_url = reqToKakao.data.next_redirect_pc_url; // get pc url

    const response = {
        statusCode: 301, // redirect
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
            Location: pc_url
        },
        body: ''
    };

    console.log('response', response);

    return response;
    res.json(req.body);
};
