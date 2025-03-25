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

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n\n    constructor(name, length) {\n        this.name = name;\n        this.length = length;\n        this.hitCount = 0;\n        this.sunk = false;\n    }\n\n    hit() {\n        ++this.hitCount;\n    }\n\n    isSunk() {\n        if (this.hitCount >= this.length) {\n            this.sunk = true;\n        }\n        return this.sunk;\n    }\n}\n\nclass Gameboard {\n\n    static numberOfBoards = 0;\n\n    constructor() {\n        ++Gameboard.numberOfBoards;\n        this.ships = [];\n        this.cor = Array.from({ length: 10}, () => \n            Array.from({ length: 10 }, () => ({ ship:null, attacked:false}))\n        );\n        this.shipCount = 0;\n    }\n\n    placeShip(ship, x, y, orientation) {\n        if (!(ship instanceof Ship)) {\n            throw new Error(\"First parameter must be an instance of Ship\");\n        }\n\n        // if h then range(x, x+length); 'v' then range(y, y+length)\n        // note that x+length shouldn't be larger than 9 if h, ditto for v\n        // x and y should be 0 to 9\n    \n        for ( let i = 0; i < ship.length; i++ ) {\n            if ( orientation == \"h\") {\n                // if ship is already assigned to grid, through error\n                // make sure ship stays within grid \n                this.cor[x+i][y].ship = ship;\n            } else if ( orientation == \"v\") {\n                this.cor[x][y+i].ship = ship;\n            } else {\n                throw new Error('Ship orientation should be either \"h(horizontal)\" or \"v(vertical)\"');\n            }\n        }\n\n        this.ships.push(ship);\n    }\n\n    receiveAttack(x, y) {\n        this.cor[x][y].attacked = true;\n        if ( this.cor[x][y].ship) {\n            this.cor[x][y].ship.hit();\n            return true;\n        }\n        return false;\n    }\n\n    areShipsAllSunk() {\n        return this.ships.every((ship) => ship.isSunk());\n    }\n}\n\nclass Player {\n\n    constructor(type) {\n        if (type !== 'human' && type !== 'ai') {\n            throw new Error(\"Type must be either 'human' or 'ai'\");\n        }\n\n        this.type = type;\n        this.gameboard = new Gameboard;\n    }\n    // 'real' player and 'computer' player\n    // Each player object should contain its own gameboard\n}\n// then import all classes / factory\n// module.exports = {sum, Ship, Gameboard, Player};\n\n//# sourceURL=webpack://top-battleship/./src/components.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   main: () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./src/components.js\");\n// import \"./styles.css\";\n\n\nfunction renderPlayer(playerName, HTMLplayerID) {\n    const DOMplayer = document.querySelector(HTMLplayerID);\n\n    // const buttonElement = document.createElement('button');\n\n    const titleElement = document.createElement('h2');\n    titleElement.textContent = playerName;\n    DOMplayer.appendChild(titleElement);\n\n    const DOMgameboard = document.createElement('div');\n    DOMgameboard.className = 'gameboard';\n    DOMplayer.appendChild(DOMgameboard);\n\n    for (let i = 0; i < 10; i++) {\n        for (let j = 0; j < 10; j++) {\n            const cellElement = document.createElement('div');\n            cellElement.className = 'cell';\n            cellElement.dataset.x = j;\n            cellElement.dataset.y = i;\n            DOMgameboard.appendChild(cellElement);\n        }\n    }\n\n    return { DOMplayer, DOMgameboard };\n}\n\nfunction main() {\n    \n    // Game start\n    const { DOMplayer: player1, DOMgameboard: board1 } = renderPlayer(\"Player 1\", \"#player-1\");\n    const { DOMplayer: player2, DOMgameboard: board2 } = renderPlayer(\"Player 2\", \"#player-2\");\n    const DOMinstructions = document.querySelector(\"#instructions\");\n\n    DOMinstructions.textContent = 'Place ship - Carrier ( 5 )';\n\n    const DOMship = document.createElement('div');\n    DOMship.id = 'player1-ship0';\n    DOMship.dataset.length = 5;\n    DOMship.dataset.orientation = 'v';\n    DOMship.className = 'ship';\n    DOMship.classList.add = 'length-5';\n\n    const DOMpointer = document.createElement('div');\n    DOMpointer.id = 'pointer';\n    DOMpointer.style.position = 'absolute';\n    DOMpointer.style.pointerEvents = 'none';\n    DOMpointer.appendChild(DOMship);\n    document.body.appendChild(DOMpointer);\n\n    document.addEventListener('mousemove', (event) => {\n        DOMpointer.style.left = `${event.pageX - 20}px`;\n        DOMpointer.style.top = `${event.pageY - 20}px`;\n    });\n\n    document.addEventListener('wheel', (event) => {\n        // Change ship orientation on mouse scroll\n        DOMpointer.style.left = `${event.pageX - 20}px`;\n        DOMpointer.style.top = `${event.pageY - 20}px`;\n\n        if (DOMship.dataset.orientation === 'v') {\n            DOMship.dataset.orientation = 'h';            \n            DOMship.style.transform = 'rotate(90deg)';\n        } else {\n            DOMship.dataset.orientation = 'v';\n            DOMship.style.transform = 'rotate(0deg)';\n        }\n    });\n\n\n    document.addEventListener('click', () => {\n        document.body.removeChild(DOMpointer);\n    }, { once: true });\n\n    // Ensure both boards are visible\n    // board1.style.display = \"block\";\n    // board2.style.display = \"block\";\n    // const board1 = player1.querySelector(\".gameboard\");\n    // const board2 = player2.querySelector(\".gameboard\");\n\n    board2.classList.add(\"disabled\");\n\n    // Set up gameboard ( render )\n\n    // Player 1 vs 2 selection \n\n    // LOOP Player 1, waiting for click\n    \n    // Check and declare winner \n\n}\n\n//# sourceURL=webpack://top-battleship/./src/index.js?");

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