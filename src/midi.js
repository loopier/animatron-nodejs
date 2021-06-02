var midi = require('jzz');

midi().openMidiIn()
    .or('Cannot open MIDI In port')
    .and(function() { log.info('MIDI-In:', this.name()) })
    .connect(function(msg) { log.info( msg.toString() )});
