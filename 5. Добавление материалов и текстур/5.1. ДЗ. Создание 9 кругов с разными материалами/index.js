'use script';

// ================== 5.1. ДЗ. Создание 9 кругов с разными материалами

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  95,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

// Создание геометрии объектов
const geometry = {
  sphereGeometry: new THREE.SphereGeometry(6, 32, 32),
  planeGeometry: new THREE.PlaneGeometry(80, 80),
};

// 049ef4
// Установка разных типов материалов для объектов
const material = {
  basicMaterial: new THREE.MeshBasicMaterial({ color: '#049ef4' }),
  lambertMaterial: new THREE.MeshLambertMaterial({ color: '#049ef4' }),
  phongMaterial: new THREE.MeshPhongMaterial({ color: '#049ef4' }),
  phongMaterialshininess_0: new THREE.MeshPhongMaterial({
    color: '#049ef4',
    shininess: 0,
  }),
  phongMaterialshininess_30: new THREE.MeshPhongMaterial({
    color: '#049ef4',
    shininess: 30,
  }),
  phongMaterialshininess_15: new THREE.MeshPhongMaterial({
    color: '#049ef4',
    shininess: 150,
  }),
  standardMaterial_0: new THREE.MeshStandardMaterial({
    color: '#049ef4',
    roughness: 0,
    metalness: 0,
  }),
  standardMaterial_0_5: new THREE.MeshStandardMaterial({
    color: '#049ef4',
    roughness: 0.5,
    metalness: 0.5,
  }),
  standardMaterial_1: new THREE.MeshStandardMaterial({
    color: '#049ef4',
    roughness: 1,
    metalness: 1,
  }),
  planeMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff }),
};

// Добавление свойств геометрии и материалов к созданным объектам
const sphere = {
  sphere1: new THREE.Mesh(geometry.sphereGeometry, material.basicMaterial),
  sphere2: new THREE.Mesh(geometry.sphereGeometry, material.lambertMaterial),
  sphere3: new THREE.Mesh(geometry.sphereGeometry, material.phongMaterial),
  sphere4: new THREE.Mesh(
    geometry.sphereGeometry,
    material.phongMaterialshininess_0
  ),
  sphere5: new THREE.Mesh(
    geometry.sphereGeometry,
    material.phongMaterialshininess_15
  ),
  sphere6: new THREE.Mesh(
    geometry.sphereGeometry,
    material.phongMaterialshininess_30
  ),
  sphere7: new THREE.Mesh(geometry.sphereGeometry, material.standardMaterial_0),
  sphere8: new THREE.Mesh(
    geometry.sphereGeometry,
    material.standardMaterial_0_5
  ),
  sphere9: new THREE.Mesh(geometry.sphereGeometry, material.standardMaterial_1),
};

const plane = new THREE.Mesh(geometry.planeGeometry, material.planeMaterial);

// Позиционирование объектов по сетки 3х3
sphere.sphere1.position.set(20, 0, 20);
sphere.sphere2.position.set(20, 0, 0);
sphere.sphere3.position.set(20, 0, -20);
sphere.sphere4.position.set(0, 0, 20);
sphere.sphere5.position.set(0, 0, 0);
sphere.sphere6.position.set(0, 0, -20);
sphere.sphere7.position.set(-20, 0, 0);
sphere.sphere8.position.set(-20, 0, 20);
sphere.sphere9.position.set(-20, 0, -20);

// Добавление объектов с назначенными свойствами (геометрии, материалов) в сцену
scene.add(
  sphere.sphere1,
  sphere.sphere2,
  sphere.sphere3,
  sphere.sphere4,
  sphere.sphere5,
  sphere.sphere6,
  sphere.sphere7,
  sphere.sphere8,
  sphere.sphere9,
  plane
);

// Размещение плоскости по горизонтали и отдаление плоскости от объектов по оси Y
plane.rotation.x = -Math.PI / 2;
plane.position.y = -7.5;

// Добавление света
const light = new THREE.DirectionalLight(0xffffff, 0.5);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(light, ambientLight);
// light.position.set(5, 5, 5);

// Включение функционала принятия и отражение теней от объектов на плоскость
renderer.shadowMap.enabled = true;
light.castShadow = true;
// console.log(sphere.sphere1);
for (const objSpehere of Object.entries(sphere)) {
  console.log(objSpehere[1]);
  objSpehere[1].castShadow = true;
}
plane.castShadow = true;
plane.receiveShadow = true; // Включение функции принятия тени на плоскость от объектов

// Работа с камерой
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 200;

light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

function animate() {
  requestAnimationFrame(animate);

  // for (const objSpehere of Object.entries(sphere)) {
  //   objSpehere[1].rotation.x += 0.02;
  //   objSpehere[1].rotation.y += 0.02;
  //   objSpehere[1].rotation.z += 0.02;
  // }

  const angle = Date.now() * 0.001;
  const radius = 40;
  camera.position.x = Math.sin(angle) * radius;
  camera.position.y = 25;
  camera.position.z = Math.cos(angle) * radius;

  camera.lookAt(sphere.sphere5.position);

  renderer.render(scene, camera);
}

animate();
