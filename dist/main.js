/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadInitialContent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadInitialContent.js */ \"./src/loadInitialContent.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  (0,_loadInitialContent_js__WEBPACK_IMPORTED_MODULE_0__.loadInitalContent)();\n  console.log(\"Hello World!\");\n});\n\n\n//# sourceURL=webpack://project-todo-list/./src/index.js?");

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   divOrganiser: () => (/* binding */ divOrganiser)\n/* harmony export */ });\nfunction divOrganiser() {\n  globalStyling();\n  const mainDiv = document.body.appendChild(mainDivCreation());\n  mainDivContainerStyling(mainDiv);\n  const header = mainDiv.appendChild(headerCreation());\n  headerStyling(header);\n  header.appendChild(createDivWithText(\"DO IT!\", \"headerText\"));\n  headerTextStyling();\n  const contentContainer = mainDiv.appendChild(contentContainerCreation());\n  contentContainerStyling(contentContainer);\n  const menuPannel = contentContainer.appendChild(menuPannelCreation());\n  menuPannelStyling(menuPannel);\n  menuPannelDivCreation(menuPannel);\n  menuPannelDivCreationProjects(menuPannel);\n  menuPannelDivContainerStyling();\n  menuPannelDivCreationProjectsStyling();\n  const inbox = contentContainer.appendChild(inboxCreation());\n  inboxStyling(inbox);\n  const inboxContainer = inboxContainerCreation(inbox);\n  inboxContainerStyling(inboxContainer);\n  const footer = mainDiv.appendChild(footerCreation());\n  footerStyling(footer);\n}\n\nfunction mainDivCreation() {\n  const mainDiv = document.getElementById(\"content\");\n  mainDiv.id = \"mainDiv\";\n  return mainDiv;\n}\n\nfunction headerCreation() {\n  const header = document.createElement(\"header\");\n  header.id = \"header\";\n  return header;\n}\n\nfunction createDivWithText(text, divID) {\n  const newDiv = document.createElement(\"div\");\n  if (divID) {\n    newDiv.id = divID;\n  }\n  const textNode = document.createTextNode(text);\n  newDiv.appendChild(textNode);\n  return newDiv;\n}\n\nfunction contentContainerCreation() {\n  const contentContainer = document.createElement(\"div\");\n  contentContainer.id = \"contentContainer\";\n  return contentContainer;\n}\n\nfunction menuPannelCreation() {\n  const menuPannel = document.createElement(\"div\");\n  menuPannel.id = \"menuPannel\";\n  return menuPannel;\n}\n\nfunction menuPannelDivCreation(menuPannel) {\n  const menuPannelDivContainer = document.createElement(\"div\");\n  menuPannelDivContainer.setAttribute(\"id\", \"menuPannelDivContainer\");\n\n  const inboxDiv = createDivWithText(\"inboxDiv\", \"inboxDiv\");\n  const todayDiv = createDivWithText(\"todayDiv\", \"todayDiv\");\n  const thisWeekDiv = createDivWithText(\"thisWeekDiv\", \"thisWeekDiv\");\n\n  menuPannelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);\n  menuPannel.appendChild(menuPannelDivContainer);\n}\n\nfunction menuPannelDivCreationProjects(menuPannel) {\n  const menuPannelDivContainerProjects = document.createElement(\"div\");\n  menuPannelDivContainerProjects.setAttribute(\n    \"id\",\n    \"menuPannelDivContainerProjects\"\n  );\n\n  const projectsTitleTextDiv = createDivWithText(\n    \"projectsTitle\",\n    \"projectsTitleTextDiv\"\n  );\n\n  menuPannelDivContainerProjects.append(projectsTitleTextDiv);\n  menuPannel.appendChild(menuPannelDivContainerProjects);\n}\n\nfunction inboxContainerCreation(inbox) {\n  const inboxContainerDiv = createDivWithText(\"\", \"InboxContainerDiv\");\n  const inboxContainerDivTitle = createDivWithText(\n    \"Inbox\",\n    \"inboxContainerTitle\"\n  );\n  inboxContainerDiv.append(inboxContainerDivTitle);\n  inbox.appendChild(inboxContainerDiv);\n  return inboxContainerDiv\n}\n\nfunction inboxCreation() {\n  const inbox = document.createElement(\"div\");\n  inbox.id = \"inbox\";\n  return inbox;\n}\n\nfunction footerCreation() {\n  const footer = document.createElement(\"footer\");\n  footer.id = \"footer\";\n  return footer;\n}\n\n// Styling\nfunction globalStyling() {\n  document.body.style.margin = \"0\";\n  document.body.style.padding = \"0\";\n  document.body.style.minHeight = \"100vh\";\n  document.body.style.display = \"flex\";\n  document.body.style.flexDirection = \"column\";\n}\n\nfunction mainDivContainerStyling(mainDiv) {\n  mainDiv.style.display = \"flex\";\n  mainDiv.style.flexDirection = \"column\";\n  mainDiv.style.flexGrow = 1;\n}\n\nfunction headerStyling(header) {\n  header.style.display = \"flex\";\n  header.style.flexDirection = \"row\";\n  header.style.backgroundColor = \"red\";\n  header.style.width = \"70px%\";\n  header.style.height = \"70px\";\n  header.style.borderStyle = \"dotted\";\n}\n\nfunction headerTextStyling() {\n  headerText = document.getElementById(\"headerText\");\n  headerText.style.display = \"flex\";\n  headerText.style.flexDirection = \"row\";\n  headerText.style.justifyContent = \"center\";\n  headerText.style.alignItems = \"center\";\n  headerText.style.paddingLeft = \"30px\";\n  headerText.style.fontSize = \"45px\";\n}\n\nfunction contentContainerStyling(contentContainer) {\n  contentContainer.style.display = \"flex\";\n  contentContainer.style.flexDirection = \"row\";\n  contentContainer.style.justifyContent = \"space-between\";\n  //   contentContainer.style.height = \"100%\"\n  // Fill space\n  contentContainer.style.flexGrow = 1;\n}\n\nfunction menuPannelStyling(menuPannel) {\n  menuPannel.style.flexGrow = 1;\n  menuPannel.style.display = \"flex\";\n  menuPannel.style.flexDirection = \"column\";\n  menuPannel.style.justifyContent = \"center\";\n  menuPannel.style.backgroundColor = \"grey\";\n  menuPannel.style.width = \"20%\";\n  menuPannel.style.height = \"auto\";\n}\n\nfunction menuPannelDivContainerStyling() {\n  const menuPannelContainer = document.getElementById(\"menuPannelDivContainer\");\n  menuPannelContainer.style.display = \"flex\";\n  menuPannelContainer.style.flexDirection = \"column\";\n  menuPannelContainer.style.justifyContent = \"space-between\";\n  menuPannelContainer.style.backgroundColor = \"orange\";\n  menuPannelContainer.style.marginBottom = \"10px\";\n}\n\nfunction menuPannelDivCreationProjectsStyling() {\n  const menuPannelContainerProjects = document.getElementById(\n    \"menuPannelDivContainerProjects\"\n  );\n  menuPannelContainerProjects.style.display = \"flex\";\n  menuPannelContainerProjects.style.flexDirection = \"column\";\n  menuPannelContainerProjects.style.justifyContent = \"space-between\";\n  menuPannelContainerProjects.style.backgroundColor = \"yellow\";\n}\n\nfunction inboxStyling(inbox) {\n  inbox.style.flexGrow = 1;\n  inbox.style.display = \"flex\";\n  inbox.style.justifyContent = \"center\"\n  inbox.style.alignItems = \"center\"\n  inbox.style.backgroundColor = \"blue\";\n  inbox.style.width = \"70%\";\n  inbox.style.height = \"auto\";\n}\n\nfunction inboxContainerStyling(inboxContainer) {\n    inboxContainer.style.display = 'flex';\n    inboxContainer.style.backgroundColor = \"green\"\n    inboxContainer.style.width = \"80%\"\n    inboxContainer.style.height = \"80%\"\n    \n}\n\nfunction footerStyling(footer) {\n  footer.style.display = \"flex\";\n  footer.style.flexDirection = \"row\";\n  footer.style.backgroundColor = \"orange\";\n  footer.style.width = \"100%\";\n  footer.style.height = \"30px\";\n}\n\n\n//# sourceURL=webpack://project-todo-list/./src/interface.js?");

/***/ }),

/***/ "./src/loadInitialContent.js":
/*!***********************************!*\
  !*** ./src/loadInitialContent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadInitalContent: () => (/* binding */ loadInitalContent)\n/* harmony export */ });\n/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.js */ \"./src/interface.js\");\n\n\n// Function to initialise page content\n\n  function loadInitalContent(){\n    (0,_interface_js__WEBPACK_IMPORTED_MODULE_0__.divOrganiser)()\n\n  }\n\n//# sourceURL=webpack://project-todo-list/./src/loadInitialContent.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;