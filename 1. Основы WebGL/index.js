'use strict';

// На основе созданного куба на WebGL - изменить цвет граней и скорость вращения куба по X, Y, Z осям
// https://codepen.io/Gezo/pen/yyLMpEb

var canvas = document.getElementById('webgl');
const gl = canvas.getContext('experimental-webgl');

var vertices = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1,
  1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1,
  1, 1, 1, 1, 1, -1,
];

var colors = [
  // Градиент
  0.0, 0.76, 0.03, 0.32, 0.76, 0.03, 0.32, 0.0, 0.03, 0.32, 0.0, 0.76,
  // Градиент оранжево-жёлтый
  0.75, 0.41, 0.0, 0.71, 0.41, 0.0, 0.71, 0.75, 0.0, 0.71, 0.75, 0.41,
  // Градиент
  0.39, 0.69, 0.0, 0.51, 0.39, 0.69, 0.0, 0.51, 0.39, 0.69, 0.0, 0.51,
  // Градиент оранжево-жёлтый
  1.0, 0.2, 0.2, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2, 1.0, 1.0, 0.2,
  // Градиент цветов
  1.0, 0.4, 0.5, 0.0, 0.4, 0.5, 0.0, 1.0, 0.5, 0.0, 0.1, 0.4,
  // Зелено-белый
  0.0, 2.0, 1.0, 0.0, 3.0, 0.0, 0.0, 2.0, 0.0, 1.0, 3.0, 2.0,
];

var indices = [
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
  15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
];

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var color_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

var index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.bufferData(
  gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(indices),
  gl.STATIC_DRAW
);

var vertCode =
  'attribute vec3 position;' +
  'uniform mat4 Pmatrix;' +
  'uniform mat4 Vmatrix;' +
  'uniform mat4 Mmatrix;' +
  'attribute vec3 color;' +
  'varying vec3 vColor;' +
  'void main(void) { ' +
  'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
  'vColor = color;' +
  '}';

var fragCode =
  'precision mediump float;' +
  'varying vec3 vColor;' +
  'void main(void) {' +
  'gl_FragColor = vec4(vColor, 1.);' +
  '}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);

var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var position = gl.getAttribLocation(shaderProgram, 'position');
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(position);
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var color = gl.getAttribLocation(shaderProgram, 'color');
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(color);
gl.useProgram(shaderProgram);

function get_projection(angle, a, zMin, zMax) {
  var ang = Math.tan((angle * 0.5 * Math.PI) / 180);
  return [
    0.5 / ang,
    0,
    0,
    0,
    0,
    (0.5 * a) / ang,
    0,
    0,
    0,
    0,
    -(zMax + zMin) / (zMax - zMin),
    -1,
    0,
    0,
    (-2 * zMax * zMin) / (zMax - zMin),
    0,
  ];
}

var proj_matrix = get_projection(40, canvas.width / canvas.height, 1, 100);

var mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

view_matrix[14] = view_matrix[14] - 6;

function rotateZ(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[0],
    mv4 = m[4],
    mv8 = m[8];

  m[0] = c * m[0] - s * m[1];
  m[4] = c * m[4] - s * m[5];
  m[8] = c * m[8] - s * m[9];

  m[1] = c * m[1] + s * mv0;
  m[5] = c * m[5] + s * mv4;
  m[9] = c * m[9] + s * mv8;
}

function rotateX(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv1 = m[1],
    mv5 = m[5],
    mv9 = m[9];

  m[1] = m[1] * c - m[2] * s;
  m[5] = m[5] * c - m[6] * s;
  m[9] = m[9] * c - m[10] * s;

  m[2] = m[2] * c + mv1 * s;
  m[6] = m[6] * c + mv5 * s;
  m[10] = m[10] * c + mv9 * s;
}

function rotateY(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[0],
    mv4 = m[4],
    mv8 = m[8];

  m[0] = c * m[0] + s * m[2];
  m[4] = c * m[4] + s * m[6];
  m[8] = c * m[8] + s * m[10];

  m[2] = c * m[2] - s * mv0;
  m[6] = c * m[6] - s * mv4;
  m[10] = c * m[10] - s * mv8;
}

var time_old = 0;

var animate = function (time) {
  var dt = time - time_old;

  // Скорость движения куба по осям
  rotateZ(mov_matrix, dt * 0.0002);
  rotateY(mov_matrix, dt * 0.0004);
  rotateX(mov_matrix, dt * 0.0004);
  time_old = time;

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.clearDepth(1.0);

  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
  gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
  gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  window.requestAnimationFrame(animate);
};
animate(0);
