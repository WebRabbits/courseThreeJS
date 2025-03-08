//// @ts-check

'use strict';

// ================== 4. Работа светом и тенями
// ================== Пример с объектом "Цилиндр"

// Импорт библиотеки three.js
// import * as THREE from 'three';

// Инициализация / создание сцены
const scene = new THREE.Scene();

// Установка камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Установка позиции камеры на сцене.
camera.position.set(5, 4, 5);

// Создание рендера для отображения контента на экране. Создаётся тег <canvas> в DOM из-за добавления рендера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // включение поддержки теней в рендере при отрисовки объектов

document.body.append(renderer.domElement);

//// Создание объекта (фигуры) цилиндр
const geometry = new THREE.CylinderGeometry(1, 1, 3, 55); // Создание геометрического объекта "Цилиндр" при помощи метода CylinderGeometry()
const material = new THREE.MeshStandardMaterial({
  color: 'blue',
  // wireframe: true,
}); // Создание материала, то есть из чего будет состоять объект и как он будет выглядеть.
const cylinder = new THREE.Mesh(geometry, material); // Применение к отдельному объекту при помощи метода Mesh() описанных правил геометрии (geometry) и материала (material).
cylinder.position.y = 1.5; // Позиция объекта смещена по оси Y на значение = 1.5

cylinder.castShadow = true; // Добавление тени к объекту cylinder

scene.add(cylinder); // Добавление объекта "Цилиндр" в сцену (на экран).

//// Создание объекта статической плоскости
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2; // Фича (формула) - позволяет разместить объект на плоскости
plane.position.y = -1.5; // Позиция объекта смещена по оси Y на значение = -1.5
plane.receiveShadow = true;
scene.add(plane);

//// Включение и добавление НАПРАВЛЯЮЩЕГО СВЕТА
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(5, 10, 5); // Установка позиции освещения.
light.castShadow = true; // включение генерации теней от источника нашего света.

//// Настройка параметров теней
light.shadow.mapSize.width = window.innerWidth; // Тень будет адаптивно накладываться на динамический формируемый участок по ширине
light.shadow.mapSize.height = window.innerHeight; // Тень будет адаптивно накладываться на динамический формируемый участок по высоте
scene.add(light); // Добавление созданного света в сцену

//// Включение и добавление АТМОСФЕРНОГО СВЕТА
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Создание функции animate() для создания циклического вращения объекта по осям X, Y, Z
function animate() {
  requestAnimationFrame(animate); // Включение анимации производится при помощи вызова встроенно функции requestAnimationFrame, в которую в виде аргумента передаётся сама функция animate()

  //
  cylinder.rotation.x += 0.03;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  const angle = Date.now() * 0.001;
  const radius = 8;
  camera.position.x = Math.cos(angle) * radius;
  camera.position.y = 4;
  camera.position.z = Math.sin(angle) * radius;
  camera.lookAt(cylinder.position);

  // Добавление рендера (отображения) сцены и камеры при помощи метода .render(). Данная строка ВСЕГДА указывается в самом конце.
  renderer.render(scene, camera);
}

animate();
