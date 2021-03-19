/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatetraining_project"]("main",{

/***/ "./src/modules/togglePopup.js":
/*!************************************!*\
  !*** ./src/modules/togglePopup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//задаём функцию\nvar togglePopup = function togglePopup() {\n  // получаем элементы со страницы\n  var popup = document.querySelector('.popup'),\n      // popUp\n  popupBtn = document.querySelectorAll('.popup-btn'),\n      //кнопки popUpBtn\n  popupContent = popup.querySelector('.popup-content'),\n      popupActiv = {\n    count: -445,\n    speed: 10,\n    startActiv: -445,\n    endActiv: 0\n  };\n\n  var animatedPopup = function animatedPopup() {\n    popupActiv.startActiv > popupActiv.endActiv ? popupActiv.count -= popupActiv.speed : popupActiv.count += popupActiv.speed;\n    popupContent.style.transform = \"translateY(\".concat(popupActiv.count, \"px)\");\n\n    if (popupActiv.startActiv > popupActiv.endActiv ? popupActiv.count > popupActiv.endActiv : popupActiv.count < popupActiv.endActiv) {\n      requestAnimationFrame(animatedPopup);\n    }\n  };\n\n  popupBtn.forEach(function (elem) {\n    elem.addEventListener('click', function () {\n      popup.style.display = 'block';\n\n      if (screen.width > 768) {\n        popupActiv.count = popupActiv.startActiv;\n        requestAnimationFrame(animatedPopup);\n      }\n    });\n  });\n  popup.addEventListener('click', function (event) {\n    //привязываем target\n    var target = event.target; // проверка куда кликнули\n\n    if (target.classList.contains('popup-close')) {\n      popup.style.display = 'none';\n    } else {\n      target = target.closest('.popup-content'); // если неполучили target, то закрываем popup\n\n      if (!target) {\n        popup.style.display = 'none';\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopup);\n\n//# sourceURL=webpack://training_project/./src/modules/togglePopup.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("15fccd326596e08fd9e9")
/******/ })();
/******/ 
/******/ }
);