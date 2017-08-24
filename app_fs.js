'use strict';

const mysql = require('mysql');
const fs = require('fs');

const config = require('./cfg/config.js');
const archivo = './data/difer.json';

let connection = mysql.createConnection(config);

connection.connect();
 
connection.query('TRUNCATE difer', function (error) {
    if (error) throw error;
  
    fs.readFile(archivo, 'utf-8', (err, data) => {
        if (err) throw err;
        
        console.log(data);
        let json = JSON.parse(data);
        let tmp = "";
        let reg = "";
        let registros = [];
        for (let r in json) {
            reg = json[r];
            tmp = [reg.anio, reg.mes, reg.codser, reg.desser, reg.dia, reg.total, reg.datetime];
            registros.push(tmp);
        }
        let sql = "INSERT INTO difer (anio, mes, codser, desser, dia, total, datetime) VALUES ?";
        connection.query(sql, [registros], (err) => { 
            if (err) throw err;
            console.log('Carga terminada...');
            connection.end();
        });
    });
});
 