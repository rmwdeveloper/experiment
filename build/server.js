require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _http = __webpack_require__(4);
  
  var _http2 = _interopRequireDefault(_http);
  
  var _react = __webpack_require__(5);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _server = __webpack_require__(9);
  
  var _reactRouter = __webpack_require__(10);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  app.set('views', _path2.default.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  
  app.get('*', function (req, res) {
    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, props) {
      if (err) {
        res.status.send(err.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (props) {
        var markup = renderToSTring(_react2.default.createElement(_reactRouter.RoutingContext, props));
        res.render('index', { markup: markup });
      } else {
        res.sendStatus(404);
      }
    });
  });
  
  var server = _http2.default.createServer(app);
  
  server.listen(3003);
  server.on('listening', function () {
    console.log('Listening on 3003');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("http");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _home = __webpack_require__(7);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _containers = __webpack_require__(8);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child Routes
  exports.default = {
    path: '',
    component: _containers.App,
    childRoutes: [_home2.default]
  
  };

/***/ },
/* 7 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by rob on 7/4/2016.
   */
  
  exports.default = {
    path: '/'
  
  };

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("containers");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("react-router");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map