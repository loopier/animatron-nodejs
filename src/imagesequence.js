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
            this.imgs[i] = textureloader.load(
                // path
                this.path + "/" + imgfiles[i],
                // onLoad
                function (obj) {log.silly("loaded:", obj.image.currentSrc)},
                // onProgress
                null,
                // onError
                function (obj) {log.error("Failed to load '%s'", obj.image.currentSrc)}
            );
        }
        this.frameindex = 0;
        this.frameimg = this.imgs[this.frameindex]
        this.map = this.frameimg;
        this.loop = -1;
        this.palindrome = true;

        this.anim = gsap.to(this, {
            duration: 1,
            frameindex: this.imgs.length-1,
            repeat: -1,
            yoyoEase: true,
            // ease: "steps(12)",
            paused: true,
            // onComplete: () => { log.silly(this.frameIndex) },
            // onRepeat: () => { log.silly("REPEAT", this.anim.iteration()) },
            onUpdate: () => {
                // log.silly(this.frameindex);
                this.map = this.imgs[Math.floor( this.frameindex )];
            }
        })
    }

    setFrame( framenumber ) {
        this.frameindex = framenumber % this.imgs.length;
        this.map = this.imgs[this.frameindex];
    }

    setDur ( dur ) {
        this.anim.duration( dur );
    }

    setRepeats ( repeats ) {
        this.anim.repeat( repeats );
    }

    play() {
        this.anim.paused( !this.anim.paused() )
        // if( this.anim. ) {
        //     this.anim.restart();
        // }
    }

    stop() {
        this.anim.pause();
    }
}

function preload( ...names ) {
    // log.silly("preload:", names.length);
    if( names.length > 0 ) {
        log.silly("preloading array", names);
        names.forEach(add);
    } else {
        log.silly("preloading all", names);
        files().forEach(add);
    }
}

function add( name ) {
    let path = datapath + "imgs/" + name;
    if( !fs.existsSync(path) ) {
        log.error("'%s' doesn't exist", path)
        return;
    };
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
    return sequencesmap.keys();
}

/// \brief Return a list of available sequence files (image folders in sequences path).
function files() {
    let path = datapath + "imgs/";
    // let files = [];
    // for(let f of fs.readdirSync(path)) {
    //     log.silly(f);
    //     files.push(f);
    // }
    // log.silly(typeof(files));
    return fs.readdirSync(path);
}

function get( name ) {
    return sequencesmap.get(name);
}

function has( name ) {
    return sequencesmap.has( name );
}

module.exports = {
    ImageSequence: ImageSequence,
    preload: preload,
    add: add,
    remove: remove,
    list: list,
    get: get,
    has: has
}

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------
