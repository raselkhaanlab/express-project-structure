exports.isInteger = (value) => {
    let x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
};

exports.isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

