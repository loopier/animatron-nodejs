const fs = require('fs');
const Path = require('path');
const sequencesmap = new Map();
const manager = new THREE.LoadingManager();
const textureloader = new THREE.TextureLoader(manager);

// var material = new THREE.MeshBasicMaterial( {
//   color: 0xffffff,
//   // map: imgloader.load('data/mama/mama-001.png'),
//   map: imgs[1],
//   transparent: true,
//   side: THREE.DoubleSide
// } );

class ImageSequence extends THREE.MeshBasicMaterial {
    constructor( name, path, digits=3 ) {
        super({
            color: 0xffffff,
            transparent: true,
            side: THREE.DoubleSide
        });
        this.name = name;
        this.path = path;
        let imgfiles = fs.readdirSync(this.path);
        this.imgs = new Array(imgfiles.length);
        for(let i=0; i < this.imgs.length; i++) {
            this.imgs[i] = textureloader.load(this.path + "/" + imgfiles[i]);
        }
        this.map = this.imgs[0];
    }
}

function add( name ) {
    let path = datapath + "/imgs/" + name;
    log.info(`add image sequence: '%s' from: '%s'`, name, path);
    sequencesmap.set( name, new ImageSequence(name, path) );
    return sequencesmap.get(name);
}

function remove( name ) {
    log.info("delete node:", name);
    seqs.delete(name);
}

function list() {
    log.info("image sequences", sequencesmap.size);
    for(let k of sequencesmap.keys()) {
        log.info(sequencesmap.get(k).name);
    }
}

function get( name ) {
    return sequencesmap.get(name);
}

module.exports = {
    ImageSequence: ImageSequence,
    add: add,
    remove: remove,
    list: list,
    get: get
}

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------
