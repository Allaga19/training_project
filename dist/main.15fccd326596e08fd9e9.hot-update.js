/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatetraining_project"]("main",{

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar countTimer = function countTimer(deadline) {\n  // получаем элименты со страницы\n  var timerHours = document.getElementById('timer-hours'),\n      timerMinutes = document.getElementById('timer-minutes'),\n      timerSeconds = document.getElementById('timer-seconds');\n\n  var getTimeRemaning = function getTimeRemaning() {\n    var dateStop = new Date(deadline).getTime(),\n        // получаем конечную дату\n    dateNow = new Date().getTime(),\n        // текущая дата\n    timeRemaining = (dateStop - dateNow) / 1000,\n        // разница между датами  в секундах\n    seconds = Math.floor(timeRemaining % 60),\n        // сколько секунд осталось до deadline\n    minutes = Math.floor(timeRemaining / 60 % 60),\n        // сколько минут осталось до deadline\n    hours = Math.floor(timeRemaining / 60 / 60) % 24; // сколько часов осталось до deadline\n    //  day = Math.floor(timeRemaining / 60 / 60 / 24);  // сколько дней осталось до deadlin\n\n    return {\n      timeRemaining: timeRemaining,\n      hours: hours,\n      minutes: minutes,\n      seconds: seconds\n    };\n  }; // подставляем 0 перед значениями\n\n\n  var structureTime = function structureTime(data) {\n    if (data < 10) {\n      data = '0' + data;\n    }\n\n    return data;\n  };\n\n  var updateClock = setInterval(function () {\n    var timer = getTimeRemaning(); // вывод значений на страницу\n\n    timerHours.textContent = structureTime(timer.hours);\n    timerMinutes.textContent = structureTime(timer.minutes);\n    timerSeconds.textContent = structureTime(timer.seconds); // вызов каждую секунду\n\n    if (timer.timeRemaining < 0) {\n      clearInterval(updateClock);\n      var dateStop = new Date(deadline);\n      dateStop.setDate(dateStop.getDate() + 1);\n      countTimer(dateStop);\n    }\n  }, 1000); // setInterval(updateClock, 1000);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);\n\n//# sourceURL=webpack://training_project/./src/modules/countTimer.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d5f9dc7bee7e6ee124aa")
/******/ })();
/******/ 
/******/ }
);