'use strict';

const Client = require('mysql').Client;
let client = new Client(); 
client.host ='172.26.17.56';
client.user = 'root';
client.password = 'root';
console.log("connecting...");
client.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    }
    console.log("connected.");
    clientConnected(client);
});

function clientConnected(client)
{
    tableHasData(client);
}           


function tableHasData(client)
{
    client.query(
        'SELECT * FROM difer.difer LIMIT 0,10',
        function selectCb(err, results, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
                throw err;
            }
            console.log("Got "+results.length+" Rows:");
            for(var i in results){
                console.log(results[i].total); 
                console.log('\n');
            }
            client.end();
        });
}