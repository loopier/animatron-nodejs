const {gsap} = require('gsap')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x402220, 1)
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock(true);
// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.PlaneGeometry(1,1);
const manager = new THREE.LoadingManager();
const textureloader = new THREE.TextureLoader(manager);
const imgs = new Array(12).fill(0).map((_, index) => {
  return textureloader.load('data/mama/mama-' + ('000' + (index + 1)).substr(-3) + '.png')
})
var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  // map: imgloader.load('data/mama/mama-001.png'),
  map: imgs[1],
  transparent: true,
  side: THREE.DoubleSide
} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
camera.position.z = 5;

let fps = 24
let framerate = clock.getDelta()
let frametime = 0
function animate() {
  requestAnimationFrame( animate );
  // mesh.rotation.z = (mesh.rotation.z + 0.02) % ( Math.PI*2 );
  // var col = gsap.to(material.color, {
  //   duration: 1,
  //   g: material.color.g + 0.1,
  //   repeat: -1
  // })
  // gsap.to(mesh.material, {
  //   duration: 1.4,
  //   // map: imgs[3],
  //   repeat: -1,
  //   onRepeat: () => {
  //     // console.log(counter, imgs[counter] == material.map)
  //     console.log(counter)
  //     counter++
  //     counter %= imgs.length - 1
  //     mesh.material.map = imgs[counter]
  //   }
  // })
  // console.log(clock.getDelta() * 60)
  frametime += clock.getDelta();
  if (frametime > (60/fps/60)) {
    console.log(Math.floor(60*fps/60))
    update()
    frametime = 0
  }
  renderer.render( scene, camera );
}

let counter = 0
function update() {
  counter++
  counter %= imgs.length
  mesh.material.map = imgs[counter]
  var rot = gsap.to(mesh.rotation, {
    duration: 0,
    z: Math.sin(counter/imgs.length),
    repeat: -1
  })
}

animate();
