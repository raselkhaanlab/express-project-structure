const knex = require('knex');
const chalk = require("chalk");
const errorLog = chalk.bold.red;
const successLog= chalk.bold.green;

const dbconfig = require("./../config/dbConfig");

const client  = process.env.DB_CLIENT||dbconfig.default;
let connectionObject= null;

const intialize = async()=>{
    try{
        connectionObject = knex(dbconfig[client]);
        const connectionResult = await connectionObject.raw('select version()');
        console.log(connectionResult);
    }
    catch(error){
        console.log(errorLog(error.stack));
        process.exit(1);
    }
};

const getConnection=()=>{
    return connectionObject;
};
module.exports.intialize= intialize;
module.exports.getConnection= getConnection;