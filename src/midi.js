const midi = require('jzz');
const midicmds = {
    128: "noteOff",
    144: "noteOn",
    176: "cc"
};

midi().openMidiIn()
    .or('Cannot open MIDI In port')
    // .and(function() { log.info('MIDI-In:', this.name()) })
    .and(function() {midiSetup(this)})
    .connect(newMidiMsg);


function midiSetup( obj) {
    log.info(obj)
    // --------------- remove
    // automatic connections from mpk-mini to midi-in
    const system = require('system-commands');
    system('aconnect 24:0 130:0').then(log.info('mpk should work')).catch(log.error);
    // system('ls').then(log.info).catch(log.error);
    // -------------- end of remove
}

function newMidiMsg( msg ) {
    // log.info( msg.toString() );
    let n = msg[1];
    let val = msg[2];
    switch( midicmds[msg[0]] ) {
    case "noteOn":
        log.silly( `note on: %d - vel: %d`, n, val );
        log.silly(nodes)
        break;
    case "noteOff":
        log.silly( `note off: %d`, n);
        break;
    case "cc":
        log.silly( `cc: %d - val: %d`, n, val );
        break;
    default:
        log.silly( "unhandled MIDI command" );
    }
}
