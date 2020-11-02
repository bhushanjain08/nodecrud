const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:process.env.host,
    user: process.env.user,
    password:process.env.password,
    database:process.env.database,
    multipleStatements: true,
    connectionLimit: 10 
});  

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection successfull');
    else
    console.log('Connecti on Failed \n Error : '+ JSON.stringify(ere, undefined,2));
})

module.exports = mysqlConnection;