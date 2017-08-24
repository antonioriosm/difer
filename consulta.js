'use strict';

const mysql = require('mysql');

const config = require('./cfg/config1.js');

let connection = mysql.createConnection(config);

connection.connect(function (err) {
    console.log('conectando...');
    if (err) {
        console.error('error conecctando: ' + err.stack);
        return;
    }
 
    console.log('conectado como id ' + connection.threadId);
});
 
connection.query('SELECT * FROM difer', (err, rs, fie) => {
    if (err) throw err;
    
    console.log(rs);
    connection.end();
});
 