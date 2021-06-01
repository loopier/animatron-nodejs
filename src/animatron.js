const homedir = require('os').homedir + "/";
const fs = require('fs');
const Store = require('electron-store');
const config = new Store();

const {gsap} = require('gsap')
const THREE = require('three')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
const renderer = new THREE.WebGLRenderer();

const osc = require(__dirname + '/src/osc.js');
const nodes = require(__dirname + '/src/node.js');
const seqs = require(__dirname + '/src/imagesequence.js');

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x402220, 1)
document.body.appendChild( renderer.domElement );

camera.position.z = 2;

// --- setters
// config.set('osc.port', 1234);
// config.set('data.path', '/home/roger/.local/share/animatron');
// config.openInEditor();
// --- getters
const datapath = homedir + config.get('data.path') + "/";
const oscmap = JSON.parse(fs.readFileSync( datapath + config.get('data.oscmap') ));
log.info('data path:', datapath);


let seq = seqs.add("mama");
let seqa = seqs.add("mama");
// seqs.list();
// nodes.add("anode", seq);
// nodes.add("onode", seqa);
// let n = nodes.get("onode");
// n.position.x = 1.4
// n.material.color.r = 100
// nodes.list();
// nodes.remove("anode");
// nodes.list();


function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate()


function oscReceived(msg) {
  log.info(msg);
  let addr = msg[0];
  let args = msg.slice(1);
  let cmds = oscmap[addr];
  // log.silly("addr:", addr);
  // log.silly("args:", args);
  // log.silly("cmds:", cmds);
  for(cmd of cmds) {
    let obj = cmd.split(".")[0];
    let func = cmd.split(".")[1];
    // log.silly("cmd:", cmd);
    // log.silly("obj:", obj);
    // log.silly("func:", func);

    if (obj == "node") {
      nodes[func](...args);
    }
  }
  // log.silly("func:", func);
  log.silly(oscmap)


}

function add() {
  log.silly("------------add fn------------")
}

// nodes['add']("anode", seq)
