
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x0000ff, 1)
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry();
const geometry = new THREE.PlaneGeometry(1,1);
const imgloader = new THREE.TextureLoader()
const material = new THREE.MeshBasicMaterial( {
  color: 0xff0000,
  map: imgloader.load('data/mama/mama-001.png'),
  transparent: true,
  side: THREE.DoubleSide
} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  renderer.render( scene, camera );
}

animate();
