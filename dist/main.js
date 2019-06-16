/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/svg-inline-loader/index.js?classPrefix!./src/perlin_noise.svg":
/*!***************************************************************************!*\
  !*** ./node_modules/svg-inline-loader?classPrefix!./src/perlin_noise.svg ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<svg id=\\\"particle-tracks-perlin-noise-svg\\\"><filter id=\\\"bg-noise\\\" x=\\\"0%\\\" y=\\\"0%\\\" width=\\\"100%\\\" height=\\\"100%\\\"><feTurbulence id=\\\"particle-tracks-perlin-turbulence\\\" type=\\\"fractalNoise\\\" result=\\\"bgTurbulence\\\" baseFrequency=\\\"0.3\\\"></feTurbulence></filter><rect x=\\\"0\\\" y=\\\"0\\\" width=\\\"100%\\\" height=\\\"100%\\\" filter=\\\"url(#bg-noise)\\\" fill=\\\"transparent\\\"></rect></svg>\"\n\n//# sourceURL=webpack:///./src/perlin_noise.svg?./node_modules/svg-inline-loader?classPrefix");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _perlin_noise_layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perlin_noise_layer */ \"./src/perlin_noise_layer.js\");\n/* harmony import */ var _particle_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle_canvas */ \"./src/particle_canvas.js\");\n/* harmony import */ var _particle_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particle_generator */ \"./src/particle_generator.js\");\n\n\n\n\n(function (window) {\n  window.ParticleTracks = {};\n\n  ParticleTracks.init = function (_ref) {\n    var _ref$container = _ref.container,\n        container = _ref$container === void 0 ? '' : _ref$container;\n    ParticleTracks.container = document.getElementById(container); // Initialize Perlin Noise Layer\n\n    ParticleTracks.noiseLayer = new _perlin_noise_layer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ParticleTracks.container);\n    ParticleTracks.noiseLayer.init(); // Iniialize Particle Canvas\n\n    ParticleTracks.particleCanvas = new _particle_canvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ParticleTracks.container);\n    ParticleTracks.particleCanvas.init(); // Initialize active particles list\n\n    ParticleTracks.activeParticles = []; // Initialize particle generator\n\n    ParticleTracks.generator = new _particle_generator__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    ParticleTracks.generator.init();\n\n    window.onresize = function () {\n      ParticleTracks.noiseLayer.resize();\n      ParticleTracks.particleCanvas.prepareContext(ParticleTracks.container);\n    };\n\n    console.log('Particle tracks visualization initiated.');\n  };\n})(window);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/particle.js":
/*!*************************!*\
  !*** ./src/particle.js ***!
  \*************************/
/*! exports provided: Electron, Positron, Muon, Photon, Proton, Neutron */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Electron\", function() { return Electron; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Positron\", function() { return Positron; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Muon\", function() { return Muon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Photon\", function() { return Photon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Proton\", function() { return Proton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Neutron\", function() { return Neutron; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// Particles\nvar Particle =\n/*#__PURE__*/\nfunction () {\n  function Particle(x_0, y_0, z_0, vel_x, vel_y, vel_z, charge, mass) {\n    _classCallCheck(this, Particle);\n\n    // Physical properties\n    this.mass = mass;\n    this.charge = charge;\n    this.chargeToMassRatio = charge / mass; // Last position (only x and y needed)\n\n    this.x_prev = x_0;\n    this.y_prev = y_0; // Current velocity\n\n    this.v_x = vel_x;\n    this.v_y = vel_y;\n    this.v_z = vel_z; // Current position\n    // TODO: abstract out Vector3D class instead of handling vectors component-wise etc.\n\n    this.x = this.x_prev + this.v_x;\n    this.y = this.y_prev + this.v_y;\n    this.z = z_0;\n  }\n\n  _createClass(Particle, [{\n    key: \"absVelocity\",\n    value: function absVelocity() {\n      return Math.sqrt(Math.pow(this.v_x, 2) + Math.pow(this.v_y, 2));\n    }\n  }, {\n    key: \"stopped\",\n    value: function stopped() {\n      return this.absVelocity() <= 2.5;\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      // Possibly particle decay\n      if (this.decayProbability != undefined && this.decayProbability > Math.random()) {\n        this.decay();\n        return;\n      } // Stop rendering this particle if out of bounds or stopped\n\n\n      var out_of_x = this.x > 2 * ParticleTracks.width || this.x < -1 * ParticleTracks.width;\n      var out_of_y = this.y > 2 * ParticleTracks.height || this.y < -1 * ParticleTracks.height;\n      var out_of_z = Math.abs(this.z) > 3;\n\n      if (out_of_x || out_of_y || out_of_z || this.stopped()) {\n        var index = ParticleTracks.activeParticles.indexOf(this); // Remove from list of active particles\n\n        ParticleTracks.activeParticles.splice(index, 1);\n        return;\n      }\n\n      this.x_prev = this.x;\n      this.y_prev = this.y; // Update the position\n\n      this.x = this.x_prev + this.v_x;\n      this.y = this.y_prev + this.v_y;\n      this.z = this.z + this.v_z; // Update velocity (but not for massless particles)\n\n      if (this.mass != 0) {\n        // Magnetic field strenght, a bit assymmetric\n        var B_x = 0.1;\n        var B_y = 0.13; // Acceleration\n\n        var a_x = this.chargeToMassRatio * this.v_y * B_x;\n        var a_y = -1 * this.chargeToMassRatio * this.v_x * B_y; // \"Drag\" -- velocity lost to particle interactions\n\n        var drag = 0.5 + 0.001 * Math.pow(this.absVelocity(), 2);\n        var drag_x = drag * this.v_x / this.absVelocity();\n        var drag_y = drag * this.v_y / this.absVelocity(); // Update velocity\n\n        this.v_x = this.v_x + a_x - drag_x;\n        this.v_y = this.v_y + a_y - drag_y;\n      }\n    }\n  }]);\n\n  return Particle;\n}();\n\n;\n\nvar Electron =\n/*#__PURE__*/\nfunction (_Particle) {\n  _inherits(Electron, _Particle);\n\n  function Electron(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    _classCallCheck(this, Electron);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Electron).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, -1, 0.5));\n  }\n\n  return Electron;\n}(Particle);\n\nvar Positron =\n/*#__PURE__*/\nfunction (_Particle2) {\n  _inherits(Positron, _Particle2);\n\n  function Positron(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    _classCallCheck(this, Positron);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Positron).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 1, 0.5));\n  }\n\n  return Positron;\n}(Particle);\n\nvar Muon =\n/*#__PURE__*/\nfunction (_Particle3) {\n  _inherits(Muon, _Particle3);\n\n  function Muon(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    var _this;\n\n    _classCallCheck(this, Muon);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Muon).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, -1, 500));\n    _this.decayProbability = 0.02;\n    return _this;\n  } // Decays into one electron (and some neutrinos which we ignore)\n\n\n  _createClass(Muon, [{\n    key: \"decay\",\n    value: function decay() {\n      var e = new Electron(this.x, this.y, this.z, this.v_x * 0.5, this.v_y * 0.5, this.v_z * 0.5);\n      ParticleTracks.activeParticles.push(e);\n      this.v_x = 0;\n      this.v_y = 0;\n    }\n  }]);\n\n  return Muon;\n}(Particle);\n\nvar Photon =\n/*#__PURE__*/\nfunction (_Particle4) {\n  _inherits(Photon, _Particle4);\n\n  function Photon(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    var _this2;\n\n    _classCallCheck(this, Photon);\n\n    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Photon).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 0, 0));\n    _this2.decayProbability = 0.3;\n    return _this2;\n  }\n\n  _createClass(Photon, [{\n    key: \"decay\",\n    // Really some hand-wavy pair production that looks cool\n    value: function decay() {\n      var e = new Electron(this.x, this.y, this.z, this.v_x * 0.5, this.v_y * 0.5, this.v_z * 0.5);\n      var p = new Positron(this.x, this.y, this.z, this.v_x * 0.5, this.v_y * 0.5, this.v_z * 0.5);\n      ParticleTracks.activeParticles.push(e, p);\n      this.v_x = 0;\n      this.v_y = 0;\n    }\n  }]);\n\n  return Photon;\n}(Particle);\n\n;\n\nvar Proton =\n/*#__PURE__*/\nfunction (_Particle5) {\n  _inherits(Proton, _Particle5);\n\n  function Proton(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    _classCallCheck(this, Proton);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Proton).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 1, 900));\n  }\n\n  return Proton;\n}(Particle);\n\nvar Neutron =\n/*#__PURE__*/\nfunction (_Particle6) {\n  _inherits(Neutron, _Particle6);\n\n  function Neutron(pos_x, pos_y, pos_z, vel_x, vel_y, vel_z) {\n    var _this3;\n\n    _classCallCheck(this, Neutron);\n\n    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Neutron).call(this, pos_x, pos_y, pos_z, vel_x, vel_y, vel_z, 0, 900));\n    _this3.decayProbability = 0.05;\n    return _this3;\n  }\n\n  _createClass(Neutron, [{\n    key: \"decay\",\n    // Free neutron beta decay\n    value: function decay() {\n      var e = new Electron(this.x, this.y, this.z, this.v_x * 0.6, this.v_y * 0.6, this.v_z * 0.6);\n      var p = new Proton(this.x, this.y, this.z, this.v_x * 0.7, this.v_y * 0.7, this.v_z * 0.6);\n      ParticleTracks.activeParticles.push(e, p);\n      this.v_x = 0;\n      this.v_y = 0;\n    }\n  }]);\n\n  return Neutron;\n}(Particle);\n\n;\n\n\n//# sourceURL=webpack:///./src/particle.js?");

/***/ }),

/***/ "./src/particle_canvas.js":
/*!********************************!*\
  !*** ./src/particle_canvas.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ParticleCanvas =\n/*#__PURE__*/\nfunction () {\n  function ParticleCanvas(container) {\n    _classCallCheck(this, ParticleCanvas);\n\n    this.container = container;\n  }\n\n  _createClass(ParticleCanvas, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n\n      this.prepareContext(this.container);\n      setInterval(function () {\n        return _this.drawParticles();\n      }, 25);\n      setInterval(function () {\n        return _this.fadeOut();\n      }, 250); //window.onresize = () => this.prepareContext(this.container);\n    }\n  }, {\n    key: \"prepareContext\",\n    value: function prepareContext(container) {\n      console.log(\"resize\"); // Initialize canvas to the correct dpr-scaled size\n\n      var dpr = window.devicePixelRatio || 1;\n      var canvas = document.createElement('canvas');\n      canvas.id = 'particle-tracks-particle-canvas';\n      container.appendChild(canvas);\n      canvas = document.getElementById('particle-tracks-particle-canvas');\n      canvas.style.position = 'absolute';\n      canvas.style.top = 0;\n      canvas.style.left = 0;\n      canvas.style.width = '100%';\n      canvas.style.height = '100%';\n      var rect = canvas.getBoundingClientRect(); // Have to store the global width and height before scaling with dpr\n\n      ParticleTracks.width = rect.width;\n      ParticleTracks.height = rect.width;\n      canvas.width = rect.width * dpr;\n      canvas.height = rect.height * dpr; // Set canvas\n\n      this.canvas = canvas;\n      var context = canvas.getContext(\"2d\");\n      context.scale(dpr, dpr);\n      context.fillStyle = \"yellow\";\n      context.fillRect(0, 0, this.canvas.width, this.canvas.height); // Set context\n\n      this.context = context;\n    }\n  }, {\n    key: \"drawParticles\",\n    value: function drawParticles() {\n      var _this2 = this;\n\n      ParticleTracks.activeParticles.forEach(function (particle) {\n        _this2.draw(particle);\n\n        particle.update();\n      });\n    }\n  }, {\n    key: \"draw\",\n    // Set up and draw a particle for one frame of movement.\n    value: function draw(particle) {\n      // Don't draw massless particles, stopped particles\n      if (particle.mass == 0 || particle.stopped()) return;\n      var ctx = this.context; // Line Width based on particle size, z position\n\n      var lineWidth = 10 + 0.0075 * particle.mass - particle.z;\n      ctx.lineWidth = lineWidth;\n      ctx.lineCap = 'round';\n      ctx.beginPath();\n      ctx.moveTo(particle.x_prev, particle.y_prev);\n      ctx.lineTo(particle.x, particle.y);\n      ctx.strokeStyle = this.particleTrackGradient(particle.x_prev, particle.x, particle.y_prev, particle.y, lineWidth);\n      ctx.stroke();\n      ctx.closePath();\n    }\n  }, {\n    key: \"particleTrackGradient\",\n    // Prepare linear gradient perpendicular to particle path (for nice\n    //   blue-to-black effect on particle tracks)\n    value: function particleTrackGradient(x_i, x_f, y_i, y_f, lineWidth) {\n      var dx = x_i - x_f;\n      var dy = y_i - y_f;\n      var dist = Math.sqrt(dx * dx + dy * dy);\n      dx = dx / dist;\n      dy = dy / dist;\n      var x3 = x_i + lineWidth / 2 * dy;\n      var y3 = y_i - lineWidth / 2 * dx;\n      var x4 = x_i - lineWidth / 2 * dy;\n      var y4 = y_i + lineWidth / 2 * dx; // Particle tracks are blue in the center, with fading black edges\n\n      var gradient = this.context.createLinearGradient(x4, y4, x3, y3);\n      gradient.addColorStop(0, '#ffffff00');\n      gradient.addColorStop(0.3 - Math.random() * 0.05, 'black');\n      gradient.addColorStop(0.45, '#01A1FE');\n      gradient.addColorStop(0.55, '#01A1FE');\n      gradient.addColorStop(0.7 + Math.random() * 0.05, 'black');\n      gradient.addColorStop(1, '#ffffff00');\n      return gradient;\n    }\n  }, {\n    key: \"fadeOut\",\n    // Fade particle tracks.\n    value: function fadeOut() {\n      this.context.fillStyle = \"rgba(255,255,0,0.2)\";\n      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n  }]);\n\n  return ParticleCanvas;\n}();\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ParticleCanvas);\n\n//# sourceURL=webpack:///./src/particle_canvas.js?");

/***/ }),

/***/ "./src/particle_generator.js":
/*!***********************************!*\
  !*** ./src/particle_generator.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ \"./src/particle.js\");\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar ParticleGenerator =\n/*#__PURE__*/\nfunction () {\n  function ParticleGenerator() {\n    _classCallCheck(this, ParticleGenerator);\n\n    this.generateParticleTypes = [_particle__WEBPACK_IMPORTED_MODULE_0__[\"Positron\"], _particle__WEBPACK_IMPORTED_MODULE_0__[\"Muon\"], _particle__WEBPACK_IMPORTED_MODULE_0__[\"Photon\"], _particle__WEBPACK_IMPORTED_MODULE_0__[\"Proton\"], _particle__WEBPACK_IMPORTED_MODULE_0__[\"Neutron\"]];\n  }\n\n  _createClass(ParticleGenerator, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n\n      this.createParticle();\n      setInterval(function () {\n        return _this.createParticle();\n      }, 1000 + Math.random() * 1000);\n    }\n  }, {\n    key: \"createParticle\",\n    value: function createParticle() {\n      var particleClass = selectFromArray(this.generateParticleTypes); // TODO: choose random energies within range, use momentum to decide velocity\n      //        for more realistic distribution.\n\n      var vMax = 30;\n      var vMin = 20;\n      var randomV = vMin + Math.random() * vMax;\n      var randomV2 = vMin + Math.random() * vMax;\n      var xMax = ParticleTracks.width;\n      var yMax = ParticleTracks.height;\n      var zMax = 1;\n      var randomX = xMax * Math.random();\n      var randomY = yMax * Math.random();\n      var randomZ = zMax * Math.random();\n      var randomVz = 0.1 * Math.random() * -1 * randomZ / Math.abs(randomZ);\n      var possibleStartingPositions = [//left\n      [0, randomY, randomZ, randomV, randomV2, randomVz], //top\n      [randomX, 0, randomZ, randomV2, randomV, randomVz], //right\n      [xMax, randomY, randomZ, -randomV, randomV2, randomVz], //bottom\n      [randomX, yMax, randomZ, -randomV2, randomV, randomVz]];\n      var startArgs = selectFromArray(possibleStartingPositions);\n      ParticleTracks.activeParticles.push(_construct(particleClass, _toConsumableArray(startArgs)));\n    }\n  }]);\n\n  return ParticleGenerator;\n}();\n\n;\n\nfunction selectFromArray(array) {\n  return array[Math.floor(Math.random() * array.length)];\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ParticleGenerator);\n\n//# sourceURL=webpack:///./src/particle_generator.js?");

/***/ }),

/***/ "./src/perlin_noise_layer.js":
/*!***********************************!*\
  !*** ./src/perlin_noise_layer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-inline-loader?classPrefix!./perlin_noise.svg */ \"./node_modules/svg-inline-loader/index.js?classPrefix!./src/perlin_noise.svg\");\n/* harmony import */ var svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar PerlinNoiseLayer =\n/*#__PURE__*/\nfunction () {\n  function PerlinNoiseLayer(container) {\n    _classCallCheck(this, PerlinNoiseLayer);\n\n    this.targetContainer = container;\n    this.perlinSeed = 0;\n    this.filterTurbulence = null;\n  }\n\n  _createClass(PerlinNoiseLayer, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n\n      this.targetContainer.innerHTML += svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0___default.a;\n      var svgElem = document.getElementById('particle-tracks-perlin-noise-svg');\n      this.svg = svgElem;\n      this.setupSVG(svgElem);\n      this.filterTurbulence = document.getElementById('particle-tracks-perlin-turbulence');\n      setInterval(function () {\n        return _this.updateNoise();\n      }, 500);\n    }\n  }, {\n    key: \"resize\",\n    value: function resize() {\n      var rect = this.targetContainer.getBoundingClientRect();\n      this.svg.style.width = rect.width;\n      this.svg.style.height = rect.height;\n    }\n  }, {\n    key: \"setupSVG\",\n    value: function setupSVG(svg) {\n      var rect = this.targetContainer.getBoundingClientRect();\n      svg.style.position = 'absolute';\n      svg.style.top = rect.top;\n      svg.style.left = rect.left;\n      svg.style.width = rect.width;\n      svg.style.height = rect.height;\n      svg.style.zIndex = 1;\n      svg.style.opacity = 0.75;\n    } // Make the Perlin noise background dynamic\n\n  }, {\n    key: \"getPerlinSeed\",\n    value: function getPerlinSeed() {\n      this.perlinSeed = (this.perlinSeed + 1) % 100;\n      return this.perlinSeed;\n    }\n  }, {\n    key: \"updateNoise\",\n    value: function updateNoise() {\n      this.filterTurbulence.setAttribute('seed', this.getPerlinSeed());\n    }\n  }]);\n\n  return PerlinNoiseLayer;\n}();\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PerlinNoiseLayer);\n\n//# sourceURL=webpack:///./src/perlin_noise_layer.js?");

/***/ })

/******/ });