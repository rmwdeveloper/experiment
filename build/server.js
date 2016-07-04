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
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(4);
  
  var _path = __webpack_require__(5);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(6);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _http = __webpack_require__(7);
  
  var _http2 = _interopRequireDefault(_http);
  
  var _server = __webpack_require__(8);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _routes = __webpack_require__(9);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _universalRouter = __webpack_require__(12);
  
  var _assets = __webpack_require__(13);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use(cookieParser()); // parse cookie header and populate req.cookies with an object keyed by cookie names
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.set('views', _path2.default.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, data, store;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(14); // eslint-disable-line global-require
  
                        data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
  
  
                        if (false) {
                          data.trackingId = analytics.google.trackingId;
                        }
  
                        store = configureStore({}, {
                          cookie: req.headers.cookie
                        });
  
  
                        store.dispatch(setRuntimeVariable({
                          name: 'initialNow',
                          value: Date.now()
                        }));
  
                        /*
                         *
                         */
                        _context.next = 9;
                        return (0, _universalRouter.match)(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          context: {
                            store: store,
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
                            css = [];
                            statusCode = status;
                            data.state = (0, _stringify2.default)(store.getState());
                            data.body = _server2.default.renderToString(component);
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 9:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 11:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(15); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  models.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(port, function () {
      console.log('The server is running at http://localhost:' + port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("http");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _home = __webpack_require__(10);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _containers = __webpack_require__(11);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child Routes
  exports.default = {
    path: '',
    component: _containers.App,
    childRoutes: [_home2.default]
  
  };

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

  module.exports = require("containers");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("index");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("error");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map