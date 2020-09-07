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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./component sync recursive":
/*!************************!*\
  !*** ./component sync ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./component sync recursive\";\n\n//# sourceURL=webpack:///./component_sync?");

/***/ }),

/***/ "./component/queue.js":
/*!****************************!*\
  !*** ./component/queue.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Queue; });\n/* harmony import */ var amqplib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! amqplib */ \"amqplib\");\n/* harmony import */ var amqplib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(amqplib__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst CONNECTON = 'amqp://localhost'\r\nclass Queue{\r\n\t\r\n\tconstructor(){\r\n\t\tthis.message = null;\r\n\t\tthis.init();\r\n\t}\r\n\tasync init(){\r\n\t\ttry{\r\n\t\t\tthis.connection = await amqplib__WEBPACK_IMPORTED_MODULE_0___default.a.connect(CONNECTON);\r\n\t\t\tthis.channel = await this.connection.createChannel('');\r\n\t\t\t//await this.connection.queue('my-queue');\r\n\t\t}\r\n\t\tcatch(e){\r\n\t\t\tconsole.log('RPC connection error', e)\r\n\t\t}\r\n\t}\r\n\r\n\tasync getChannel(){\r\n\t\tif(this.channel)\r\n\t\t\treturn this.channel;\r\n\r\n\t\treturn false;\r\n\t}\r\n\r\n\tasync publish(queue,_message){\r\n\t\tlet channel = await this.getChannel();\r\n\t\tawait channel.assertExchange(queue, 'headers',{\r\n\t\t  durable: true,\r\n\t\t  autoDelete: false\r\n\t\t});\r\n\t\t//await this.connection.queue(queue);\r\n\t\tawait channel.publish(queue,'', Buffer.from(JSON.stringify(_message)), {contentType:'application/json'});\r\n\t}\r\n\r\n\tasync handleQueue(queue,  handle){\r\n\t\tlet channel = await this.getChannel();\r\n\t\tawait channel.assertExchange(queue, 'headers',{\r\n\t\t  durable: true,\r\n\t\t  autoDelete: false\r\n\t\t});\r\n\t\tlet q =  await channel.assertQueue(queue, {\r\n\t\t  durable: true,\r\n\t\t  autoDelete: false\r\n\t\t});\r\n\t\t\r\n\t\tawait channel.bindQueue(q.queue, queue, '');\r\n\t\tawait channel.consume(q.queue, async msg => {\r\n\t\t\t\tif(msg === null){\r\n\t\t\t\t\tconsole.log('No message')\r\n\t\t\t\t}\r\n\t\t\t\tawait handle(JSON.parse(msg.content.toString()));\r\n\t\t\t\tchannel.ack(msg);\r\n\t\t\t});\r\n\t\t//console.log('data',message)\r\n\t\treturn this.message;\r\n\t}\r\n\r\n}\n\n//# sourceURL=webpack:///./component/queue.js?");

/***/ }),

/***/ "./component/rpc.js":
/*!**************************!*\
  !*** ./component/rpc.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RPC; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rpc_test_testService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rpc/test/testService */ \"./rpc/test/testService.js\");\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/helpers */ \"./services/helpers.js\");\nconst grpc = __webpack_require__(/*! grpc */ \"grpc\");\r\n\r\n\r\nconst testProto = grpc.load(__dirname + '/../rpc/test/test.proto')\r\n\r\n\r\nclass RPC{\r\n\t\r\n\tconstructor(){\r\n\t\tthis.init();\r\n\t}\r\n\tasync init(){\r\n\t\tthis.server = new grpc.Server();\r\n\t\t//await this.loadService(this.server);\r\n\t\t//console.log(testProto);\r\n\t\tlet servicePath = `${__dirname}/../rpc`;\r\n\t\tfs__WEBPACK_IMPORTED_MODULE_1___default.a.readdirSync(servicePath)  \r\n\t\t.forEach((dir) => {\r\n\t\t\tfs__WEBPACK_IMPORTED_MODULE_1___default.a.readdirSync(`${servicePath}/`+ dir)\r\n\t\t\t.forEach(async (file) => {\r\n\t\t\t\tlet filePath = `${servicePath}/${dir}/${file}`\r\n\t\t\t\tif(!fs__WEBPACK_IMPORTED_MODULE_1___default.a.lstatSync(filePath).isDirectory()){\r\n\t\t\t  \t\tlet fileName = file;\r\n\t\t\t  \t\tif(file.trim().slice(-6) === '.proto'){\r\n\t\t\t  \t\t\tconst file = grpc.load(filePath)\r\n\t\t\t  \t\t}\r\n\t\t\t  \t\telse if(file.trim().slice(-3) === '.js'){\r\n\t\t\t  \t\t\t//const TestService = require('../rpc/test/testService');\r\n\t\t\t  \t\t\tlet objName = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_3__[\"ucFirst\"])(fileName);\r\n\t\t\t  \t\t\tconsole.log(filePath);\r\n\t\t\t  \t\t\t//[objName] = await import(filePath);\r\n\t\t\t  \t\t\tobjName = __webpack_require__(\"./component sync recursive\")(filePath);\r\n\t\t\t  \t\t\tconsole.log('objName', objName)\r\n\t\t\t  \t\t}\r\n\t\t\t  \t\tconsole.log('file', file);\r\n\r\n\t\t\t  \t}\r\n\t\t\t })\r\n\t\t})\r\n\r\n\t\tfor(const [key, value] of Object.entries(testProto)){\r\n\t\t\tlet serviceBody ={};\r\n\t\t\tif(typeof value.service !== 'undefined'){\r\n\t\t\t\tfor(const [serviceKey, body] of Object.entries(value.service)){\r\n\t\t\t\t\tserviceBody[serviceKey]\t= _rpc_test_testService__WEBPACK_IMPORTED_MODULE_2__[\"default\"][serviceKey]\r\n\t\t\t\t}\r\n\t\t\t\tconsole.log(serviceBody);\r\n\t\t\t\tthis.server.addService(testProto[key].service,serviceBody)\r\n\t\t\t}\r\n\t\t}\r\n\t\t/*this.server.addService(testProto.TestService.service,{\r\n\t\t\ttest: async (data, cb) => {\r\n\t\t\t\tcb(null,'Hello RPC');\r\n\t\t\t}\r\n\t\t})*/\r\n\t\tthis.server.bind('127.0.0.1:'+_config__WEBPACK_IMPORTED_MODULE_0___default.a.rpcPort,\r\n\t\tgrpc.ServerCredentials.createInsecure())\r\n\t\tconsole.log('Server running at http://127.0.0.1:' + _config__WEBPACK_IMPORTED_MODULE_0___default.a.rpcPort )\r\n\t\tawait this.server.start()\r\n\t}\r\n\tasync call(serviceName,method,value={}, cb){\r\n\t\t//await this.loadService();\r\n\t\tconst TestService = testProto[serviceName];\r\n\t\t//console.log('TestService', TestService)\r\n\t\tconst client = new TestService('127.0.0.1:'+ _config__WEBPACK_IMPORTED_MODULE_0___default.a.rpcPort,\r\n\t\t    grpc.credentials.createInsecure());\r\n\t\t\r\n\t\treturn client[method](value,cb);\r\n\t\t\r\n\t}\r\n\r\n\tasync loadService(server){\r\n\t\treturn server.addService(testProto.TestService.service, {\r\n\t\t\ttest: async (data,cb) => {\r\n\t\t\t\tcb('Hello RPC');\r\n\t\t\t}\r\n\t\t})\r\n\t}\r\n\r\n\t\r\n}\r\n/*const TestService = testProto.TestService;\r\n\r\nmodule.exports = {\r\n  RPC : RPC,\r\n  client : new TestService('127.0.0.1:'+ config.rpcPort,\r\n\t\t    grpc.credentials.createInsecure())\r\n}*/\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./component/rpc.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  secret: '23432432425',\n  HOST: \"localhost\",\n  USER: \"root\",\n  PASSWORD: \"\",\n  DB: \"mern_prj\",\n  dialect: \"mysql\",\n  query_log: true,\n  pool: {\n    max: 5,\n    min: 0,\n    acquire: 30000,\n    idle: 10000\n  },\n  port: 3000,\n  rpcPort:4000\n};\n\n//# sourceURL=webpack:///./config.js?");

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! exports provided: ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROLE_MEMBER\", function() { return ROLE_MEMBER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROLE_CLIENT\", function() { return ROLE_CLIENT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROLE_OWNER\", function() { return ROLE_OWNER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROLE_ADMIN\", function() { return ROLE_ADMIN; });\nconst ROLE_MEMBER = 'Member';\nconst ROLE_CLIENT = 'Client';\nconst ROLE_OWNER = 'Owner';\nconst ROLE_ADMIN = 'Admin';\n\n\n\n\n//# sourceURL=webpack:///./constants.js?");

/***/ }),

/***/ "./controllers/authentication.js":
/*!***************************************!*\
  !*** ./controllers/authentication.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/helpers */ \"./services/helpers.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n\n\n//import User from '../models/user';\n\n\n\n//var User = require('../models/user');\n// Generate JWT\n// TO-DO Add issuer and audience\nfunction generateToken(user) {\n  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.sign(user, _config__WEBPACK_IMPORTED_MODULE_3___default.a.secret, {\n    expiresIn: 60810 // in seconds\n  });\n}\n\n//= =======================================\n// Login Route\n//= =======================================\nexports.login = function (req, res, next) {\n  const userInfo = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"setUserInfo\"])(req.user);\n\n  res.status(200).json({\n    token: `JWT ${generateToken(userInfo)}`,\n    user: userInfo\n  });\n};\n\n\n//= =======================================\n// Registration Route\n//= =======================================\nexports.register =  async  (req, res, next) => {\n  // Check for registration errors\n  const email = req.body.email;\n  const firstName = req.body.firstName;\n  const lastName = req.body.lastName;\n  const password = req.body.password;\n  const role = req.body.role;\n\n  // Return error if no email provided\n  if (!email) {\n    return res.status(422).send({ error: 'You must enter an email address.' });\n  }\n\n  // Return error if full name not provided\n  if (!firstName || !lastName) {\n    return res.status(422).send({ error: 'You must enter your full name.' });\n  }\n\n  // Return error if no password provided\n  if (!password) {\n    return res.status(422).send({ error: 'You must enter a password.' });\n  }\n  try {\n    //let User = new database.User();\n    let user = await database.User.findOne({ where:{ email }})\n    console.log('user', user);\n    if(user){\n      return res.status(422).send({ error: 'That email address is already in use.' });\n    }\n    else{\n      const userData = {\n        email,\n        password,\n        firstName, \n        lastName,\n        role\n      };\n        console.log(userData);\n      user = await _models_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].create(userData);\n      user = JSON.parse(JSON.stringify(user))\n      console.log(user);\n      const userInfo = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"setUserInfo\"])(user);\n\n      res.status(201).json({\n        token: `JWT ${generateToken(userInfo)}`,\n        user: userInfo\n      });\n  \n    }\n  }\n  catch(e){\n    console.log(e)\n    return res.status(500).send({ error: 'Server Error' });\n  }\n};\n\nexports.refreshToken = (req, res, next) => {\n\n  const { token } = req.body;\n\n    if (!token) {\n        return res.sendStatus(401);\n    }\n    console.log(token);\n    jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(token, _config__WEBPACK_IMPORTED_MODULE_3___default.a.secret, (err, user) => {\n      console.log(err)\n        if (err) {\n            return res.sendStatus(403);\n        }\n\n        const accessToken = `JWT ${generateToken(user)}`;\n\n        res.json({\n            accessToken\n        });\n    });\n\n}\n\n//= =======================================\n// Authorization Middleware\n//= =======================================\n\n// Role authorization check\nexports.roleAuthorization = function (requiredRole) {\n  return async function (req, res, next) {\n    const user = req.user;\n    console.log('i  callled')\n    const foundUser = await database.User.findOne({where:{id:user.id}}) //, (err, foundUser) => {\n      if (!foundUser) {\n        return res.status(422).json({ error: 'No user was found.' });\n        //return next();\n      }\n      // If user is found, check role.\n      console.log(foundUser.role, await Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"getRole\"])(foundUser.role))\n      console.log(requiredRole, await Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"getRole\"])(requiredRole))\n      if (await Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"getRole\"])(foundUser.role) == await Object(_services_helpers__WEBPACK_IMPORTED_MODULE_2__[\"getRole\"])(requiredRole)) {\n        return next();\n      }\n\n      return res.status(401).json({ error: 'You are not authorized to view this content.' });\n    //});\n  };\n};\n\n\n//# sourceURL=webpack:///./controllers/authentication.js?");

/***/ }),

/***/ "./controllers/queue.js":
/*!******************************!*\
  !*** ./controllers/queue.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/helpers */ \"./services/helpers.js\");\n\n\n//= =======================================\n// User Routes\n//= =======================================\nexports.setQueue = async (req, res, next) => {\n    await queue.publish('my-queue1',{name:'pankaj'})\n    return res.status(200).json({ data: true });\n};\n\nexports.getQueue = async(req ,res, ext) =>{\n  let data =  await queue.handleQueue('my-queue1', message =>{\n    console.log(message);\n  })\n  res.status(200).json({ data: data });\n} \n\n//# sourceURL=webpack:///./controllers/queue.js?");

/***/ }),

/***/ "./controllers/rpc.js":
/*!****************************!*\
  !*** ./controllers/rpc.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/helpers */ \"./services/helpers.js\");\n\n\n//import {client} from '../component/rpc';\n//= =======================================\n// User Routes\n//= =======================================\nexports.testRpc = async (req, res, next) => {\n\t//console.log(RPC)\n\t//const {err,}\n\t/*let result = RPC.test({},(err,data)=>{\n\t\t\tconsole.log(data);\n\t\t\treturn data;\n\t\t});*/\n\tlet result = await RPC.call('TestService','test',{},(err, result)=>{\n\t\tconsole.log(err,result);\n\t\treturn res.status(200).json({ data: result });\t\n\t});\n\t//console.log(result)\n    //let result = await RPC.test({});\n    \n};\n\n\n//# sourceURL=webpack:///./controllers/rpc.js?");

/***/ }),

/***/ "./controllers/user.js":
/*!*****************************!*\
  !*** ./controllers/user.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var _services_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/helpers */ \"./services/helpers.js\");\n\n\n\n//= =======================================\n// User Routes\n//= =======================================\nexports.viewProfile = async (req, res, next) => {\n  const userId = req.params.userId;\n\n  if (req.user.id.toString() !== userId) { \n    return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); \n  }\n  let user = await database.User.findByPk(userId);\n    if(!user){\n      res.status(400).json({ error: 'No user could be found for this ID.' });\n      return next(err);\n    }\n\n    const userToReturn = Object(_services_helpers__WEBPACK_IMPORTED_MODULE_1__[\"setUserInfo\"])(user);\n\n    return res.status(200).json({ user: userToReturn });\n};\n\n\n//# sourceURL=webpack:///./controllers/user.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ \"./router.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _component_queue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/queue */ \"./component/queue.js\");\n/* harmony import */ var _component_rpc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/rpc */ \"./component/rpc.js\");\n\n\n\n\n\n\n\n\n\n\nglobal.database = __webpack_require__(/*! ./lib/database */ \"./lib/database.js\");\n\nglobal.queue = new _component_queue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]();\nglobal.RPC  = new _component_rpc__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n//global.RPC = client;\n\nvar cors = __webpack_require__(/*! cors */ \"cors\")\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n// Set static file location for production\n// app.use(express.static(__dirname + '/public'));\n\n// Setting up basic middleware for all Express requests\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({ extended: false })); // Parses urlencoded bodies\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json()); // Send JSON responses\napp.use(morgan__WEBPACK_IMPORTED_MODULE_2___default()('dev')); // Log requests to API using morgan\n\n\n// Enable CORS from client-side \napp.use(cors());\n\n\n// Database Setup\ndatabase.sequelizer.sync();\n\n/*const sessionParameters = session({\n      secret: config.secret,\n      saveUninitialized: false,\n      resave: false,\n      cookie: {\n        path: \"/\",\n        secure: true\n      }\n    });\n    app.use(sessionParameters);*/\nObject(_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(app);\n\n// Start the server\nconst server = app.listen(_config__WEBPACK_IMPORTED_MODULE_4___default.a.port);\nconsole.log(`Your server is running on port ${_config__WEBPACK_IMPORTED_MODULE_4___default.a.port}.`);\n\n// necessary for testing\nmodule.exports = server;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib sync recursive":
/*!******************!*\
  !*** ./lib sync ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./lib sync recursive\";\n\n//# sourceURL=webpack:///./lib_sync?");

/***/ }),

/***/ "./lib/database.js":
/*!*************************!*\
  !*** ./lib/database.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname, __filename, module) {/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\nvar Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\r\nvar config = __webpack_require__(/*! ../config */ \"./config.js\")\r\n\r\n\r\n\r\n\r\nvar ConnectionPool = {\r\n      max: 3,\r\n      min: 1,\r\n      idle: 10000,\r\n      evict: 60000,\r\n      handleDisconnects: true\r\n}; \r\n\r\nvar sequelizer = new Sequelize(config.DB, config.USER, config.PASSWORD, {\r\n            host: config.HOST,\r\n            dialectOptions: {\r\n                  multipleStatements: true,\r\n                  connectTimeout: 30000\r\n            },\r\n            dialect: \"mysql\",\r\n            logging: function (str) {\r\n                  if (config.query_log) {\r\n                        console.log(str)\r\n                  }\r\n            },\r\n            pool: ConnectionPool,\r\n            define: {\r\n                  paranoid: true\r\n            },\r\n            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE\r\n      });\r\nsequelizer.dialect.supports.schemas = true;\r\nsequelizer.authenticate()\r\n  .then(() => {\r\n    console.log('connected to DB');\r\n  });\r\n\r\nlet models={};\r\nconst files = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readdirSync(__dirname + '/../models');\r\nfor(let file of files){\r\n\tif (file !== path__WEBPACK_IMPORTED_MODULE_1___default.a.basename(__filename) && file.endsWith('.js')) {\r\n        const model = __webpack_require__(\"./lib sync recursive\")(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname +'/../models/' , file.replace(/\\.js$/, '')))(sequelizer, Sequelize);\r\n        models[_utils__WEBPACK_IMPORTED_MODULE_3__[\"default\"].functionName(file.split('.')[0])] = model;\r\n    }\r\n}\r\n\r\nconst database = {\r\n\tSequelize: Sequelize,\r\n    sequelizer: sequelizer,\r\n    ...models\r\n}\r\nmodule.exports = database;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\", \"/index.js\", __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./lib/database.js?");

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Utils; });\nclass Utils { \r\n\tstatic functionName(string){\r\n\t\tstring = string.split('_');\r\n\t\tconst strNew=[];\r\n\t\tfor(let st of string){\r\n\t\t\tstrNew.push(st.charAt(0).toUpperCase() + st.slice(1));\t\r\n\t\t}\r\n\t\treturn strNew.join('');\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./lib/utils.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n/* harmony import */ var bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0__);\nconst Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\nvar config = __webpack_require__(/*! ../config */ \"./config.js\");\nvar SchemaName = config.connect_db_name;\n\n\nmodule.exports = function (sequelize, DataTypes) {\n  var User = sequelize.define('users', {\n    id: {\n      type: DataTypes.INTEGER,\n      allowNull: false,\n      primaryKey: true,\n      field: 'id',\n      autoIncrement: true,\n    },\n    firstName: {\n          type: DataTypes.STRING(255),\n          allowNull: true,\n          field: 'first_name'\n    },\n    lastName: {\n          type: DataTypes.STRING(255),\n          allowNull: true,\n          field: 'last_name'\n    },\n    email: {\n          type: DataTypes.STRING(255),\n          allowNull: true,\n          field: 'email'\n    },\n    password: {\n          type: DataTypes.STRING(255),\n          allowNull: true,\n          field: 'password'\n    },\n    status: {\n          type: DataTypes.INTEGER,\n          allowNull: true,\n          field: 'status'\n    },\n    role: {\n          type: DataTypes.INTEGER,\n          allowNull: true,\n          field: 'role'\n    },\n    is_deleted: {\n      type: DataTypes.BOOLEAN,\n      allowNull: false,\n      defaultValue: '0',\n      get() {\n            if (this.getDataValue('is_deleted') == undefined) {\n                  return;\n            }\n            return this.getDataValue('is_deleted') ? true : false;\n      } \n    },\n    createdAt: { type: DataTypes.DATEONLY, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },\n    updatedAt: { type: DataTypes.DATEONLY, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },\n    deletedAt: { type: DataTypes.DATEONLY, allowNull: true },\n  });\n  \n  User.beforeCreate( async (user, options) => {\n    const SALT_FACTOR = 5;\n    const salt = bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0___default.a.genSaltSync();\n    user.password = bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0___default.a.hashSync(user.password, salt);\n  });\n\n  User.comparePassword = async (candidatePassword, hash) =>{\n    return await bcrypt_nodejs__WEBPACK_IMPORTED_MODULE_0___default.a.compareSync(candidatePassword, hash);\n  };\n  return User;\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./modules/user/routes sync recursive ^\\.\\/.*$":
/*!*******************************************!*\
  !*** ./modules/user/routes sync ^\.\/.*$ ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./\": \"./modules/user/routes/index.js\",\n\t\"./index\": \"./modules/user/routes/index.js\",\n\t\"./index.js\": \"./modules/user/routes/index.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./modules/user/routes sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./modules/user/routes_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./modules/user/routes/index.js":
/*!**************************************!*\
  !*** ./modules/user/routes/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected character '@' (5:1)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| export default class IndexContoller {\\n| \\n> \\t@Post()\\n| \\tasync index(){\\n| \\t\\treturn 'Hello';\");\n\n//# sourceURL=webpack:///./modules/user/routes/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./router.js":
/*!*******************!*\
  !*** ./router.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./constants.js\");\n/* harmony import */ var _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/authentication */ \"./controllers/authentication.js\");\n/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/user */ \"./controllers/user.js\");\n/* harmony import */ var _controllers_queue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/queue */ \"./controllers/queue.js\");\n/* harmony import */ var _controllers_rpc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers/rpc */ \"./controllers/rpc.js\");\n/* harmony import */ var _services_passport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/passport */ \"./services/passport.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Middleware to require login/auth\nconst requireAuth = passport__WEBPACK_IMPORTED_MODULE_1___default.a.authenticate('jwt', { session: false });\nconst requireLogin = passport__WEBPACK_IMPORTED_MODULE_1___default.a.authenticate('local', { session: false });\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n\n  const apiRoutes = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(),\n    authRoutes = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(),\n    userRoutes = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\n\n    fs__WEBPACK_IMPORTED_MODULE_8___default.a\n  .readdirSync(`${__dirname}/modules/user/routes`)\n  .filter(file => (file.slice(-3) === '.js'))\n  .forEach((file) => {\n    let className = __webpack_require__(\"./modules/user/routes sync recursive ^\\\\.\\\\/.*$\")(`./${file}`);\n    let obj = new className.default();\n    getRoutes(obj); \n    console.log(obj);\n  });\n\n\n  function getRoutes(obj){\n    let methods = new Set();\n    while (obj = Reflect.getPrototypeOf(obj)) {\n      let keys = Reflect.ownKeys(obj)\n      keys.forEach((k) => methods.add(k));\n    }\n    console.log(methods)\n    return methods;\n  }\n\n  // Auth Routes\n  apiRoutes.use('/auth', authRoutes);\n  authRoutes.post('/register', _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__[\"default\"].register);\n  authRoutes.post('/login', requireLogin, _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__[\"default\"].login);\n \n  //Referesh Token\n  authRoutes.post('/refresh-token',  _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__[\"default\"].refreshToken);\n\n  // User Routes\n  apiRoutes.use('/user', userRoutes);\n  userRoutes.get('/:userId', requireAuth, _controllers_user__WEBPACK_IMPORTED_MODULE_4__[\"default\"].viewProfile);\n\n\n  apiRoutes.get('/set-queue', _controllers_queue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].setQueue);\n  apiRoutes.get('/get-queue', _controllers_queue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getQueue);\n\n  apiRoutes.get('/get-rpc', _controllers_rpc__WEBPACK_IMPORTED_MODULE_6__[\"default\"].testRpc);\n\n\n  apiRoutes.get('/user-only', requireAuth, _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__[\"default\"].roleAuthorization(2), (req, res) => {\n    res.send({ content: 'User role is working.' });\n  })\n;\n  apiRoutes.get('/admin-only', requireAuth, _controllers_authentication__WEBPACK_IMPORTED_MODULE_3__[\"default\"].roleAuthorization(1), (req, res) => {\n    res.send({ content: 'Admin role is working.' });\n  });\n\n  // Set url for API group routes\n  app.use('/api', apiRoutes);\n});;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./router.js?");

/***/ }),

/***/ "./rpc/test/testService.js":
/*!*********************************!*\
  !*** ./rpc/test/testService.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TestService; });\nclass TestService{\r\n\r\n\tstatic async test(data,cb){\r\n\t\tcb(null, 'my world')\r\n\t}\r\n\r\n\tstatic async test1(data,cb){\r\n\t\tcb(null, 'hello node')\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./rpc/test/testService.js?");

/***/ }),

/***/ "./services/helpers.js":
/*!*****************************!*\
  !*** ./services/helpers.js ***!
  \*****************************/
/*! exports provided: setUserInfo, getRole, ucFirst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUserInfo\", function() { return setUserInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRole\", function() { return getRole; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ucFirst\", function() { return ucFirst; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./constants.js\");\n\n\n// Set user info from request\nfunction setUserInfo(request) {\n  const getUserInfo = {\n    id: request.id,\n    firstName: request.firstName,\n    lastName: request.lastName,\n    email: request.email,\n    role: request.role\n  };\n\n  return getUserInfo;\n};\n\nasync function getRole(id) {\n\n  let role = await database.Role.findOne({where:{id: id}});\n\n  if(!role)\n    return false;\n\n  return id;\n  \n};\n\nfunction ucFirst (s) {\n  if (typeof s !== 'string') return ''\n  return s.charAt(0).toUpperCase() + s.slice(1)\n}\n\n\n//# sourceURL=webpack:///./services/helpers.js?");

/***/ }),

/***/ "./services/passport.js":
/*!******************************!*\
  !*** ./services/passport.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-local */ \"passport-local\");\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/user */ \"./models/user.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n// Setting username field to email rather than username\nconst localOptions = {\n  usernameField: 'email'\n};\n\n// Setting up local login strategy\nconst localLogin = new passport_local__WEBPACK_IMPORTED_MODULE_2___default.a(localOptions, async (email, password, done) => {\n  let user = await database.User.findOne({where:{ email }})\n\n  if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }\n  let isMatch = await database.User.comparePassword(password, user.password);\n  console.log(isMatch);\n  if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }\n  return done(null, user);\n  \n});\n\nconst jwtOptions = {\n  jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_1__[\"ExtractJwt\"].fromAuthHeader(),\n  secretOrKey: _config__WEBPACK_IMPORTED_MODULE_4___default.a.secret,\n};\n\n// Setting up JWT login strategy\nconst jwtLogin = new passport_jwt__WEBPACK_IMPORTED_MODULE_1__[\"Strategy\"](jwtOptions, async (payload, done) => {\n  console.log('payload', payload);\n  let user = await database.User.findOne({where:{ id: payload.id}})\n  if(!user)\n    return done(err, false);\n  else\n    done(null, user);\n\n});\n\n\nexports.refreshToken = () => {\n  console.log('i called', jwtOptions.jwtFromRequest);\n   let tt = new passport_jwt__WEBPACK_IMPORTED_MODULE_1__[\"Strategy\"](jwtOptions, async (payload, done) => {\n    console.log('payload', payload);\n    let user = await database.User.findOne({where:{ id: payload.id}})\n    if(!user)\n      return done(err, false);\n    else\n      done(null, user);\n\n  });\n   console.log('tt', tt);\n}\n\n\npassport__WEBPACK_IMPORTED_MODULE_0___default.a.use(jwtLogin);\npassport__WEBPACK_IMPORTED_MODULE_0___default.a.use(localLogin);\n\n//# sourceURL=webpack:///./services/passport.js?");

/***/ }),

/***/ "amqplib":
/*!**************************!*\
  !*** external "amqplib" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"amqplib\");\n\n//# sourceURL=webpack:///external_%22amqplib%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "grpc":
/*!***********************!*\
  !*** external "grpc" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"grpc\");\n\n//# sourceURL=webpack:///external_%22grpc%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });