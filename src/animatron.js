const homedir = require('os').homedir + "/";
const fs = require('fs');
const Store = require('electron-store');
const config = new Store();

const {gsap} = require('gsap')
const THREE = require('three')
const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2);
const renderer = new THREE.WebGLRenderer();

const osc = require(__dirname + '/src/osc.js');
const midi = require(__dirname + '/src/midi.js');
const nodes = require(__dirname + '/src/node.js');
const seqs = require(__dirname + '/src/imagesequence.js');

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x402220, 1)
document.body.appendChild( renderer.domElement );

// perspective cam
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.z = 1;

// ortho cam
const size = 10;
const near = 5;
const far = 50;
// const camera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(-size * aspect, size * aspect, size, -size, 0.1, 100);
camera.zoom = 0.2;
camera.position.set(0, 0, 20);

// -----------------------------------------------------------------------------
// config
// -----------------------------------------------------------------------------
// --- setters
// config.set('osc.port', 1234);
// config.set('data.path', '/home/roger/.local/share/animatron');
// config.openInEditor();
// --- getters
const datapath = homedir + config.get('data.path') + "/";
const oscmap = JSON.parse(fs.readFileSync( datapath + config.get('data.oscmap') ));
log.info('data path:', datapath);


function animate() {
  requestAnimationFrame( animate );
  // nodes.update();
  renderer.render( scene, camera );
}

animate()


function oscReceived(msg) {
  // log.silly(msg);
  let addr = msg[0];
  let args = msg.slice(1);
  let cmds = oscmap[addr];
  log.silly("animatron::oscRecieved():", addr, args);
  for(cmd of cmds) {
    let obj = cmd.split(".")[0];
    let func = cmd.split(".")[1];
    if (obj == "node") {
      nodes[func](...args);
    } else if (obj == "sequence") {
      seqs[func](...args);
    }
  }
  // log.silly(oscmap)
}

// -----------------------------------------------------------------------------
// test -- REMOVE
// -----------------------------------------------------------------------------
// nodes.add("anode", "default");
// nodes.add("anode", "mama");
// nodes.add("anode", "hom-up-stairs-bg");
// nodes.add("anodanode", "mama");
// nodes.select("anode");
// nodes.play();

// const aplane =  new THREE.PlaneGeometry(10,10);
// const amat = new THREE.MeshPhongMaterial({color: '#C3A'});
// const amesh = new THREE.Mesh(aplane, amat);
// scene.add(amesh);

seqs.preload("mama", "hom-up-stairs-bg");
// seqs.preload();
// nodes.add("anode", "hom-up-stairs-bg");
// nodes.play();

// let a = 0;
// gsap.to(a, {
//   duration: 1/12,
//   value: 12,
//   repeat: -1,
//   onUpdate: () => { log.silly(a) }
// });

// nodes.list();
// seqs.list();
// var mesh = nodes.get("anode");
// gsap.to(mesh.material, {
//   duration: 12,
//   frameindex: 12,
//   // map: mesh.material.imgs[Math.floor(mesh.material.frameindex)],
//   repeat: -1,
//   ease: "stepped(1)",
//   onUpdate: () => {
//     // log.silly(mesh.material.frameindex);
//     // log.silly(mesh.material.imgs[Math.floor(mesh.material.frameindex)]);
//     mesh.material.map = mesh.material.imgs[Math.floor(mesh.material.frameindex)];
//     // log.silly(mesh.material.imgs[Math.floor(mesh.material.frameindex)].image.src);
//     // log.silly(mesh.material.frameimg.image.src);
//     // log.silly(mesh.material.imgs[mesh.material.frameindex].image);
//     // log.silly(mesh.material.imgs[mesh.material]);
//     // mesh.map = mesh.material.frameimg;
//   }
// })
