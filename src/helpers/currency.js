
exports.balanceToTx = (currency,balance) => {
    currency = currency.toLowerCase();
    let old = balance;
    switch (currency){
        case 'btc':
            balance = (balance/0.00000001).toFixed(8);
            break;
        case 'bch':
            balance = (balance/0.00000001).toFixed(8);
            break;
        case 'ltc':
            balance = (balance/0.00000001).toFixed(8);
            break;
        default:
            break;
    }
    return parseFloat(balance);
}