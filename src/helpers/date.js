const moment = require("moment");
exports.currentDateTime =()=>{
    return moment().format('YYYY-MM-DD H:m:ss');
}
exports.currentDate =()=>{
    return moment().format('YYYY-MM-DD');
}

exports.dateToDbFormat =(date)=>{
    let d = date.split('-');
    return d[2]+'-'+d[1]+'-'+d[0];
}

exports.dateFromDbFormat =(date)=>{
    let d = date.split('-');
    return d[0]+'-'+d[1]+'-'+d[2];
}