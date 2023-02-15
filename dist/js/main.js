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

/***/ "./src/js/Particle.js":
/*!****************************!*\
  !*** ./src/js/Particle.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Rectangle_1 = __importDefault(__webpack_require__(/*! ./Rectangle */ \"./src/js/Rectangle.js\"));\r\nconst Vector2D_1 = __importDefault(__webpack_require__(/*! ./Vector2D */ \"./src/js/Vector2D.js\"));\r\nclass Particle extends Rectangle_1.default {\r\n    constructor(x, y, r) {\r\n        super(x, y, r, r);\r\n        this.color = \"#000\";\r\n        this.r = r;\r\n        this.speed = new Vector2D_1.default(Math.random() * 10 - 5, Math.random() * 10 - 5);\r\n    }\r\n    update(progress) {\r\n        this.x += (this.speed.x * progress) / 20;\r\n        this.y += (this.speed.y * progress) / 20;\r\n        if (this.x < this.r || this.x > 600 - this.r) {\r\n            this.speed.x *= -1;\r\n        }\r\n        if (this.y < this.r || this.y > 600 - this.r) {\r\n            this.speed.y *= -1;\r\n        }\r\n    }\r\n    draw(ctx, color) {\r\n        super.draw(ctx, this.color, true);\r\n    }\r\n}\r\nexports[\"default\"] = Particle;\r\n//# sourceMappingURL=Particle.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Particle.js?");

/***/ }),

/***/ "./src/js/QuadTree.js":
/*!****************************!*\
  !*** ./src/js/QuadTree.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Rectangle_1 = __importDefault(__webpack_require__(/*! ./Rectangle */ \"./src/js/Rectangle.js\"));\r\nclass QuadTree extends Rectangle_1.default {\r\n    constructor(x, y, w, h, capacity) {\r\n        super(x, y, w, h);\r\n        this.points = [];\r\n        this.recs = [];\r\n        this.isSplit = false;\r\n        this.TL = null;\r\n        this.TR = null;\r\n        this.BR = null;\r\n        this.BL = null;\r\n        this.capacity = capacity;\r\n    }\r\n    /**\r\n     * Inserts a point into the QuadTree and splits the tree if neccessary\r\n     * @param p The point to add\r\n     */\r\n    addPoint(p) {\r\n        var _a, _b, _c, _d;\r\n        if (!this.contains(p))\r\n            return;\r\n        if (this.points.length < this.capacity) {\r\n            this.points.push(p);\r\n        }\r\n        else {\r\n            if (!this.isSplit) {\r\n                this.split();\r\n            }\r\n            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.addPoint(p);\r\n            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.addPoint(p);\r\n            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.addPoint(p);\r\n            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.addPoint(p);\r\n        }\r\n    }\r\n    queryRectangles(area, results) {\r\n        var _a, _b, _c, _d;\r\n        if (this.intersects(area)) {\r\n            results.push(...this.recs);\r\n            (_a = this.TR) === null || _a === void 0 ? void 0 : _a.queryRectangles(area, results);\r\n            (_b = this.TL) === null || _b === void 0 ? void 0 : _b.queryRectangles(area, results);\r\n            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.queryRectangles(area, results);\r\n            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.queryRectangles(area, results);\r\n        }\r\n        return results;\r\n    }\r\n    /**\r\n     * Inserts a point into the QuadTree and splits the tree if neccessary\r\n     * @param r The point to add\r\n     */\r\n    addParticle(r) {\r\n        var _a, _b, _c, _d;\r\n        if (!this.intersects(r)) {\r\n            return;\r\n        }\r\n        if (this.recs.length < this.capacity) {\r\n            this.recs.push(r);\r\n        }\r\n        else {\r\n            if (!this.isSplit) {\r\n                this.split();\r\n            }\r\n            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.addParticle(r);\r\n            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.addParticle(r);\r\n            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.addParticle(r);\r\n            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.addParticle(r);\r\n        }\r\n    }\r\n    /**\r\n     * Splits the QuadTree into 4 sub-trees\r\n     */\r\n    split() {\r\n        const nW = this.w / 2;\r\n        const nH = this.h / 2;\r\n        this.TL = new QuadTree(this.x, this.y, nW, nH, this.capacity);\r\n        this.TR = new QuadTree(this.x + nW, this.y, nW, nH, this.capacity);\r\n        this.BR = new QuadTree(this.x, this.y + nH, nW, nH, this.capacity);\r\n        this.BL = new QuadTree(this.x + nW, this.y + nH, nW, nH, this.capacity);\r\n        this.isSplit = true;\r\n    }\r\n    /**\r\n     * Draws this QuadTree and all its children and points onto a given rendering context\r\n     * @param ctx The context to draw onto\r\n     * @param color The color to draw\r\n     */\r\n    draw(ctx, color) {\r\n        var _a, _b, _c, _d;\r\n        this.points.forEach((p) => p.draw(ctx));\r\n        this.recs.forEach((r) => r.draw(ctx, r.color));\r\n        if (!this.isSplit) {\r\n            super.draw(ctx, color);\r\n        }\r\n        else {\r\n            (_a = this.TL) === null || _a === void 0 ? void 0 : _a.draw(ctx, color);\r\n            (_b = this.TR) === null || _b === void 0 ? void 0 : _b.draw(ctx, color);\r\n            (_c = this.BR) === null || _c === void 0 ? void 0 : _c.draw(ctx, color);\r\n            (_d = this.BL) === null || _d === void 0 ? void 0 : _d.draw(ctx, color);\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = QuadTree;\r\n//# sourceMappingURL=QuadTree.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/QuadTree.js?");

/***/ }),

/***/ "./src/js/Rectangle.js":
/*!*****************************!*\
  !*** ./src/js/Rectangle.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Rectangle {\r\n    constructor(x, y, w, h) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.w = w;\r\n        this.h = h;\r\n    }\r\n    /**\r\n     * Checks if a point is inside the rectangle\r\n     * @param p The Point to check\r\n     * @returns true if the point is contained within the boundaries of the rectangle false otherwise\r\n     */\r\n    contains(p) {\r\n        return (p.x >= this.x &&\r\n            p.x <= this.x + this.w &&\r\n            p.y >= this.y &&\r\n            p.y <= this.y + this.h);\r\n    }\r\n    /**\r\n     * Checks if a given Rectangle overlaps the current one\r\n     * @param o The other rectangle to check against\r\n     * @returns True if the Rectangles overlap, false otherwise\r\n     */\r\n    intersects(o) {\r\n        const horIntersect = (this.x + this.w > o.x && this.x + this.w < o.x + o.w) ||\r\n            (this.x < o.x && this.x + this.w > o.x + o.w) ||\r\n            (this.x > o.x && this.x < o.x + o.w);\r\n        const verIntersect = (this.y + this.h > o.y && this.y + this.h < o.y + o.h) ||\r\n            (this.y < o.y && this.y + this.h > o.y + o.h) ||\r\n            (this.y > o.y && this.y < o.y + o.h);\r\n        return horIntersect && verIntersect;\r\n    }\r\n    /**\r\n     * Draws the Rectangle unto the given context\r\n     * @param ctx The context to draw unto\r\n     */\r\n    draw(ctx, color, fill) {\r\n        if (fill) {\r\n            ctx.fillStyle = color || \"#000\";\r\n            ctx.fillRect(this.x, this.y, this.w, this.h);\r\n        }\r\n        else {\r\n            ctx.strokeStyle = color || \"#000\";\r\n            ctx.beginPath();\r\n            ctx.rect(this.x, this.y, this.w, this.h);\r\n            ctx.stroke();\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = Rectangle;\r\n//# sourceMappingURL=Rectangle.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Rectangle.js?");

/***/ }),

/***/ "./src/js/Vector2D.js":
/*!****************************!*\
  !*** ./src/js/Vector2D.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Vector2D {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    /**\r\n     * Adds a given Vector to this one\r\n     * @param o The Vector to add\r\n     */\r\n    add(o) {\r\n        this.x += o.x;\r\n        this.y += o.y;\r\n    }\r\n    /**\r\n     * Clones the current vector\r\n     * @returns The new vector\r\n     */\r\n    clone() {\r\n        return new Vector2D(this.x, this.y);\r\n    }\r\n}\r\nexports[\"default\"] = Vector2D;\r\n//# sourceMappingURL=Vector2D.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/Vector2D.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Particle_1 = __importDefault(__webpack_require__(/*! ./Particle */ \"./src/js/Particle.js\"));\r\nconst QuadTree_1 = __importDefault(__webpack_require__(/*! ./QuadTree */ \"./src/js/QuadTree.js\"));\r\nconst Rectangle_1 = __importDefault(__webpack_require__(/*! ./Rectangle */ \"./src/js/Rectangle.js\"));\r\nconst canvas = document.querySelector(\"#canvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst fpsLabel = document.querySelector(\"#fps\");\r\nconst particlesLabel = document.querySelector(\"#particles\");\r\nconst checksLabel = document.querySelector(\"#checks\");\r\nconst addButton = document.querySelector(\"#add\");\r\nconst toggleButton = document.querySelector(\"#toggle\");\r\nconst clearButton = document.querySelector(\"#clear\");\r\nconst useQuadTree = document.querySelector(\"#useQuadTree\");\r\nconst showQuadTree = document.querySelector(\"#showQuadTree\");\r\nlet qT = new QuadTree_1.default(0, 0, 600, 600, 1);\r\nlet checks = 0;\r\nlet animate = true;\r\nconst particles = [];\r\n/**\r\n * Adds 200 random placed particles into the system\r\n */\r\nconst add = () => {\r\n    for (let i = 0; i < 200; i++) {\r\n        particles.push(new Particle_1.default(Math.random() * 500 + 50, Math.random() * 500 + 50, 10));\r\n    }\r\n    particlesLabel.innerHTML = particles.length.toString();\r\n};\r\n/**\r\n * Updates all particles in the system\r\n * @param progress The time in milliseconds since the last draw\r\n */\r\nconst update = (progress) => {\r\n    if (!animate)\r\n        return;\r\n    updateDom(progress);\r\n    qT = new QuadTree_1.default(0, 0, 600, 600, 1);\r\n    checks = 0;\r\n    particles.forEach((p) => {\r\n        p.update(progress);\r\n        p.color = \"#C00\";\r\n        let found = [];\r\n        if (useQuadTree.checked) {\r\n            found = qT.queryRectangles(new Rectangle_1.default(p.x, p.y, p.r * 2, p.r * 2), []);\r\n        }\r\n        else {\r\n            found = particles;\r\n        }\r\n        found.forEach((p2) => {\r\n            checks++;\r\n            if (p !== p2 && p.intersects(p2)) {\r\n                p.color = \"#0C0\";\r\n            }\r\n        });\r\n        qT.addParticle(p);\r\n    });\r\n};\r\n/**\r\n * Draws all the particles in the correct color to the canvas\r\n */\r\nconst draw = () => {\r\n    ctx.clearRect(0, 0, 600, 600);\r\n    if (showQuadTree.checked) {\r\n        qT.draw(ctx);\r\n    }\r\n    else {\r\n        particles.forEach((p) => p.draw(ctx, p.color));\r\n    }\r\n};\r\n/**\r\n * The main animation-loop\r\n * @param timestamp The current timestamp\r\n */\r\nconst loop = (timestamp) => {\r\n    const progress = timestamp - lastRender;\r\n    update(progress);\r\n    draw();\r\n    lastRender = timestamp;\r\n    window.requestAnimationFrame(loop);\r\n};\r\n/**\r\n * Updates the labels below the animation\r\n * @param progress The time it took to render the last frame in ms\r\n */\r\nconst updateDom = (progress) => {\r\n    fpsLabel.innerHTML = `${Math.round(1000 / progress)} / ${Math.floor(progress)}ms`;\r\n    checksLabel.innerHTML = checks.toString();\r\n};\r\n/**\r\n * Stops/Starts the animation\r\n */\r\nconst toggleAnimate = () => {\r\n    animate = !animate;\r\n    toggleButton.innerHTML = animate ? \"Stop\" : \"Start\";\r\n};\r\ntoggleButton.addEventListener(\"click\", toggleAnimate);\r\naddButton.addEventListener(\"click\", add);\r\nclearButton.addEventListener(\"click\", () => particles.splice(0, particles.length));\r\nlet lastRender = 0;\r\nwindow.requestAnimationFrame(loop);\r\nadd();\r\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack://wetyss-boiler/./src/js/main.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;