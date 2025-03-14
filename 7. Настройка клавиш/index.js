'use script';

// import * as THREE from 'three';

// Создание сцены, камеры, рендера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

// Создание геометрии и материалы объекта
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 'green' });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Включения поддержки теней в рендере
renderer.shadowMap.enabled = true;

// Обработка клавиш
/**
 * Для обработки события управления клавишами для конкретного объекта - требуется реализовать слушатели нажатия клавиш по событиям:
 * Создаётся базовый объект const keys = {} - который является ХРАНИЛИЩЕМ состояния клавиш, то есть их состояния нажатия true/false в three.js
 * Событие 'keydown' - срабатывает когда клавиша нажата/зажата (отрабатывает многократного пока клавиша зажата)
 * Событие 'keyup' - срабатывает когда клавиша отпущена (отрабатывает однократно)
 */
const keys = {};
window.addEventListener('keydown', (event) => {
  console.log(keys);
  console.log(keys[event.key]);
  keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// Функция анимации и отрисовки
function animate() {
  requestAnimationFrame(animate);
  /**
   * При установки условия нажатия на клавиши:
   * При назначении условия для оси Z - объект будет отдаляться/приближаться в 3D пространстве
   * При назначении условия для оси Y - объект будет перемещаться в верх / вниз в 3D пространстве
   * При назначении условия для оси X - объект будет перемещаться в лево / в право в 3D пространстве
   */

  if (keys['w']) sphere.position.z -= 0.05;
  if (keys['s']) sphere.position.z += 0.05;
  if (keys['w']) sphere.position.y += 0.05;
  if (keys['s']) sphere.position.y -= 0.05;
  if (keys['a']) sphere.position.x -= 0.05;
  if (keys['d']) sphere.position.x += 0.05;

  //   camera.lookAt(sphere.position);
  renderer.render(scene, camera);
}

animate();
