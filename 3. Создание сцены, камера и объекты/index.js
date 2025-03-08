'use strict';

// ================== 3. Создание сцены, камера и объекты

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
console.log(renderer);
document.body.append(renderer.domElement);

// Создание объекта (фигуры) цилиндр
const geometry = new THREE.CylinderGeometry(1, 1, 3, 55); // Создание геометрического объекта "Цилиндр" при помощи метода CylinderGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 'blue',
  // wireframe: true,
}); // Создание материала, то есть из чего будет состоять объект и как он будет выглядеть.
const cylinder = new THREE.Mesh(geometry, material); // Применение к отдельному объекту при помощи метода Mesh() описанных правил геометрии (geometry) и материала (material).

scene.add(cylinder); // Добавление объекта "Цилиндр" в сцену (на экран).

// Создание функции animate() для создания циклического вращения объекта по осям X, Y, Z
function animate() {
  requestAnimationFrame(animate); // Включение анимации производится при помощи вызова встроенно функции requestAnimationFrame, в которую в виде аргумента передаётся сама функция animate()

  //
  cylinder.rotation.x += 0.03;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  const angle = Date.now() * 0.001;
  camera.position.x = Math.cos(angle) * 2;
  camera.position.z = Math.atan(angle) * 2;
  camera.lookAt(cylinder.position);

  // Добавление рендера (отображения) сцены и камеры при помощи метода .render(). Данная строка ВСЕГДА указывается в самом конце.
  renderer.render(scene, camera);
}

animate();
