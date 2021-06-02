// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );
// camera.position.z = 5;
const nodesmap = new Map();

class Node extends THREE.Mesh {
    constructor( name, texture ){
        super( new THREE.PlaneGeometry(1,1), texture );
        this.name = name;
        // this.texturename: texture.name;
    }
}

function add( name, texturename) {
    log.info("add node:", name);

    // 'seqs' is declared in animatron.js
    if ( seqs.has(texturename) == false ) {
        seqs.add( texturename );
    }

    if ( nodesmap.has(name) ) {
        log.warn(`Node '%s' already exists. Adding texture '%s' to it`, name, texturename);
        nodesmap.get( name ).material = seqs.get(texturename);
    } else {
        log.info(`Add new node '%s' with texture '%s'`, name, texturename);
        nodesmap.set( name, new Node(name, seqs.get(texturename)) );
        scene.add(nodesmap.get(name));
    }
}

function remove( name ) {
    let mesh = nodesmap.get(name);
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
    mesh = undefined;
    nodesmap.delete(name);
    log.info("delete node:", name);
}

function list() {
    log.silly("nodesmap", nodesmap.size);
    for(let k of nodesmap.keys()) {
        let n = nodesmap.get(k);
        log.info(`%s (%s)`, n.name, n.material.name);
    }
}

function get( name ) {
    return nodesmap.get(name);
}

function play( name ) {
    log.silly("------------ node.play -----------", name);
}

function gotoFrame( name, frame ) {
    log.silly("------------ node.goto -----------", name, frame);
    let seq = seqs.get( nodesmap.get(name).material.name );
    seq.setFrame(frame);
    log.silly(seq);
    log.silly(seq.frame);
    // nodesmap.get(name).material.map =
}

function rotate( name, normalizedvalue ) {
    nodesmap.get(name).rotateZ(normalizedvalue * 2 * Math.PI);
}

function moveto( name, x, y) {
    nodesmap.get(name).position.set(x, y);
}

function color( name, r, g, b ) {
    log.silly(r,g,b);
    nodesmap.get(name).material.color.setRGB(r, g, b);
}

module.exports = {
    Node: Node,
    add: add,
    remove: remove,
    list: list,
    get: get,
    play: play,
    gotoFrame: gotoFrame,
    rotate: rotate,
    moveto: moveto,
    color: color
}