// const log = require('electron-log')
const { Client, Server } = require('node-osc')
const sender = new Client('127.0.0.1', 4321)
const listenport = 1234
const receiver = new Server(1234, '0.0.0.0', () => {
    log.info('OSC Server listening on port', listenport)
})
receiver.on('message', function(msg) {
    log.info(`Message: ${msg}`)
    receiver.close()
})
