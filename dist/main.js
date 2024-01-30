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

/***/ "./src/clickActions.js":
/*!*****************************!*\
  !*** ./src/clickActions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NewTaskCreatorPrompt: () => (/* binding */ NewTaskCreatorPrompt)\n/* harmony export */ });\nfunction NewTaskCreatorPrompt() {\n  console.log(\"Div clicked!\");\n  // this will refer to whatever is clicked\n  ChangeInboxVisibility(this);\n  taskCreatorDivVisibility();\n}\n\nfunction ChangeInboxVisibility(childDiv) {\n  // USAGE:\n  // const divName = document.getElementById(\"divID\");\n  // ChangeInboxVisibility(childDivName)\n  console.log(\"ChangeInboxVisibility called for\", childDiv);\n\n  const parentDiv = childDiv.parentNode;\n\n  if (parentDiv) {\n    console.log(\"Hiding parent div\", parentDiv);\n    parentDiv.style.display = \"none\";\n  }\n}\n\nfunction taskCreatorDivVisibility() {\n  console.log(\"taskCreatorDivVisibility called\");\n  const taskCreatorDiv = document.getElementById(\"taskCreatorDiv\");\n\n  // Check if the element exists and toggle its display style\n  if (taskCreatorDiv) {\n    taskCreatorDiv.style.display = taskCreatorDiv.style.display === \"none\" ? \"flex\" : \"none\";\n  }\n}\n\n\n// User clicks add task div\n// Inbox container view should be set to none.\n// New Task Creation Container should be set to visible.\n\n\n//# sourceURL=webpack://project-todo-list/./src/clickActions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadInitialContent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadInitialContent.js */ \"./src/loadInitialContent.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  (0,_loadInitialContent_js__WEBPACK_IMPORTED_MODULE_0__.loadInitalContent)();\n  console.log(\"Page Content Loaded!\");\n});\n\n\n//# sourceURL=webpack://project-todo-list/./src/index.js?");

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   divOrganiser: () => (/* binding */ divOrganiser),\n/* harmony export */   taskCreatorDivStyling: () => (/* binding */ taskCreatorDivStyling)\n/* harmony export */ });\n/* harmony import */ var _clickActions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickActions.js */ \"./src/clickActions.js\");\n/* harmony import */ var _listeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listeners.js */ \"./src/listeners.js\");\n\n\n\nfunction divOrganiser() {\n  loadFontAwesome();\n  loadGoogleFonts();\n  globalStyling();\n  const mainDiv = document.body.appendChild(mainDivCreation());\n  mainDivContainerStyling(mainDiv);\n  const header = mainDiv.appendChild(headerCreation());\n  headerStyling(header);\n  header.appendChild(createDivWithText(\"DO IT!\", \"headerText\"));\n  headerTextStyling();\n  const contentContainer = mainDiv.appendChild(contentContainerCreation());\n  contentContainerStyling(contentContainer);\n  const menuPannel = contentContainer.appendChild(menuPannelCreation());\n  menuPannelStyling(menuPannel);\n  menuPannelDivCreation(menuPannel);\n\n  menuPannelDivContainerStyling();\n  const projectTitle = createProjectsTitleTextDiv();\n  menuPannel.appendChild(projectTitle);\n  menuPannelDivCreationProjects(menuPannel);\n  menuPannelDivCreationProjectsTitleStyling();\n\n  //Inbox\n  const inbox = contentContainer.appendChild(inboxCreation());\n  inboxStyling(inbox);\n  const inboxContainer = inboxContainerCreation(inbox);\n  inboxContainerStyling(inboxContainer);\n  const inboxItem = createDivWithText(\"Add Task\", \"task\", \"fas fa-plus-circle\");\n  (0,_listeners_js__WEBPACK_IMPORTED_MODULE_1__.addClickListenerToDiv)(inboxItem, _clickActions_js__WEBPACK_IMPORTED_MODULE_0__.NewTaskCreatorPrompt);\n  inboxContainer.appendChild(inboxItem);\n  inboxItemStyling(inboxItem);\n  // Task Creator\n  const taskCreatordiv = createDivWithText(\"\", \"taskCreatorDiv\");\n  inbox.appendChild(taskCreatordiv);\n  taskCreatorDivStyling();\n  taskCreatorDivPopulate(taskCreatordiv);\n\n  // Footer\n  const footer = mainDiv.appendChild(footerCreation());\n  footerStyling(footer);\n}\n\nfunction mainDivCreation() {\n  const mainDiv = document.getElementById(\"content\");\n  mainDiv.id = \"mainDiv\";\n  return mainDiv;\n}\n\nfunction headerCreation() {\n  const header = document.createElement(\"header\");\n  header.id = \"header\";\n  return header;\n}\n\nfunction createDivWithText(text, divID, iconClass = \"\", useFlex = false) {\n  const newDiv = document.createElement(\"div\");\n  if (divID) {\n    newDiv.id = divID;\n  }\n\n  if (useFlex) {\n    newDiv.style.display = \"flex\";\n    newDiv.style.alignItems = \"center\";\n    newDiv.style.flexDirection = \"row\";\n  }\n\n  if (iconClass) {\n    const icon = document.createElement(\"i\");\n    icon.className = iconClass;\n    icon.style.marginRight = \"10px\";\n    icon.style.color = \"#c34a36\";\n    newDiv.appendChild(icon);\n  }\n\n  if (text) {\n    const textNode = document.createTextNode(text);\n    newDiv.appendChild(textNode);\n  }\n\n  return newDiv;\n}\n\nfunction contentContainerCreation() {\n  const contentContainer = document.createElement(\"div\");\n  contentContainer.id = \"contentContainer\";\n  return contentContainer;\n}\n\nfunction menuPannelCreation() {\n  const menuPannel = document.createElement(\"div\");\n  menuPannel.id = \"menuPannel\";\n  return menuPannel;\n}\n\nfunction menuPannelDivCreation(menuPannel) {\n  const menuPannelDivContainer = document.createElement(\"div\");\n  menuPannelDivContainer.setAttribute(\"id\", \"menuPannelDivContainer\");\n\n  const inboxDiv = createDivWithText(\"Inbox\", \"inboxDiv\", \"fas fa-inbox\");\n  const todayDiv = createDivWithText(\n    \"Today\",\n    \"todayDiv\",\n    \"fas fa-calendar-day\"\n  );\n  const thisWeekDiv = createDivWithText(\n    \"This Week\",\n    \"thisWeekDiv\",\n    \"fas fa-calendar-week\"\n  );\n\n  menuPannelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);\n  menuPannel.appendChild(menuPannelDivContainer);\n}\n\nfunction menuPannelDivCreationProjects(menuPannel) {\n  const menuPannelDivContainerProjects = document.createElement(\"div\");\n  menuPannelDivContainerProjects.setAttribute(\n    \"id\",\n    \"menuPannelDivContainerProjects\"\n  );\n  menuPannel.appendChild(menuPannelDivContainerProjects);\n  projectsDivsCreation(menuPannelDivContainerProjects);\n}\n\nfunction projectsDivsCreation(menuPannelDivContainerProjects) {\n  const addProject = createDivWithText(\n    \"Add Project\",\n    \"addProjectDiv\",\n    \"fas fa-plus-circle\"\n  );\n  menuPannelDivContainerProjects.append(addProject);\n}\n\nfunction createProjectsTitleTextDiv() {\n  return createDivWithText(\n    \"Projects\",\n    \"projectsTitleTextDiv\",\n    \"fas fa-project-diagram\",\n    true\n  );\n}\n\nfunction inboxContainerCreation(inbox) {\n  const inboxContainerDiv = createDivWithText(\"\", \"InboxContainerDiv\");\n  const inboxContainerDivTitle = createDivWithText(\n    \"Inbox\",\n    \"inboxContainerTitle\",\n    \"\"\n  );\n  inboxContainerDiv.append(inboxContainerDivTitle);\n  inbox.appendChild(inboxContainerDiv);\n  return inboxContainerDiv;\n}\n\nfunction inboxCreation() {\n  const inbox = document.createElement(\"div\");\n  inbox.id = \"inbox\";\n  return inbox;\n}\n\nfunction footerCreation() {\n  const footer = document.createElement(\"footer\");\n  footer.id = \"footer\";\n  return footer;\n}\n\nfunction taskCreatorDivPopulate(taskCreatorDiv) {\n  // Create the form element\n  const form = document.createElement(\"form\");\n  form.id = \"taskCreationForm\";\n\n  // Helper function to create input fields with labels\n  function createInputField(\n    labelText,\n    inputType,\n    inputName,\n    isRequired = false\n  ) {\n    const wrapper = document.createElement(\"div\");\n\n    const label = document.createElement(\"label\");\n    label.textContent = labelText;\n    label.htmlFor = inputName;\n    wrapper.appendChild(label);\n\n    const input = document.createElement(\"input\");\n    input.type = inputType;\n    input.name = inputName;\n    input.id = inputName;\n    input.required = isRequired;\n    wrapper.appendChild(input);\n\n    return wrapper;\n  }\n\n  // Append fields to the form\n  form.appendChild(createInputField(\"Title:\", \"text\", \"title\", true));\n  form.appendChild(createInputField(\"Due Date:\", \"date\", \"dueDate\"));\n  form.appendChild(createInputField(\"Description:\", \"text\", \"description\"));\n  form.appendChild(createInputField(\"Priority:\", \"text\", \"priority\"));\n  form.appendChild(createInputField(\"Notes:\", \"text\", \"notes\"));\n\n  // Create a submit button\n  const submitBtn = document.createElement(\"button\");\n  submitBtn.type = \"submit\";\n  submitBtn.textContent = \"Create Task\";\n  form.appendChild(submitBtn);\n\n  // Handle form submission\n  form.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    // Handle the form data here\n    console.log(\"Form submitted\");\n  });\n\n  if (taskCreatorDiv) {\n    taskCreatorDiv.appendChild(form);\n  } else {\n    console.error(\"taskCreatorDiv is not provided or is not a valid element\");\n  }\n}\n\n// Styling\nfunction globalStyling() {\n  document.body.style.margin = \"0\";\n  document.body.style.padding = \"0\";\n  document.body.style.minHeight = \"100vh\";\n  document.body.style.display = \"flex\";\n  document.body.style.flexDirection = \"column\";\n  document.body.style.fontFamily = \"'Roboto', sans-serif\";\n}\n\nfunction mainDivContainerStyling(mainDiv) {\n  mainDiv.style.display = \"flex\";\n  mainDiv.style.flexDirection = \"column\";\n  mainDiv.style.flexGrow = 1;\n}\n\nfunction headerStyling(header) {\n  header.style.display = \"flex\";\n  header.style.flexDirection = \"row\";\n  header.style.backgroundColor = \"#4b4453\";\n  header.style.width = \"70px%\";\n  header.style.height = \"70px\";\n}\n\nfunction headerTextStyling() {\n  headerText = document.getElementById(\"headerText\");\n  headerText.style.display = \"flex\";\n  headerText.style.flexDirection = \"row\";\n  headerText.style.justifyContent = \"center\";\n  headerText.style.alignItems = \"center\";\n  headerText.style.paddingLeft = \"30px\";\n  headerText.style.fontSize = \"45px\";\n  headerText.style.color = \"#c34a36\";\n}\n\nfunction contentContainerStyling(contentContainer) {\n  contentContainer.style.display = \"flex\";\n  contentContainer.style.flexDirection = \"row\";\n  contentContainer.style.justifyContent = \"space-between\";\n  contentContainer.style.flexGrow = 1;\n}\n\nfunction menuPannelStyling(menuPannel) {\n  menuPannel.style.flexGrow = 1;\n  menuPannel.style.display = \"flex\";\n  menuPannel.style.flexDirection = \"column\";\n  menuPannel.style.justifyContent = \"center\";\n  menuPannel.style.backgroundColor = \"grey\";\n  menuPannel.style.width = \"20%\";\n  menuPannel.style.height = \"auto\";\n  menuPannel.style.padding = \"20px\";\n}\n\nfunction menuPannelDivContainerStyling() {\n  const menuPannelContainer = document.getElementById(\"menuPannelDivContainer\");\n  menuPannelContainer.style.display = \"flex\";\n  menuPannelContainer.style.flexDirection = \"column\";\n  menuPannelContainer.style.justifyContent = \"space-between\";\n  menuPannelContainer.style.marginBottom = \"30px\";\n  menuPannelContainer.style.gap = \"15px\";\n}\n\nfunction menuPannelDivCreationProjectsTitleStyling() {\n  const menuPannelContainerProjects = document.getElementById(\n    \"projectsTitleTextDiv\"\n  );\n  menuPannelContainerProjects.style.display = \"flex\";\n  menuPannelContainerProjects.style.flexDirection = \"row\";\n  menuPannelContainerProjects.style.fontSize = \"30px\";\n  menuPannelContainerProjects.style.marginBottom = \"15px\";\n  menuPannelContainerProjects.style.color = \"#c34a36\";\n}\n\nfunction inboxStyling(inbox) {\n  inbox.style.flexGrow = 1;\n  inbox.style.display = \"flex\";\n  inbox.style.justifyContent = \"center\";\n  inbox.style.alignItems = \"center\";\n  inbox.style.backgroundColor = \"#b0a8b9\";\n  inbox.style.width = \"70%\";\n  inbox.style.height = \"auto\";\n  inbox.style.color = \"#ff8066\";\n}\n\nfunction inboxContainerStyling(inboxContainer) {\n  inboxContainer.style.display = \"flex\";\n  inboxContainer.style.flexDirection = \"column\";\n\n  inboxContainer.style.width = \"80%\";\n  inboxContainer.style.height = \"80%\";\n\n  // First CHild\n  const firstChild = inboxContainer.firstElementChild;\n  if (firstChild) {\n    firstChild.style.backgroundColor = \"#b0a8b9\";\n    firstChild.style.padding = \"10px\";\n    firstChild.style.fontSize = \"40px\";\n  }\n}\n\nfunction inboxItemStyling(inboxItem) {\n  const styledInboxItem = inboxItem;\n  // remember that 0.5 = 50% opacity\n  styledInboxItem.style.backgroundColor = \"rgba(132, 94, 194, 0.5)\";\n  styledInboxItem.style.padding = \"10px\";\n  return styledInboxItem;\n}\n\nfunction taskCreatorDivStyling() {\n  const taskCreatorDiv = document.getElementById(\"taskCreatorDiv\");\n  if (taskCreatorDiv) {\n    taskCreatorDiv.style.display = \"none\";\n    taskCreatorDiv.style.flexDirection = \"column\";\n    taskCreatorDiv.style.backgroundColor = \"#845ec2\";\n    taskCreatorDiv.style.width = \"80%\";\n    taskCreatorDiv.style.height = \"80%\";\n  }\n}\n\nfunction footerStyling(footer) {\n  footer.style.display = \"flex\";\n  footer.style.flexDirection = \"row\";\n  footer.style.backgroundColor = \"#4b4453\";\n  footer.style.width = \"100%\";\n  footer.style.height = \"30px\";\n}\n\n// Icons and Fonts\nfunction loadFontAwesome() {\n  const link = document.createElement(\"link\");\n  link.rel = \"stylesheet\";\n  link.href =\n    \"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\";\n  document.head.appendChild(link);\n}\n\nfunction loadGoogleFonts() {\n  const link = document.createElement(\"link\");\n  link.rel = \"stylesheet\";\n  link.href =\n    \"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\";\n  document.head.appendChild(link);\n}\n\n\n//# sourceURL=webpack://project-todo-list/./src/interface.js?");

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addClickListenerToDiv: () => (/* binding */ addClickListenerToDiv)\n/* harmony export */ });\n/* harmony import */ var _clickActions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clickActions.js */ \"./src/clickActions.js\");\n\n\nfunction addClickListenerToDiv(div, onClickFunction) {\n    console.log('Adding click listener to div', div);\n    div.addEventListener('click', onClickFunction);\n}\n\n\n//# sourceURL=webpack://project-todo-list/./src/listeners.js?");

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