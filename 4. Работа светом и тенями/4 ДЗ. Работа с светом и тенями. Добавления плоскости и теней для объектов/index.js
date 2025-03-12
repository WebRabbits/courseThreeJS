'use script';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 4, 5);
// camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const geometry = {
  cylinderGeometry: new THREE.CylinderGeometry(5, 5, 15, 64),
  boxGeometry: new THREE.BoxGeometry(10, 10, 10),
  torusGeometry: new THREE.TorusGeometry(8, 2, 16, 100),
  planeGeometry: new THREE.PlaneGeometry(180, 180), // Добавление геометрии объекта "ПЛОСКОСТЬ"
};

const material = {
  cylinderMaterial: new THREE.MeshStandardMaterial({ color: '#603BE3' }),
  boxMaterial: new THREE.MeshStandardMaterial({ color: '#15511C' }),
  torusMaterial: new THREE.MeshStandardMaterial({ color: '#E57417' }),
  planeMaterial: new THREE.MeshStandardMaterial({ color: 0xffffff }), // Добавление материала отображения объекта "ПЛОСКОСТЬ"
};

const cylinder = new THREE.Mesh(
  geometry.cylinderGeometry,
  material.cylinderMaterial
);
const box = new THREE.Mesh(geometry.boxGeometry, material.boxMaterial);
const torus = new THREE.Mesh(geometry.torusGeometry, material.torusMaterial);
// Создание объекта "Плоскость" (PlaneGeometry) для отображения тени от объектов
const plane = new THREE.Mesh(geometry.planeGeometry, material.planeMaterial);

// Установка позиции объектов "Цилиндр", "Куб", "Кольцо" по осям X, Y, Z
cylinder.position.set(3, 10, -30);
box.position.set(-25, 10, 10);
torus.position.set(0, 10, 0);

scene.add(cylinder, box, torus, plane);

//// Включение и отображение тени и света
renderer.shadowMap.enabled = true;
// Включаем поддержку и отображение света
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-30, 100, 10);

// Настройка области видимости для теней
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 200;

const ambientLight = new THREE.AmbientLight(0x404040);
// Настройка параметров теней (ТО, КАК будет накладываться тень на динамический формируемый участок фигуры на котором будет отрисовываться тень)
light.shadow.mapSize.width = 2048; // Увеличиваем разрешение карты теней по ширине
light.shadow.mapSize.height = 2048; // Увеличиваем разрешение карты теней по высоте
// Добавляем созданный свет в сцену
scene.add(light, ambientLight);

// Размещение объекта "PlaneGeometry" на плоскости по оси X
plane.rotation.x = -Math.PI / 2;
// Изменение позиции объекта "PlaneGeometry" на плоскости для оси Y (чтобы объект не соприкасался с другими фигурами)
plane.position.y = -10;

// Включение генерации теней
light.castShadow = true; // генерация теней для источника света
cylinder.castShadow = true; // генерация теней для объекта "Цилиндр"
box.castShadow = true; // генерация теней для объекта "Куб"
torus.castShadow = true; // генерация теней для объекта "Кольцо"

// Включение возможности приёма теней для объекта "Plane" на который будет падать тень от объектов
plane.receiveShadow = true;

function animate() {
  requestAnimationFrame(animate);

  cylinder.rotation.x += 0.03;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  box.rotation.x += 0.02;
  box.rotation.z += 0.02;

  torus.rotation.x += 0.07;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  const angle = Date.now() * 0.001;
  const radius = 50; // Радиус отображения камеры
  camera.position.x = Math.sin(angle) * radius;
  camera.position.y = 70; // Угол обзора камеры по оси Y
  camera.position.z = Math.cos(angle) * radius;
  camera.lookAt(torus.position);

  renderer.render(scene, camera);
}

animate();
