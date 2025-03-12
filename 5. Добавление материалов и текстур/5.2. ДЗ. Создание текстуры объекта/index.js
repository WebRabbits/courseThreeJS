'use script';

// ================== 5.2. ДЗ. Создание текстуры объекта

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const geometry = new THREE.SphereGeometry(3, 32, 32);

// Подключаем текстуру картинки из URL
const texture = new THREE.TextureLoader().load(
  'https://raw.githubusercontent.com/timoxley/threejs/master/examples/textures/land_ocean_ice_cloud_2048.jpg'
); // Ругается ошибкой из-за кросс-политики:three.min.js:734 SecurityError: Failed to execute 'texImage2D' on 'WebGLRenderingContext': The image element contains cross-origin data, and may not be loaded.
const material = new THREE.MeshBasicMaterial({ map: texture }); // При помощи map - добавляем ранее подключенную текстуру к объекту
const sphere = new THREE.Mesh(geometry, material);

console.log(texture);

scene.add(sphere);

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.005;
  camera.lookAt(sphere.position);

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
