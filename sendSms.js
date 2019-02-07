let baltnetCore = require('baltnetcore');

module.exports = function(RED) {
    function SendSmsNode(config) {
        let sender = config.sender;
        let apiKey = config.apikey;
        let login = config.login;

        RED.nodes.createNode(this,config);
        let node = this;
        node.on('input', function (msg) {

            let phoneNumber = msg.payload.phoneNumber;
            let text = msg.payload.text;
            let sender = msg.payload.sender || config.sender;
            let time = msg.payload.time;

            baltnetCore.sendSms(apiKey, login, phoneNumber, sender, text, time)
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
    RED.nodes.registerType("node-red-contrib-baltnet-send-sms",SendSmsNode);
};