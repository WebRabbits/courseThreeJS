'use strict';

// ================== 3 ДЗ. Создание сцены, камеры, рендера и нескольких объектов (SphereGeometry, CylinderGeometry, BoxGeometry) расположенных на разных позициях

// Инициализация сцены
const scene = new THREE.Scene();
// Создание камеры (угол обзора камеры, соотношение сторон, мин.зум, макс.зум)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Позиция камерны
camera.position.set(10, 12, 50);

// Создание рендера
const renderer = new THREE.WebGLRenderer();
// Установка размера для тега <canvas>
renderer.setSize(window.innerWidth, window.innerHeight);
// Добавление тега <canvas> в DOM
document.body.append(renderer.domElement);

// Объект геометрии содержащий геометрию каждой добавляемой фигуры
const geometry = {
  sphereGeometry: new THREE.SphereGeometry(1.45, 32, 55),
  cylinderGeometry: new THREE.CylinderGeometry(1, 1, 2.75, 55),
  boxGeometry: new THREE.BoxGeometry(3, 3, 3, 3, 100, 100, 100),
};

// Объект материалов содержащий стилизацию каждой добавляемой фигуры
const material = {
  sphereGeometry: new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  }),
  cylinderGeometry: new THREE.MeshBasicMaterial({
    color: 'red',
    wireframe: true,
  }),
  boxGeometry: new THREE.MeshBasicMaterial({
    color: 'white',
    wireframe: true,
  }),
};

// Создание Сферы
const sphere = new THREE.Mesh(geometry.sphereGeometry, material.sphereGeometry);
sphere.position.set(3, 3, 3);
// Создание Цилиндра
const cylinder = new THREE.Mesh(
  geometry.cylinderGeometry,
  material.cylinderGeometry
);
cylinder.position.set(-5, -5, -5);
// Создание куба
const box = new THREE.Mesh(geometry.boxGeometry, material.boxGeometry);
box.position.set(-1, 1, 1);

scene.add(sphere, box, cylinder);

// Функция анимации элементов - вращение по осям X, Y, Z
function animate() {
  requestAnimationFrame(animate);

  //   sphere.rotation.x += 0.02;
  sphere.rotation.x += 0.02;

  box.rotation.x += 0.001;
  box.rotation.y += 0.001;
  box.rotation.z += 0.001;

  cylinder.rotation.x += 0.02;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.05;

  const angle = Date.now() * 0.001;
  camera.position.x = Math.cos(angle) * 2;
  camera.position.z = Math.atan(angle) * 2;
  camera.lookAt(sphere.position);
  camera.lookAt(cylinder.position);
  camera.lookAt(box.position);

  // Отрисовка сцены, камеры
  renderer.render(scene, camera);
}

animate();
