'use script';

// Создание сцены, камеры, рендера
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

// Создание геометрии объектов
const geometry = {
  torusGeometry: new THREE.TorusGeometry(7, 1.5, 10, 7),
  tetrahedronGeometry: new THREE.TetrahedronGeometry(7, 3),
  planeGeometry: new THREE.PlaneGeometry(80, 80),
};

// // Создание текстуры
const texturePlanet = new THREE.TextureLoader().load(
  './img/textureAsteroid.jpg'
);

// Создание материалов объектов
const material = {
  MeshPhongMaterial: new THREE.MeshNormalMaterial(),
  MeshBasicMaterial: new THREE.MeshBasicMaterial({ map: texturePlanet }),
  MeshStandardMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff }),
};

const torus = new THREE.Mesh(
  geometry.torusGeometry,
  material.MeshNormalMaterial
);
const tetrahedron = new THREE.Mesh(
  geometry.tetrahedronGeometry,
  material.MeshBasicMaterial
);
const plane = new THREE.Mesh(
  geometry.planeGeometry,
  material.MeshStandardMaterial
);

// Создание света
const light = new THREE.DirectionalLight(0xffffff, 0.5);
const ambientLight = new THREE.AmbientLight(0x404040);

// Включение поддержки теней
renderer.shadowMap.enabled = true;
light.castShadow = true;
torus.castShadow = true;
plane.receiveShadow = true;
// light.shadow.mapSize.width = window.innerWidth;
// light.shadow.mapSize.height = window.innerHeight;
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 200;

scene.add(torus, tetrahedron, plane, light, ambientLight);

// Позиция элементов
torus.position.set(-20, 0, 20);
tetrahedron.position.set(20, 0, -20);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -7;
camera.position.set(-15, 10, 65);

// Установка клавиш
const keys = {};
window.addEventListener('keydown', (event) => {
  console.log(keys);
  keys[event.code] = true;
});
window.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

// Подключение звука
const playBtn = document.createElement('button');
playBtn.classList.add('play_btn');
playBtn.textContent = 'Play Sound';
playBtn.style.padding = '7px';
playBtn.style.position = 'absolute';
playBtn.style.top = '10px';
playBtn.style.left = '10px';
playBtn.style.zIndex = '1000';
document.body.append(playBtn);

let letsPlay = false;
playBtn.addEventListener('click', function () {
  if (!letsPlay) {
    letsPlay = true;
    this.textContent = '► Playing...';
    sound1.play();
    sound2.play();
    animate();
  } else {
    letsPlay = false;
    this.textContent = 'Stop Playing';
    sound1.stop();
    sound2.stop();
  }
});

// При уходе с активной вкладки - звук приостанавливается
document.addEventListener('visibilitychange', stopAudio);
function stopAudio() {
  let playingOnHide = false;
  if (document.hidden && !playingOnHide) {
    sound1.stop();
    sound2.stop();
  } else {
    sound1.play();
    sound2.play();
  }
}

// Создание двух звуков для двух объектов. Присутствует объёмный эффект при перемещение камеры
const listener = new THREE.AudioListener();
camera.add(listener);
const sound1 = new THREE.PositionalAudio(listener);
const sound2 = new THREE.PositionalAudio(listener);
const audioLoaderAsteroid = new THREE.AudioLoader();
audioLoaderAsteroid.load(
  'https://cdn.freesound.org/previews/789/789421_16936704-lq.ogg',
  function (buffer) {
    sound1.setBuffer(buffer);
    sound1.setLoop(true);
    sound1.setVolume(0.5);
  }
);

const audioLoaderGeometry = new THREE.AudioLoader();
audioLoaderGeometry.load(
  'https://cdn.freesound.org/previews/792/792134_16748437-lq.ogg',
  function (buffer) {
    sound2.setBuffer(buffer);
    sound2.setLoop(true);
    sound2.setVolume(0.5);
  }
);
torus.add(sound2);
tetrahedron.add(sound1);

function animate() {
  requestAnimationFrame(animate);

  if (keys['KeyW']) camera.position.z -= 0.5;
  if (keys['KeyS']) camera.position.z += 0.5;
  if (keys['KeyA']) camera.position.x -= 0.5;
  if (keys['KeyD']) camera.position.x += 0.5;

  camera.lookAt(scene.position);

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.02;
  tetrahedron.rotation.x += 0.007;

  //   const angle = Date.now() * 0.001;
  //   const radius = 20;
  //   camera.position.x = 50;
  //   camera.position.y = 10;
  //   camera.position.z = Math.atan(angle) * radius;

  renderer.render(scene, camera);
}

animate();
