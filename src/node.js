// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );
// camera.position.z = 5;
const gsap = require('gsap')
const nodesmap = new Map();
const selected = [];
const clock = new THREE.Clock(true);

class Node extends THREE.Mesh {
    constructor( name, texture ){
        super( new THREE.PlaneGeometry(1,1), texture );
        this.name = name;
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
        log.silly("------------ node.play -----------", name);
        get(name).material.play();
        // let mesh = get(name);
        // log.silly(mesh.material.name);
        // log.silly(mesh.material.map.image.src);
        // log.silly(mesh.material.map.image.src);
        // log.silly(mesh.material.imgs[08].image.src);
        // log.silly(mesh.material.frameindex);
        // log.silly(mesh.material);
        // log.silly(mesh.material.map === mesh.material.frameimg);
        // mesh.material.map = mesh.material.imgs[08];
        // gsap.to(mesh.material, {
        //     duration: 1.4,
        //     map: 11,
        //     repeat: 12,
        //     onUpdate: () => {
        //         log.silly("alo")
        //         mesh.map = mesh.material.frameimg;
        //     }
        // })
        return;
    }

    log.silly("++++++++++++ node.play +++++++++++ selected");
    for(name of selected) {
        play(name);
    }
}

function gotoFrame( frame ) {
    for(name of selected) {
        let seq = seqs.get( nodesmap.get(name).material.name );
        seq.setFrame(frame);
    }
}

function rotate( normalizedvalue ) {
    for(name of selected) {
        nodesmap.get(name).rotateZ(normalizedvalue * 2 * Math.PI);
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
    selected.push( name );
    log.info("selected nodes:", selected)
}

function deselect( name ) {
    let node = selected.indexOf(name);
    if (node !== -1) { selected.splice(node) }
    log.info("selected nodes:", selected)
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
    gotoFrame: gotoFrame,
    rotate: rotate,
    moveto: moveto,
    color: color,
    select: select,
    deselect: deselect
}
