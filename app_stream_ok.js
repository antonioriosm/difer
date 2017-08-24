'use strict';

const mysql = require('mysql');
const fs = require('fs');

const config = require('./cfg/config.js');
const archivo = './data/difer.json';

let connection = mysql.createConnection(config);

connection.connect();

connection.query('TRUNCATE difer', function (error) {
    if (error) throw error;

    let archivo_json = "";

    var read_stream = fs.createReadStream(archivo);

    read_stream.on('open', function () { console.log(`archivo '${archivo}' abierto `); });

    read_stream.on('data', writeCallback);
    read_stream.on('close', closeCallback);

    function writeCallback(data){
        //console.log(`longitud ${data.length}`);
        archivo_json += data;
        /*read_stream.pause();
        setTimeout(() => {
            console.log('Ahora los datos empezarán a fluir nuevamente');
            read_stream.resume();
        }, 1000);*/
    }

    function closeCallback() {
        let json = JSON.parse(archivo_json);
        let tmp = "";
        let reg = "";
        let registros = [];
        for (let r in json) {
            reg = json[r];
            tmp = [reg.anio, reg.mes, reg.codser, reg.desser, reg.dia, reg.total, reg.datetime];
            registros.push(tmp);
        }
        let sql = "INSERT INTO difer (anio, mes, codser, desser, dia, total, fecpro) VALUES ?";
        connection.query(sql, [registros], (err) => {
            if (err) throw err;
            console.log('Carga terminada...');
            connection.end();
        });
    }
});
