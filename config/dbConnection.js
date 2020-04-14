var mysql = require('mysql');

var connMysql = function (){
    return mysql.createConnection({
        host: 'localhost',
        user: 'mspolavori',
        password: 'Spola2020',
        database: 'cyberBank'
    });
}

module.exports = function () {
    return connMysql;
};