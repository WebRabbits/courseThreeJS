'use script';

// ================== 6.1. ДЗ. Добавление позиционного звука на сцену

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const geometry = {
  cylinderGeometry: new THREE.CylinderGeometry(4, 6, 32, 64),
  dodecahedronGeometry: new THREE.DodecahedronGeometry(7, 1),
  ringGeometry: new THREE.RingGeometry(3, 11, 9, 13),
  torusKnotGeometry: new THREE.TorusKnotGeometry(8, 2, 183, 12, 15, 3),
  planeGeometry: new THREE.PlaneGeometry(120, 120),
};

const material = {
  meshToonMaterial: new THREE.MeshToonMaterial({ color: '#3f7b9d' }),
  meshLambertMaterial: new THREE.MeshLambertMaterial({
    color: '#1ac189',
    emissive: '#000000',
    vertexColor: true,
  }),
  meshPhongMaterial: new THREE.MeshPhongMaterial({
    color: '#944d0a',
    emissive: '#000000',
    specular: '#cfb4b4',
    shininess: 100,
    flatShading: true,
  }),
  meshPhysicalMaterial: new THREE.MeshPhysicalMaterial({
    color: '#049ef4',
    emissive: '#000000',
    roughness: 0,
    metalness: 1,
    iridescenceIOR: 1.840873,
    iridescence: 0.76,
  }),
  meshStandardMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff }),
};

const cylinder = new THREE.Mesh(
  geometry.cylinderGeometry,
  material.meshToonMaterial
);
const dodecahedron = new THREE.Mesh(
  geometry.dodecahedronGeometry,
  material.meshLambertMaterial
);
const ring = new THREE.Mesh(geometry.ringGeometry, material.meshPhongMaterial);
const torusKnot = new THREE.Mesh(
  geometry.torusKnotGeometry,
  material.meshPhysicalMaterial
);
const plane = new THREE.Mesh(
  geometry.planeGeometry,
  material.meshStandardMaterial
);

scene.add(cylinder, dodecahedron, ring, torusKnot, plane);

// Размещение плоскости
plane.rotation.x = -Math.PI / 2;
plane.position.y = -17;

// Добавление света
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(10, 10, 10);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(light, ambientLight);

// Настройка тени
renderer.shadowMap.enabled = true;
light.castShadow = true;
cylinder.castShadow = true;
dodecahedron.castShadow = true;
ring.castShadow = true;
torusKnot.castShadow = true;
plane.castShadow = true;
plane.receiveShadow = true;

// Позиционирование тени
light.shadow.mapSize.width = window.innerWidth;
light.shadow.mapSize.height = window.innerHeight;

light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 200;

// Позиционирование объектов
cylinder.position.set(20, 0, 20);
dodecahedron.position.set(-20, 0, -20);
ring.position.set(20, 0, -20);
torusKnot.position.set(-20, 0, 20);

// Добавление аудио. Кнопка включения/отключения звука
let playSound = false;

const playBtn = document.createElement('button');
playBtn.classList.add('play_btn');
playBtn.textContent = 'Play Sound!';
playBtn.style.padding = '10px';
playBtn.style.position = 'absolute';
playBtn.style.top = '2%';
playBtn.style.left = '1%';
playBtn.style.zIndex = '1000';
document.body.append(playBtn);

playBtn.addEventListener('click', playSoundBtn);

function playSoundBtn() {
  if (!playSound) {
    playSound = true;
    playBtn.textContent = '► Playing...';
    sound.play();
    animate();
  } else {
    playSound = false;
    playBtn.textContent = '■ Play Sound!';
    sound.stop();
  }
}

const listener = new THREE.AudioListener();
const sound = new THREE.PositionalAudio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load(
  'https://cdn.freesound.org/previews/724/724845_9900733-lq.ogg',
  function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(1);
  }
);
plane.add(sound);

// Анимация объектов и камеры
function animate() {
  requestAnimationFrame(animate);

  cylinder.rotation.x += 0.02;
  cylinder.rotation.y += 0.02;

  dodecahedron.rotation.x += 0.0025;
  dodecahedron.rotation.y += 0.02;
  dodecahedron.rotation.z += 0.02;

  ring.rotation.x += 0.02;
  ring.rotation.y += 0.02;
  ring.rotation.z += 0.02;

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.03;
  torusKnot.rotation.z += 0.009;

  const angle = Date.now() * 0.001;
  const radius = 50;
  camera.position.x = Math.sin(angle) * radius;
  camera.position.y = 40;
  camera.position.z = Math.cos(angle) * radius;
  camera.lookAt(plane.position);

  renderer.render(scene, camera);
}
