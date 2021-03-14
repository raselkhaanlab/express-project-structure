exports.ucFirst  = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.lcFirst = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

exports.isEmail = (email) =>{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

};