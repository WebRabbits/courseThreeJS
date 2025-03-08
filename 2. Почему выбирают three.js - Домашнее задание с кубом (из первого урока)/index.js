'use script';

// На основе куба из первого домашнего задания - изменить цвет граней куба и скорость вращения по осям X, Y, Z НО еа three.js

// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   55,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const colors = [
//   new THREE.MeshBasicMaterial({ color: '#fed6e3' }), // Кремовый
//   new THREE.MeshBasicMaterial({ color: '#4e0980' }), // Тёмно-пурпурный
//   new THREE.MeshBasicMaterial({ color: '#f0950c' }), // Оранжевый
//   new THREE.MeshBasicMaterial({ color: '#361105' }), // Коричневый
//   new THREE.MeshBasicMaterial({ color: '#190b3b' }), // Сиреневый
//   new THREE.MeshBasicMaterial({ color: '#868BA6' }), // Серый
// ];

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// const cube = new THREE.Mesh(cubeGeometry, colors);
// scene.add(cube);

// function animate() {
//   requestAnimationFrame(animate);

//   // Вращаем куб вокруг осей X и Y
//   cube.rotation.x += 0.02;
//   cube.rotation.y += 0.025;

//   renderer.render(scene, camera);
// }

// animate();

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// Подключение (импорт) модуля библиотеки three.js в файл
import * as THREE from 'three';

// Создание сцены, камеры, средства визуализации.
// Создание сцены
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
/** Создание камеры
 * Определяющие аргументы камеры:
 * Первый атрибут (field of view / FOW) - 75 - это поле зрения. Тот масштаб сцены, которая видна на дисплее в любой данный момент времени. ЗНАЧЕНИЕ ПЕРЕДАЁТСЯ В ГРАДУСАХ.
 * Второй атрибут (aspect ratio) - window.innerWidth / window.innerHeight - задаётся соотношение сторон. Данное значение почти всегда задаётся именно такое ПО УМОЛЧАНИЮ, и позволяет создавать объём самого отображения сцены.
 * Третий атрибут (far) - 0.1 - ближняя плоскость отсечения.
 * Четвёртый атрибут (near) - 1000 - дальняя плоскость отсечения.
 * ЭТИ ДВА ПАРАМЕТРА определяют, что объект, находящий дальше от камеры чем значение (far), или ближе чем значение (near) - НЕ БУДУТ отображаться
 */

// Создания средства визуализации.
const renderer = new THREE.WebGLRenderer();

// Установка размера области средства визуализации, в котором будет отображаться само приложение. ЗАДАЁТСЯ ПО ДЕФОЛТУ.
renderer.setSize(window.innerWidth, window.innerHeight);
// Добавление элемента средства визуализации в HTML-документ
document.body.append(renderer.domElement);

////Создание куба

// Создание геометрии куба при помощи BoxGeometry. При изменении значений - можно создавать любые геометрические фигуры из четырёх сторон
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Создание материала, для установка цвета для объекта куба при помощи MeshBasicMaterial. ПОЗВОЛЯЕТ задать массив, который будет включать в себя создание нового экземпляра класса THREE для задания для каждой стороны объекта куба своего цвета.
const material = [
  new THREE.MeshBasicMaterial({ color: 'green' }),
  new THREE.MeshBasicMaterial({ color: 'white' }),
  new THREE.MeshBasicMaterial({ color: 'yellow' }),
  new THREE.MeshBasicMaterial({ color: 'grey' }),
  new THREE.MeshBasicMaterial({ color: 'red' }),
  new THREE.MeshBasicMaterial({ color: 'orange' }),
];
// Создание сетки объекта куба при помощи Mesh(геометрия, материал) который потом можно вставить в созданную ранее сцену.
const cube = new THREE.Mesh(geometry, material);
// Добавление объекта куба с геометрией/материалом в ранее созданную сцену.
scene.add(cube);

// Сдвиг камеры по оси Z.
// По умолчанию, когда мы вызываем scene.add(), то, что мы добавляем, будет добавлено к координатам (0,0,0). Это привело бы к тому, что и камера, и куб оказались бы внутри друг друга. Чтобы избежать этого, мы просто немного cдвигаем камеру.
camera.position.z = 2;

////Рендеринг объекта куба - отрисовка сцены и камеры на экране

// Создание функции animate(), которая при вызове, при помощи функции requestAnimationFrame (в которую передаётся сама функция animate) - позволит вызывать саму функцию animate() каждый раз при загрузке страницы (на обычном экране 60 раз в одну секунду). ТО ЕСТЬ, создаётся цикл рендеринга или анимации.
// При обращении через "Средство визуализации" renderer - вызывается метод .render() библиотеки WebGLRenderer, в которую будет передана для отображения ранее созданная сцена и камера.
// В ИТОГЕ, отобразиться область тега <canvas>
function animate() {
  requestAnimationFrame(animate);

  ////Анимация куба (вращение по оси X, Y, Z)
  // При обращению к объекту куба (имеющий свою геометрию и материал(цвет)) - задаётся угол наклона по каждой из осей X, Y, Z.
  // Всё то, что требуется ПЕРЕМЕСТИТЬ или ИЗМЕНИТЬ во время работы приложения - должно пройти через цикл. И именно поэтому, установка угла наклона по осям производится до момента рендера и пройти через цикл анимации.
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.03;
  cube.rotation.z += 0.04;
  renderer.render(scene, camera);
}
animate();
