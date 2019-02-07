let baltnetCore = require('baltnetcore');

module.exports = function(RED) {
    function GetBalanceNode(config) {
        let apiKey = config.apikey;
        let login = config.login;
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function (msg) {
            baltnetCore.getBalance(apiKey, login)
                .then(result => {
                    msg.payload = result.data;
                    node.send(msg);
                })
                .catch(err => {
                    console.error(err.errno);
                    console.error(err.code);
                });
        });
    }
    RED.nodes.registerType("node-red-contrib-baltnet-get-balance",GetBalanceNode);
};