const fs = require('fs');
const Path = require('path');
const sequencesmap = new Map();
const manager = new THREE.LoadingManager();
const textureloader = new THREE.TextureLoader(manager);

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
        // this.frame = 0;
        // this.map = this.imgs[this.frame];
        this.frameindex = 0;
        this.frameimg = this.imgs[this.frameindex]
        this.map = this.frameimg;
        this.loop = true;
        this.palindrome = true;
    }

    setFrame( framenumber ) {
        this.frameindex = framenumber % this.imgs.length;
        this.map = this.imgs[this.frameindex];
    }

    play() {
        this.anim = gsap.to(this, {
            duration: 1,
            frameindex: this.imgs.length-1,
            repeat: -1,
            yoyoEase: true,
            // ease: "steps(12)",
            onUpdate: () => {
                // log.silly(this.frameindex);
                this.map = this.imgs[Math.floor( this.frameindex )];
            }
        })
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

function has( name ) {
    return sequencesmap.has( name );
}

module.exports = {
    ImageSequence: ImageSequence,
    add: add,
    remove: remove,
    list: list,
    get: get,
    has: has
}

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------
