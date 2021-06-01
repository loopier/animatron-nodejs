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
    nodesmap.set( name, new Node(name, seqs.get(texturename)) );
    scene.add(nodesmap.get(name));
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

function rotate( name, normalizedvalue ) {
    nodesmap.get(name).rotateZ(normalizedvalue * 2 * Math.PI);
}

function moveto( name, x, y) {
    nodesmap.get(name).position.set(x, y);
}

function color( name, r, g, b ) {
    log.silly(r,g,b);
    nodesmap.get(name).material.color.set(r, g, b);
}

module.exports = {
    Node: Node,
    add: add,
    remove: remove,
    list: list,
    get: get,
    rotate: rotate,
    moveto: moveto,
    color: color
}
