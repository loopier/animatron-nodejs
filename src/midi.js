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
        // TODO: take it from the JSON map
        log.silly( `note on: %d - vel: %d`, n, val );
        // nodes.gotoFrame(n);
        // nodes.play(nodes.get);
        // let node = nodes.getNameFromIndex(n);
        // nodes.play(node);
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
