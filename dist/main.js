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

eval("module.exports = \"<svg id=\\\"noise-svg\\\" class=\\\"__3ZPbiMS__full-window \\\" style=\\\"opacity: 0.75; width: 100%; height: 100%\\\"><filter id=\\\"bg-noise\\\" x=\\\"0%\\\" y=\\\"0%\\\" width=\\\"100%\\\" height=\\\"100%\\\"><feTurbulence id=\\\"bg-turbulence\\\" type=\\\"fractalNoise\\\" result=\\\"bgTurbulence\\\" baseFrequency=\\\"0.3\\\"></feTurbulence></filter><rect x=\\\"0\\\" y=\\\"0\\\" width=\\\"100%\\\" height=\\\"100%\\\" filter=\\\"url(#bg-noise)\\\" fill=\\\"transparent\\\"></rect></svg>\"\n\n//# sourceURL=webpack:///./src/perlin_noise.svg?./node_modules/svg-inline-loader?classPrefix");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-inline-loader?classPrefix!./perlin_noise.svg */ \"./node_modules/svg-inline-loader/index.js?classPrefix!./src/perlin_noise.svg\");\n/* harmony import */ var svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0__);\n\n\n(function (window) {\n  console.log('asdf');\n  window.ParticleTracks = {};\n\n  ParticleTracks.init = function (_ref) {\n    var _ref$container = _ref.container,\n        container = _ref$container === void 0 ? '' : _ref$container;\n    ParticleTracks.container = document.getElementById(container);\n    ParticleTracks.container.innerHTML += svg_inline_loader_classPrefix_perlin_noise_svg__WEBPACK_IMPORTED_MODULE_0___default.a;\n  };\n})(window);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });