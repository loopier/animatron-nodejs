// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );
// camera.position.z = 5;
const gsap = require('gsap')
const nodesmap = new Map();
const selected = [];
const clock = new THREE.Clock(true);

class Node extends THREE.Mesh {
    constructor( name, texture ){
        super( new THREE.PlaneGeometry(10,10), texture );
        this.name = name;
        // this.position.set(0,0,-10);
        // this.texturename: texture.name;
        // this.fps = 24;
        // this.framerate = clock.getDelta();
        // this.frametime = 0;
    }

    // update() {
        // this.frametime += clock.getDelta();
        // if (frametime > (60/fps/60)) {
        //   // console.log(Math.floor(60*fps/60))
        //   a =
        //   update()
        //   frametime = 0
        // }
    // }
}

function resizeToTexture( name, texturename ) {
    // FIX: !!! cannot find texture.frameimg.imamge ???
    log.silly( "node.resizeToTexture() alo:", name, texturename );
    // log.silly( "node.resizeToTexture() node:", nodesmap.get(name).material.map );
    // log.silly( "node.resizeToTexture() node:", nodesmap.get(name).material.map.image.height );
    let ratio = nodesmap.get(name).material.map.image.width / nodesmap.get(name).material.map.image.height;
    // log.silly("ratio", ratio);
    // log.silly("width", nodesmap.get(name).geometry.parameters);
    nodesmap.get(name).scale.set(ratio, 1, 1);
    // log.silly("width", nodesmap.get(name).geometry.parameters);
    // log.silly( "node.resizeToTexture() seq:", seqs.get(texturename));
    // log.silly( "node.resizeToTexture():", seqs.list());
}

function update() {
    for(node of selected) {
        get(node).update();
    }
}

function createNode( name, texturename ) {
    let node = new Node(name, seqs.get(texturename));
    nodesmap.set( name, node );
    node.material = seqs.get(texturename);
    scene.add(nodesmap.get(name));
    return node;
}

function add( name, texturename ) {
    log.info("add node:", name);
    let node;
    if ( seqs.has(texturename) == false ) {
        log.error("Cannot create node, texture '" + texturename + "' is not loaded")
        alert("Cannot create node, texture '" + texturename + "' is not loaded")
        return false;
    }

    if ( nodesmap.has(name) ) {
        log.warn(`Node '%s' already exists. Adding texture '%s' to it`, name, texturename);
        node = nodesmap.get(name);
        node.material = seqs.get(texturename);
    } else {
        log.info(`Add new node '%s' with texture '%s'`, name, texturename);
        node = createNode( name, texturename );
    }

    resizeToTexture( name, texturename );
    return true;
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

function getByIndex( index ) {
    // should it be from all the nodes or just the selected ones?
    let name = selected[index % selected.length];
    return nodesmap.get(name);
}

function getNameFromIndex( index ) {
    return selected[index % selected.length];
}

function play( name ) {
    if (name != null) {
        log.silly("play", name);
        get(name).material.play();
        return;
    }

    // log.silly("++++++++++++ node.play +++++++++++ selected");
    for(name of selected) {
        play(name);
    }
}

function stop( name ) {
    if(name != null) {
        log.silly("stop: ", name);
        get(name).material.stop()
        return;
    }
    for(name of selected) {
        stop(name);
    }
}

function gotoFrame( frame ) {
    for(name of selected) {
        let seq = seqs.get( nodesmap.get(name).material.name );
        seq.setFrame(frame);
    }
}

function resetRotation() {
    for(name of selected) {
        nodesmap.get(name).rotation.x = 0;
        nodesmap.get(name).rotation.y = 0;
        nodesmap.get(name).rotation.z = 0;
    }
}

function rotate( normalizedvalue ) {
    for(name of selected) {
        nodesmap.get(name).rotateZ(normalizedvalue * 2 * Math.PI);
    }
}

function flipv() {
    for(name of selected) {
        nodesmap.get(name).rotateX(-Math.PI);
    }
}

function fliph() {
    for(name of selected) {
        nodesmap.get(name).rotateY(-Math.PI);
    }
}

function moveto( x, y) {
    for(name of selected) {
        nodesmap.get(name).position.set(x, y);
    }
}

function color( r, g, b ) {
    for(name of selected) {
        log.silly(r,g,b);
        nodesmap.get(name).material.color.setRGB(r, g, b);
    }
}

function select( name ) {
    if(selected.indexOf(name) > -1 || !nodesmap.has(name)) {
        log.warn("Node '%s' doesn't exist or is already selected.", name);
        return;
    }
    selected.push( name );
    log.info("selected nodes:", selected)
}

function deselect( name ) {
    let node = selected.indexOf(name);
    if (node !== -1) { selected.splice(node) }
    log.info("selected nodes:", selected)
}

function listSelected() {
    log.info("selected nodes:", selected);
}

function dur( dur ) {
    for(name of selected) {
        log.silly("'"+name+"' dur:",dur);
        let seq = seqs.get( nodesmap.get(name).material.name );
        seq.setDur(dur);
    }
}

function repeat( repeats ) {
    for(name of selected) {
        log.silly("'"+name+"' repeats:",dur);
        let seq = seqs.get( nodesmap.get(name).material.name );
        seq.setRepeats( repeats );
    }
}

function loop( loop ) {
    for(name of selected) {
        log.silly("'"+name+"' loop:",dur);
        let seq = seqs.get( nodesmap.get(name).material.name );
        if( loop == "inf" ) {
            loop = -1;
        }
        seq.setRepeats( loop );
    }
}


module.exports = {
    Node: Node,
    update: update,
    resizeToTexture: resizeToTexture,
    add: add,
    remove: remove,
    list: list,
    get: get,
    getByIndex: getByIndex,
    getNameFromIndex: getNameFromIndex,
    play: play,
    stop: stop,
    gotoFrame: gotoFrame,
    resetRotation: resetRotation,
    rotate: rotate,
    flipv: flipv,
    fliph: fliph,
    moveto: moveto,
    color: color,
    select: select,
    deselect: deselect,
    selected: listSelected,
    dur: dur,
    repeat: repeat,
    loop: loop
}
