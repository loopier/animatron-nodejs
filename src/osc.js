const { Client, Server } = require('node-osc')
const sender = new Client('127.0.0.1', 4321)
const listenport = 1234
const receiver = new Server(1234, '0.0.0.0', () => {
    console.log('OSC Server listening on port', listenport)
})
receiver.on('message', function(msg) {
    console.log(`Message: ${msg}`)
    receiver.close()
})
