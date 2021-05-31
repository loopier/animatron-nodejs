const log = require('electron-log')
const { Client, Server } = require('node-osc')

// const sender = new Client('127.0.0.1', 4321)
const receiver = new Server(config.get('osc.port'), '0.0.0.0', () => {
    log.info('OSC Server listening on port', config.get('osc.port'));
});

receiver.on('message', function(msg) {
    log.info(`Message: ${msg}`);
    receiver.close();
});
