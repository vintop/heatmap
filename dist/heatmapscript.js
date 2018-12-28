/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _handleClick = __webpack_require__(1);

	var _handleClick2 = _interopRequireDefault(_handleClick);

	var _handleScroll = __webpack_require__(10);

	var _handleScroll2 = _interopRequireDefault(_handleScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var main = function () {
	    function main() {
	        _classCallCheck(this, main);

	        if (document.readyState == 'interactive' || document.readyState == 'complete') {
	            this.initialize();
	        } else {
	            document.addEventListener("DOMContentLoaded", this.initialize.bind(this));
	        }
	    }

	    _createClass(main, [{
	        key: "initialize",
	        value: function initialize() {

	            if (!window.ZAB) {
	                return;
	            }

	            this.initData();
	            this.enableHeatmap();
	            this.enableScrollmap();
	        }
	    }, {
	        key: "initData",
	        value: function initData() {

	            _handleClick2.default.initData();
	            _handleScroll2.default.initData();
	        }
	    }, {
	        key: "onPageHide",
	        value: function onPageHide(ev) {

	            var heatclicks = _handleClick2.default.heatclicks;
	            var scrolldata = _handleScroll2.default.scrolldata;

	            if (!!Object.keys(heatclicks).length) {
	                this.sendHeatmapInfo(heatclicks);
	            }

	            _handleScroll2.default.setUserAsInactive();
	            if (scrolldata.length > 0) {
	                this.sendScrollmapInfo(scrolldata);
	            }

	            var start = +new Date();
	            while (+new Date() - start < 1000) {}

	            return null;
	        }
	    }, {
	        key: "enableHeatmap",
	        value: function enableHeatmap() {
	            var _this = this;

	            if (document.addEventListener) {
	                document.addEventListener("mousedown", _handleClick2.default.click, true);
	            } else {
	                document.attachEvent("on" + "mousedown", _handleClick2.default.click);
	            }

	            setInterval(function () {

	                var heatclicks = _handleClick2.default.heatclicks;
	                var scrolldata = _handleScroll2.default.scrolldata;

	                if (!!Object.keys(heatclicks).length) {
	                    _this.sendHeatmapInfo(heatclicks);
	                }

	                if (scrolldata.length > 0) {
	                    _this.sendScrollmapInfo(scrolldata);
	                }

	                _this.initData();
	            }, 10000);

	            if (window.addEventListener) {
	                window.addEventListener("pagehide", this.onPageHide.bind(this), false);
	            } else {
	                window.attachEvent("on" + "pagehide", this.onPageHide.bind(this));
	            }
	        }
	    }, {
	        key: "enableScrollmap",
	        value: function enableScrollmap() {

	            if (document.addEventListener) {
	                document.addEventListener("scroll", _handleScroll2.default.onScroll, false);
	            } else {
	                document.attachEvent("on" + "scroll", _handleScroll2.default.onScroll);
	            }

	            _handleScroll2.default.init();
	            _handleScroll2.default.cleanup();
	            _handleScroll2.default.scrollInterval = window.setInterval(_handleScroll2.default.trackScroll, 150);
	        }
	    }, {
	        key: "generateMapRawData",
	        value: function generateMapRawData() {

	            var heatmapdata = [];
	            var info = void 0;

	            if (ZAB.experiment && ZAB.experiment.heatmap === 2) {
	                info = {
	                    a: ZAB.portal,
	                    b: ZAB.experiment.key,
	                    c: ZAB.variation.key,
	                    n: !ZAB.returning
	                };
	                heatmapdata.push(info);
	            }

	            if (ZAB.heatmapexp) {

	                info = {
	                    a: ZAB.portal,
	                    b: ZAB.heatmapexp.key,
	                    c: "original", // NO I18N
	                    n: !ZAB.heatmapexp.returning
	                };
	                heatmapdata.push(info);
	            }
	            return heatmapdata;
	        }
	    }, {
	        key: "formatHMClicks",
	        value: function formatHMClicks(clicks) {

	            var hmclick = void 0;
	            var hmclicks = [];

	            for (var selector in clicks) {
	                hmclick = {};

	                if (clicks.hasOwnProperty(selector)) {

	                    hmclick.s = selector;
	                    hmclick.dt = _handleClick2.default.getSelectorText(selector);
	                    hmclick.p = clicks[selector];
	                    hmclicks.push(hmclick);
	                }
	            }
	            return hmclicks;
	        }
	    }, {
	        key: "generateHeatmapInfo",
	        value: function generateHeatmapInfo(clicks) {
	            var heatmaprawdata = this.generateMapRawData();
	            if (!heatmaprawdata || heatmaprawdata.length === 0) {
	                return;
	            }

	            ZAB.zab.generateUserAgentData();
	            return {
	                hrd: heatmaprawdata,
	                urd: ZAB.useragentrawdata,
	                hp: this.formatHMClicks(clicks)
	            };
	        }
	    }, {
	        key: "generateScrollmapInfo",
	        value: function generateScrollmapInfo(scrolldata) {

	            var scrollmaprawdata = this.generateMapRawData();
	            if (!scrollmaprawdata || scrollmaprawdata.length === 0) {
	                return;
	            }

	            ZAB.zab.generateUserAgentData();
	            return {
	                srd: scrollmaprawdata,
	                urd: ZAB.useragentrawdata,
	                sd: scrolldata
	            };
	        }
	    }, {
	        key: "sendScrollmapInfo",
	        value: function sendScrollmapInfo(scrolldata) {

	            if (!ZAB.zab.exists(scrolldata)) {
	                return;
	            }
	            var scrollmapInfo = this.generateScrollmapInfo(scrolldata);
	            if (ZAB.zab.exists(scrollmapInfo)) {
	                ZAB.zab.sendDataToServer(4, scrollmapInfo);
	            }
	        }
	    }, {
	        key: "sendHeatmapInfo",
	        value: function sendHeatmapInfo(data) {

	            if (!ZAB.zab.exists(data)) {
	                return;
	            }

	            var heatmapInfo = this.generateHeatmapInfo(data);
	            if (ZAB.zab.exists(heatmapInfo)) {
	                ZAB.zab.sendDataToServer(3, heatmapInfo);
	            }
	        }
	    }]);

	    return main;
	}();

	if (!window.ps_heatmapscript) {
	    window.ps_heatmapscript = new main();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _domElements = __webpack_require__(2);

	var _domElements2 = _interopRequireDefault(_domElements);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var handleClick = {

	    selectorText: {},
	    heatclicks: {},

	    initData: function initData() {

	        handleClick.heatclicks = {};
	    },
	    getSelectorText: function getSelectorText(selector) {

	        if (handleClick.selectorText.hasOwnProperty(selector)) {
	            return handleClick.selectorText[selector];
	        }
	        return "";
	    },
	    addClicks: function addClicks(s, x, y, ele) {

	        if (!s) {
	            return;
	        }
	        console.log("dudududuud");
	        var exist = false;
	        var subheatclicks = {};
	        var hc = handleClick.heatclicks[s] || [];

	        for (var i = 0; i < hc.length; i++) {
	            var obj = hc[i];
	            if (obj.x === x && obj.y === y) {
	                obj.c += 1;
	                exist = true;
	            }
	        }

	        if (!exist) {
	            subheatclicks.x = x;
	            subheatclicks.y = y;
	            subheatclicks.c = 1;
	            hc.push(subheatclicks);
	            handleClick.heatclicks[s] = hc;
	        }

	        if (!handleClick.selectorText.hasOwnProperty(s)) {

	            handleClick.selectorText[s] = _domElements2.default.getDisplayText(ele);
	        }
	    },
	    click: function click(_ref) {
	        var srcElement = _ref.srcElement,
	            target = _ref.target,
	            pageX = _ref.pageX,
	            pageY = _ref.pageY;

	        var ele = srcElement || target;
	        if (!ele) {
	            return;
	        }

	        var selector = void 0;
	        var px = void 0;
	        var py = void 0;
	        var box = void 0;
	        var offset = void 0;

	        selector = _domElements2.default.getSelector(ele);
	        px = pageX;
	        py = pageY;
	        offset = _domElements2.default.getOffset(ele);
	        box = _domElements2.default.getBoxWH(ele);
	        var xWithinBox = Math.round(1000 * (px - offset.left) / box.width) / 1000;
	        var yWithinBox = Math.round(1000 * (py - offset.top) / box.height) / 1000;
	        handleClick.addClicks(selector, xWithinBox, yWithinBox, ele);
	    }
	};

	exports.default = handleClick;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _optimalSelect = __webpack_require__(3);

	var DOMEle = {
	    getWindow: function getWindow(ele) {
	        return elem !== null && elem === window ? elem : elem.nodeType === 9 && elem.defaultView;
	    },
	    getSelector: function getSelector(ele) {

	        if (!ele) {
	            return;
	        }

	        var options = {
	            priority: ['id', 'class'], // NO I18N
	            ignore: {
	                attribute: function attribute(name, value, defaultPredicate) {

	                    if (!/id|class/.test(name)) {
	                        return true;
	                    }

	                    return (/data-*/.test(name) || defaultPredicate(name, value)
	                    );
	                }
	            }
	        };

	        return (0, _optimalSelect.select)(ele, options);
	    },
	    getOffset: function getOffset(ele) {
	        return optimize.$(ele).offset();
	    },
	    getScrollOffset: function getScrollOffset() {
	        var scroll = {};
	        var xOff = 0;
	        var yOff = 0;
	        if (window.pageYOffset) {
	            // Netscape
	            yOff = window.pageYOffset;
	            xOff = window.pageXOffset;
	        } else if (document.body.scrollLeft || document.body.scrollTop) {
	            // firefox
	            yOff = document.body.scrollTop;
	            xOff = document.body.scrollLeft;
	        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
	            // IE
	            yOff = document.documentElement.scrollTop;
	            xOff = document.documentElement.scrollLeft;
	        }

	        scroll.left = xOff;
	        scroll.top = yOff;

	        return scroll;
	    },
	    getBoxWH: function getBoxWH(ele) {

	        var box = {};

	        if (ele.getBoundingClientRect) {

	            var rect = ele.getBoundingClientRect();
	            box.width = Math.floor(rect.width || rect.right - rect.left);
	            box.height = Math.floor(rect.height || rect.bottom - rect.top);
	        } else {
	            b.width = ele.offsetWidth;
	            b.height = ele.offsetHeight;
	        }

	        return box;
	    },
	    getDisplayText: function getDisplayText(ele) {

	        if (!ele) {
	            return "";
	        }

	        var text = "";
	        if (ele.firstChild && ele.firstChild.nodeType == 3 || ele.lastChild && ele.lastChild.nodeType == 3) {

	            text = optimize.$(ele.firstChild).text().trim() || optimize.$(ele.lastChild).text().trim();
	        } else if (ele.nodeName && ele.nodeName.toLowerCase() == "input") {

	            if (ele.type.toLowerCase() == "submit" || ele.type.toLowerCase() == "button" || ele.type.toLowerCase() == "radio") {

	                text = ele.value;
	            } else {

	                text = ele.name;
	            }
	        }

	        return text.substring(0, 200);
	    }
	};

	exports.default = DOMEle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.common = exports.optimize = exports.getMultiSelector = exports.getSingleSelector = exports.select = undefined;

	var _select2 = __webpack_require__(4);

	Object.defineProperty(exports, 'getSingleSelector', {
	  enumerable: true,
	  get: function get() {
	    return _select2.getSingleSelector;
	  }
	});
	Object.defineProperty(exports, 'getMultiSelector', {
	  enumerable: true,
	  get: function get() {
	    return _select2.getMultiSelector;
	  }
	});

	var _select3 = _interopRequireDefault(_select2);

	var _optimize2 = __webpack_require__(8);

	var _optimize3 = _interopRequireDefault(_optimize2);

	var _common2 = __webpack_require__(9);

	var _common = _interopRequireWildcard(_common2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.select = _select3.default;
	exports.optimize = _optimize3.default;
	exports.common = _common;
	exports.default = _select3.default;
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldFNpbmdsZVNlbGVjdG9yIiwiZ2V0TXVsdGlTZWxlY3RvciIsInNlbGVjdCIsIm9wdGltaXplIiwiY29tbW9uIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUFpQkEsaUI7Ozs7OztvQkFBbUJDLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBN0JDLE07UUFDQUMsUTtRQUNLQyxNO1FBRUxDLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgc2VsZWN0LCB7IGdldFNpbmdsZVNlbGVjdG9yLCBnZXRNdWx0aVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3QnXG5leHBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmV4cG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbidcblxuZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9zZWxlY3QnXG4iXX0=


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * # Select
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Construct a unique CSS query selector to access the selected DOM element(s).
	                                                                                                                                                                                                                                                                               * For longevity it applies different matching and optimization strategies.
	                                                                                                                                                                                                                                                                               */

	exports.getSingleSelector = getSingleSelector;
	exports.getMultiSelector = getMultiSelector;
	exports.default = getQuerySelector;

	var _adapt = __webpack_require__(5);

	var _adapt2 = _interopRequireDefault(_adapt);

	var _match = __webpack_require__(6);

	var _match2 = _interopRequireDefault(_match);

	var _optimize = __webpack_require__(8);

	var _optimize2 = _interopRequireDefault(_optimize);

	var _utilities = __webpack_require__(7);

	var _common = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Get a selector for the provided element
	 *
	 * @param  {HTMLElement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	function getSingleSelector(element) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  if (element.nodeType === 3) {
	    element = element.parentNode;
	  }

	  if (element.nodeType !== 1) {
	    throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '")');
	  }

	  var globalModified = (0, _adapt2.default)(element, options);

	  var selector = (0, _match2.default)(element, options);
	  var optimized = (0, _optimize2.default)(selector, element, options);

	  // debug
	  // console.log(`
	  //   selector:  ${selector}
	  //   optimized: ${optimized}
	  // `)

	  if (globalModified) {
	    delete global.document;
	  }

	  return optimized;
	}

	/**
	 * Get a selector to match multiple descendants from an ancestor
	 *
	 * @param  {Array.<HTMLElement>|NodeList} elements - [description]
	 * @param  {Object}                       options  - [description]
	 * @return {string}                                - [description]
	 */
	function getMultiSelector(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  if (!Array.isArray(elements)) {
	    elements = (0, _utilities.convertNodeList)(elements);
	  }

	  if (elements.some(function (element) {
	    return element.nodeType !== 1;
	  })) {
	    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');
	  }

	  var globalModified = (0, _adapt2.default)(elements[0], options);

	  var ancestor = (0, _common.getCommonAncestor)(elements, options);
	  var ancestorSelector = getSingleSelector(ancestor, options);

	  // TODO: consider usage of multiple selectors + parent-child relation + check for part redundancy
	  var commonSelectors = getCommonSelectors(elements);
	  var descendantSelector = commonSelectors[0];

	  var selector = (0, _optimize2.default)(ancestorSelector + ' ' + descendantSelector, elements, options);
	  var selectorMatches = (0, _utilities.convertNodeList)(document.querySelectorAll(selector));

	  if (!elements.every(function (element) {
	    return selectorMatches.some(function (entry) {
	      return entry === element;
	    });
	  })) {
	    // TODO: cluster matches to split into similar groups for sub selections
	    return console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ', elements);
	  }

	  if (globalModified) {
	    delete global.document;
	  }

	  return selector;
	}

	/**
	 * Get selectors to describe a set of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {string}                        - [description]
	 */
	function getCommonSelectors(elements) {
	  var _getCommonProperties = (0, _common.getCommonProperties)(elements),
	      classes = _getCommonProperties.classes,
	      attributes = _getCommonProperties.attributes,
	      tag = _getCommonProperties.tag;

	  var selectorPath = [];

	  if (tag) {
	    selectorPath.push(tag);
	  }

	  if (classes) {
	    var classSelector = classes.map(function (name) {
	      return '.' + name;
	    }).join('');
	    selectorPath.push(classSelector);
	  }

	  if (attributes) {
	    var attributeSelector = Object.keys(attributes).reduce(function (parts, name) {
	      parts.push('[' + name + '="' + attributes[name] + '"]');
	      return parts;
	    }, []).join('');
	    selectorPath.push(attributeSelector);
	  }

	  if (selectorPath.length) {
	    // TODO: check for parent-child relation
	  }

	  return [selectorPath.join('')];
	}

	/**
	 * Choose action depending on the input (multiple/single)
	 *
	 * NOTE: extended detection is used for special cases like the <select> element with <options>
	 *
	 * @param  {HTMLElement|NodeList|Array.<HTMLElement>} input   - [description]
	 * @param  {Object}                                   options - [description]
	 * @return {string}                                           - [description]
	 */
	function getQuerySelector(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (input.length && !input.name) {
	    return getMultiSelector(input, options);
	  }
	  return getSingleSelector(input, options);
	}
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC5qcyJdLCJuYW1lcyI6WyJnZXRTaW5nbGVTZWxlY3RvciIsImdldE11bHRpU2VsZWN0b3IiLCJnZXRRdWVyeVNlbGVjdG9yIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJub2RlVHlwZSIsInBhcmVudE5vZGUiLCJFcnJvciIsImdsb2JhbE1vZGlmaWVkIiwic2VsZWN0b3IiLCJvcHRpbWl6ZWQiLCJnbG9iYWwiLCJkb2N1bWVudCIsImVsZW1lbnRzIiwiQXJyYXkiLCJpc0FycmF5Iiwic29tZSIsImFuY2VzdG9yIiwiYW5jZXN0b3JTZWxlY3RvciIsImNvbW1vblNlbGVjdG9ycyIsImdldENvbW1vblNlbGVjdG9ycyIsImRlc2NlbmRhbnRTZWxlY3RvciIsInNlbGVjdG9yTWF0Y2hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImVudHJ5IiwiY29uc29sZSIsIndhcm4iLCJjbGFzc2VzIiwiYXR0cmlidXRlcyIsInRhZyIsInNlbGVjdG9yUGF0aCIsInB1c2giLCJjbGFzc1NlbGVjdG9yIiwibWFwIiwibmFtZSIsImpvaW4iLCJhdHRyaWJ1dGVTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJwYXJ0cyIsImxlbmd0aCIsImlucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OFFBQUE7Ozs7Ozs7UUFvQmdCQSxpQixHQUFBQSxpQjtRQW1DQUMsZ0IsR0FBQUEsZ0I7a0JBb0ZRQyxnQjs7QUFwSXhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7QUFPTyxTQUFTRixpQkFBVCxDQUE0QkcsT0FBNUIsRUFBbUQ7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLEVBQUk7OztBQUV4RCxNQUFJRCxRQUFRRSxRQUFSLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCRixjQUFVQSxRQUFRRyxVQUFsQjtBQUNEOztBQUVELE1BQUlILFFBQVFFLFFBQVIsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBTSxJQUFJRSxLQUFK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TixXQUFXTSxJQUFYLENBQXhCO0FBQ0EsYUFBT00sS0FBUDtBQUNELEtBSHlCLEVBR3ZCLEVBSHVCLEVBR25CTCxJQUhtQixDQUdkLEVBSGMsQ0FBMUI7QUFJQUwsaUJBQWFDLElBQWIsQ0FBa0JLLGlCQUFsQjtBQUNEOztBQUVELE1BQUlOLGFBQWFXLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRUQsU0FBTyxDQUNMWCxhQUFhSyxJQUFiLENBQWtCLEVBQWxCLENBREssQ0FBUDtBQUdEOztBQUVEOzs7Ozs7Ozs7QUFTZSxTQUFTbEMsZ0JBQVQsQ0FBMkJ5QyxLQUEzQixFQUFnRDtBQUFBLE1BQWR2QyxPQUFjLHVFQUFKLEVBQUk7O0FBQzdELE1BQUl1QyxNQUFNRCxNQUFOLElBQWdCLENBQUNDLE1BQU1SLElBQTNCLEVBQWlDO0FBQy9CLFdBQU9sQyxpQkFBaUIwQyxLQUFqQixFQUF3QnZDLE9BQXhCLENBQVA7QUFDRDtBQUNELFNBQU9KLGtCQUFrQjJDLEtBQWxCLEVBQXlCdkMsT0FBekIsQ0FBUDtBQUNEIiwiZmlsZSI6InNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuXG5pbXBvcnQgYWRhcHQgZnJvbSAnLi9hZGFwdCdcbmltcG9ydCBtYXRjaCBmcm9tICcuL21hdGNoJ1xuaW1wb3J0IG9wdGltaXplIGZyb20gJy4vb3B0aW1pemUnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgZm9yIHRoZSBwcm92aWRlZCBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlU2VsZWN0b3IgKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSBvbmx5IEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBhcmUgc3VwcG9ydGVkISAobm90IFwiJHt0eXBlb2YgZWxlbWVudH1cIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50LCBvcHRpb25zKVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gbWF0Y2goZWxlbWVudCwgb3B0aW9ucylcbiAgY29uc3Qgb3B0aW1pemVkID0gb3B0aW1pemUoc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpXG5cbiAgLy8gZGVidWdcbiAgLy8gY29uc29sZS5sb2coYFxuICAvLyAgIHNlbGVjdG9yOiAgJHtzZWxlY3Rvcn1cbiAgLy8gICBvcHRpbWl6ZWQ6ICR7b3B0aW1pemVkfVxuICAvLyBgKVxuXG4gIGlmIChnbG9iYWxNb2RpZmllZCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnRcbiAgfVxuXG4gIHJldHVybiBvcHRpbWl6ZWRcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RvciAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCFgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclNlbGVjdG9yID0gZ2V0U2luZ2xlU2VsZWN0b3IoYW5jZXN0b3IsIG9wdGlvbnMpXG5cbiAgLy8gVE9ETzogY29uc2lkZXIgdXNhZ2Ugb2YgbXVsdGlwbGUgc2VsZWN0b3JzICsgcGFyZW50LWNoaWxkIHJlbGF0aW9uICsgY2hlY2sgZm9yIHBhcnQgcmVkdW5kYW5jeVxuICBjb25zdCBjb21tb25TZWxlY3RvcnMgPSBnZXRDb21tb25TZWxlY3RvcnMoZWxlbWVudHMpXG4gIGNvbnN0IGRlc2NlbmRhbnRTZWxlY3RvciA9IGNvbW1vblNlbGVjdG9yc1swXVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gb3B0aW1pemUoYCR7YW5jZXN0b3JTZWxlY3Rvcn0gJHtkZXNjZW5kYW50U2VsZWN0b3J9YCwgZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IHNlbGVjdG9yTWF0Y2hlcyA9IGNvbnZlcnROb2RlTGlzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblxuICBpZiAoIWVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBzZWxlY3Rvck1hdGNoZXMuc29tZSgoZW50cnkpID0+IGVudHJ5ID09PSBlbGVtZW50KSApKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICBUaGUgc2VsZWN0ZWQgZWxlbWVudHMgY2FuXFwndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGAsIGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKGdsb2JhbE1vZGlmaWVkKSB7XG4gICAgZGVsZXRlIGdsb2JhbC5kb2N1bWVudFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudHM+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tbW9uU2VsZWN0b3JzIChlbGVtZW50cykge1xuXG4gIGNvbnN0IHsgY2xhc3NlcywgYXR0cmlidXRlcywgdGFnIH0gPSBnZXRDb21tb25Qcm9wZXJ0aWVzKGVsZW1lbnRzKVxuXG4gIGNvbnN0IHNlbGVjdG9yUGF0aCA9IFtdXG5cbiAgaWYgKHRhZykge1xuICAgIHNlbGVjdG9yUGF0aC5wdXNoKHRhZylcbiAgfVxuXG4gIGlmIChjbGFzc2VzKSB7XG4gICAgY29uc3QgY2xhc3NTZWxlY3RvciA9IGNsYXNzZXMubWFwKChuYW1lKSA9PiBgLiR7bmFtZX1gKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGNsYXNzU2VsZWN0b3IpXG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChwYXJ0cywgbmFtZSkgPT4ge1xuICAgICAgcGFydHMucHVzaChgWyR7bmFtZX09XCIke2F0dHJpYnV0ZXNbbmFtZV19XCJdYClcbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH0sIFtdKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGF0dHJpYnV0ZVNlbGVjdG9yKVxuICB9XG5cbiAgaWYgKHNlbGVjdG9yUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgcGFyZW50LWNoaWxkIHJlbGF0aW9uXG4gIH1cblxuICByZXR1cm4gW1xuICAgIHNlbGVjdG9yUGF0aC5qb2luKCcnKVxuICBdXG59XG5cbi8qKlxuICogQ2hvb3NlIGFjdGlvbiBkZXBlbmRpbmcgb24gdGhlIGlucHV0IChtdWx0aXBsZS9zaW5nbGUpXG4gKlxuICogTk9URTogZXh0ZW5kZWQgZGV0ZWN0aW9uIGlzIHVzZWQgZm9yIHNwZWNpYWwgY2FzZXMgbGlrZSB0aGUgPHNlbGVjdD4gZWxlbWVudCB3aXRoIDxvcHRpb25zPlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvciAoaW5wdXQsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKSB7XG4gICAgcmV0dXJuIGdldE11bHRpU2VsZWN0b3IoaW5wdXQsIG9wdGlvbnMpXG4gIH1cbiAgcmV0dXJuIGdldFNpbmdsZVNlbGVjdG9yKGlucHV0LCBvcHRpb25zKVxufVxuIl19

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = adapt;
	/**
	 * # Adapt
	 *
	 * Check and extend the environment for universal usage.
	 */

	/**
	 * Modify the context based on the environment
	 *
	 * @param  {HTMLELement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {boolean}             - [description]
	 */
	function adapt(element, options) {

	  // detect environment setup
	  if (global.document) {
	    return false;
	  } else {
	    global.document = options.context || function () {
	      var root = element;
	      while (root.parent) {
	        root = root.parent;
	      }
	      return root;
	    }();
	  }

	  // https://github.com/fb55/domhandler/blob/master/index.js#L75
	  var ElementPrototype = Object.getPrototypeOf(global.document);

	  // alternative descriptor to access elements with filtering invalid elements (e.g. textnodes)
	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'childTags')) {
	    Object.defineProperty(ElementPrototype, 'childTags', {
	      enumerable: true,
	      get: function get() {
	        return this.children.filter(function (node) {
	          // https://github.com/fb55/domelementtype/blob/master/index.js#L12
	          return node.type === 'tag' || node.type === 'script' || node.type === 'style';
	        });
	      }
	    });
	  }

	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'attributes')) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
	    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
	    Object.defineProperty(ElementPrototype, 'attributes', {
	      enumerable: true,
	      get: function get() {
	        var attribs = this.attribs;

	        var attributesNames = Object.keys(attribs);
	        var NamedNodeMap = attributesNames.reduce(function (attributes, attributeName, index) {
	          attributes[index] = {
	            name: attributeName,
	            value: attribs[attributeName]
	          };
	          return attributes;
	        }, {});
	        Object.defineProperty(NamedNodeMap, 'length', {
	          enumerable: false,
	          configurable: false,
	          value: attributesNames.length
	        });
	        return NamedNodeMap;
	      }
	    });
	  }

	  if (!ElementPrototype.getAttribute) {
	    // https://docs.webplatform.org/wiki/dom/Element/getAttribute
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
	    ElementPrototype.getAttribute = function (name) {
	      return this.attribs[name] || null;
	    };
	  }

	  if (!ElementPrototype.getElementsByTagName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByTagName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
	    ElementPrototype.getElementsByTagName = function (tagName) {
	      var HTMLCollection = [];
	      traverseDescendants(this.childTags, function (descendant) {
	        if (descendant.name === tagName || tagName === '*') {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }

	  if (!ElementPrototype.getElementsByClassName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByClassName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
	    ElementPrototype.getElementsByClassName = function (className) {
	      var names = className.trim().replace(/\s+/g, ' ').split(' ');
	      var HTMLCollection = [];
	      traverseDescendants([this], function (descendant) {
	        var descendantClassName = descendant.attribs.class;
	        if (descendantClassName && names.every(function (name) {
	          return descendantClassName.indexOf(name) > -1;
	        })) {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }

	  if (!ElementPrototype.querySelectorAll) {
	    // https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
	    ElementPrototype.querySelectorAll = function (selectors) {
	      var _this = this;

	      selectors = selectors.replace(/(>)(\S)/g, '$1 $2').trim(); // add space for '>' selector

	      // using right to left execution => https://github.com/fb55/css-select#how-does-it-work
	      var instructions = getInstructions(selectors);
	      var discover = instructions.shift();

	      var total = instructions.length;
	      return discover(this).filter(function (node) {
	        var step = 0;
	        while (step < total) {
	          node = instructions[step](node, _this);
	          if (!node) {
	            // hierarchy doesn't match
	            return false;
	          }
	          step += 1;
	        }
	        return true;
	      });
	    };
	  }

	  if (!ElementPrototype.contains) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
	    ElementPrototype.contains = function (element) {
	      var inclusive = false;
	      traverseDescendants([this], function (descendant, done) {
	        if (descendant === element) {
	          inclusive = true;
	          done();
	        }
	      });
	      return inclusive;
	    };
	  }

	  return true;
	}

	/**
	 * Retrieve transformation steps
	 *
	 * @param  {Array.<string>}   selectors - [description]
	 * @return {Array.<Function>}           - [description]
	 */
	function getInstructions(selectors) {
	  return selectors.split(' ').reverse().map(function (selector, step) {
	    var discover = step === 0;

	    var _selector$split = selector.split(':'),
	        _selector$split2 = _slicedToArray(_selector$split, 2),
	        type = _selector$split2[0],
	        pseudo = _selector$split2[1];

	    var validate = null;
	    var instruction = null;

	    (function () {
	      switch (true) {

	        // child: '>'
	        case />/.test(type):
	          instruction = function checkParent(node) {
	            return function (validate) {
	              return validate(node.parent) && node.parent;
	            };
	          };
	          break;

	        // class: '.'
	        case /^\./.test(type):
	          var names = type.substr(1).split('.');
	          validate = function validate(node) {
	            var nodeClassName = node.attribs.class;
	            return nodeClassName && names.every(function (name) {
	              return nodeClassName.indexOf(name) > -1;
	            });
	          };
	          instruction = function checkClass(node, root) {
	            if (discover) {
	              return node.getElementsByClassName(names.join(' '));
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // attribute: '[key="value"]'
	        case /^\[/.test(type):
	          var _type$replace$split = type.replace(/\[|\]|"/g, '').split('='),
	              _type$replace$split2 = _slicedToArray(_type$replace$split, 2),
	              attributeKey = _type$replace$split2[0],
	              attributeValue = _type$replace$split2[1];

	          validate = function validate(node) {
	            var hasAttribute = Object.keys(node.attribs).indexOf(attributeKey) > -1;
	            if (hasAttribute) {
	              // regard optional attributeValue
	              if (!attributeValue || node.attribs[attributeKey] === attributeValue) {
	                return true;
	              }
	            }
	            return false;
	          };
	          instruction = function checkAttribute(node, root) {
	            if (discover) {
	              var _ret2 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // id: '#'
	        case /^#/.test(type):
	          var id = type.substr(1);
	          validate = function validate(node) {
	            return node.attribs.id === id;
	          };
	          instruction = function checkId(node, root) {
	            if (discover) {
	              var _ret3 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant, done) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                    done();
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // universal: '*'
	        case /\*/.test(type):
	          validate = function validate(node) {
	            return true;
	          };
	          instruction = function checkUniversal(node, root) {
	            if (discover) {
	              var _ret4 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  return NodeList.push(descendant);
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // tag: '...'
	        default:
	          validate = function validate(node) {
	            return node.name === type;
	          };
	          instruction = function checkTag(node, root) {
	            if (discover) {
	              var _ret5 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	      }
	    })();

	    if (!pseudo) {
	      return instruction;
	    }

	    var rule = pseudo.match(/-(child|type)\((\d+)\)$/);
	    var kind = rule[1];
	    var index = parseInt(rule[2], 10) - 1;

	    var validatePseudo = function validatePseudo(node) {
	      if (node) {
	        var compareSet = node.parent.childTags;
	        if (kind === 'type') {
	          compareSet = compareSet.filter(validate);
	        }
	        var nodeIndex = compareSet.findIndex(function (child) {
	          return child === node;
	        });
	        if (nodeIndex === index) {
	          return true;
	        }
	      }
	      return false;
	    };

	    return function enhanceInstruction(node) {
	      var match = instruction(node);
	      if (discover) {
	        return match.reduce(function (NodeList, matchedNode) {
	          if (validatePseudo(matchedNode)) {
	            NodeList.push(matchedNode);
	          }
	          return NodeList;
	        }, []);
	      }
	      return validatePseudo(match) && match;
	    };
	  });
	}

	/**
	 * Walking recursive to invoke callbacks
	 *
	 * @param {Array.<HTMLElement>} nodes   - [description]
	 * @param {Function}            handler - [description]
	 */
	function traverseDescendants(nodes, handler) {
	  nodes.forEach(function (node) {
	    var progress = true;
	    handler(node, function () {
	      return progress = false;
	    });
	    if (node.childTags && progress) {
	      traverseDescendants(node.childTags, handler);
	    }
	  });
	}

	/**
	 * Bubble up from bottom to top
	 *
	 * @param  {HTMLELement} node     - [description]
	 * @param  {HTMLELement} root     - [description]
	 * @param  {Function}    validate - [description]
	 * @return {HTMLELement}          - [description]
	 */
	function getAncestor(node, root, validate) {
	  while (node.parent) {
	    node = node.parent;
	    if (validate(node)) {
	      return node;
	    }
	    if (node === root) {
	      break;
	    }
	  }
	  return null;
	}
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkYXB0LmpzIl0sIm5hbWVzIjpbImFkYXB0IiwiZWxlbWVudCIsIm9wdGlvbnMiLCJnbG9iYWwiLCJkb2N1bWVudCIsImNvbnRleHQiLCJyb290IiwicGFyZW50IiwiRWxlbWVudFByb3RvdHlwZSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiY2hpbGRyZW4iLCJmaWx0ZXIiLCJub2RlIiwidHlwZSIsImF0dHJpYnMiLCJhdHRyaWJ1dGVzTmFtZXMiLCJrZXlzIiwiTmFtZWROb2RlTWFwIiwicmVkdWNlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU5hbWUiLCJpbmRleCIsIm5hbWUiLCJ2YWx1ZSIsImNvbmZpZ3VyYWJsZSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidGFnTmFtZSIsIkhUTUxDb2xsZWN0aW9uIiwidHJhdmVyc2VEZXNjZW5kYW50cyIsImNoaWxkVGFncyIsImRlc2NlbmRhbnQiLCJwdXNoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsYXNzTmFtZSIsIm5hbWVzIiwidHJpbSIsInJlcGxhY2UiLCJzcGxpdCIsImRlc2NlbmRhbnRDbGFzc05hbWUiLCJjbGFzcyIsImV2ZXJ5IiwiaW5kZXhPZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RvcnMiLCJpbnN0cnVjdGlvbnMiLCJnZXRJbnN0cnVjdGlvbnMiLCJkaXNjb3ZlciIsInNoaWZ0IiwidG90YWwiLCJzdGVwIiwiY29udGFpbnMiLCJpbmNsdXNpdmUiLCJkb25lIiwicmV2ZXJzZSIsIm1hcCIsInNlbGVjdG9yIiwicHNldWRvIiwidmFsaWRhdGUiLCJpbnN0cnVjdGlvbiIsInRlc3QiLCJjaGVja1BhcmVudCIsInN1YnN0ciIsIm5vZGVDbGFzc05hbWUiLCJjaGVja0NsYXNzIiwiam9pbiIsImdldEFuY2VzdG9yIiwiYXR0cmlidXRlS2V5IiwiYXR0cmlidXRlVmFsdWUiLCJoYXNBdHRyaWJ1dGUiLCJjaGVja0F0dHJpYnV0ZSIsIk5vZGVMaXN0IiwiaWQiLCJjaGVja0lkIiwiY2hlY2tVbml2ZXJzYWwiLCJjaGVja1RhZyIsInJ1bGUiLCJtYXRjaCIsImtpbmQiLCJwYXJzZUludCIsInZhbGlkYXRlUHNldWRvIiwiY29tcGFyZVNldCIsIm5vZGVJbmRleCIsImZpbmRJbmRleCIsImNoaWxkIiwiZW5oYW5jZUluc3RydWN0aW9uIiwibWF0Y2hlZE5vZGUiLCJub2RlcyIsImhhbmRsZXIiLCJmb3JFYWNoIiwicHJvZ3Jlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBYXdCQSxLO0FBYnhCOzs7Ozs7QUFNQTs7Ozs7OztBQU9lLFNBQVNBLEtBQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxPQUF6QixFQUFrQzs7QUFFL0M7QUFDQSxNQUFJQyxPQUFPQyxRQUFYLEVBQXFCO0FBQ25CLFdBQU8sS0FBUDtBQUNELEdBRkQsTUFFTztBQUNMRCxXQUFPQyxRQUFQLEdBQWtCRixRQUFRRyxPQUFSLElBQW9CLFlBQU07QUFDMUMsVUFBSUMsT0FBT0wsT0FBWDtBQUNBLGFBQU9LLEtBQUtDLE1BQVosRUFBb0I7QUFDbEJELGVBQU9BLEtBQUtDLE1BQVo7QUFDRDtBQUNELGFBQU9ELElBQVA7QUFDRCxLQU5vQyxFQUFyQztBQU9EOztBQUVEO0FBQ0EsTUFBTUUsbUJBQW1CQyxPQUFPQyxjQUFQLENBQXNCUCxPQUFPQyxRQUE3QixDQUF6Qjs7QUFFQTtBQUNBLE1BQUksQ0FBQ0ssT0FBT0Usd0JBQVAsQ0FBZ0NILGdCQUFoQyxFQUFrRCxXQUFsRCxDQUFMLEVBQXFFO0FBQ25FQyxXQUFPRyxjQUFQLENBQXNCSixnQkFBdEIsRUFBd0MsV0FBeEMsRUFBcUQ7QUFDbkRLLGtCQUFZLElBRHVDO0FBRW5EQyxTQUZtRCxpQkFFNUM7QUFDTCxlQUFPLEtBQUtDLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQixVQUFDQyxJQUFELEVBQVU7QUFD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QUFDQUYsWUFBUTdFLElBQVIsRUFBYztBQUFBLGFBQU0rRSxXQUFXLEtBQWpCO0FBQUEsS0FBZDtBQUNBLFFBQUkvRSxLQUFLbUIsU0FBTCxJQUFrQjRELFFBQXRCLEVBQWdDO0FBQzlCN0QsMEJBQW9CbEIsS0FBS21CLFNBQXpCLEVBQW9DMEQsT0FBcEM7QUFDRDtBQUNGLEdBTkQ7QUFPRDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTdEIsV0FBVCxDQUFzQnZELElBQXRCLEVBQTRCWCxJQUE1QixFQUFrQzBELFFBQWxDLEVBQTRDO0FBQzFDLFNBQU8vQyxLQUFLVixNQUFaLEVBQW9CO0FBQ2xCVSxXQUFPQSxLQUFLVixNQUFaO0FBQ0EsUUFBSXlELFNBQVMvQyxJQUFULENBQUosRUFBb0I7QUFDbEIsYUFBT0EsSUFBUDtBQUNEO0FBQ0QsUUFBSUEsU0FBU1gsSUFBYixFQUFtQjtBQUNqQjtBQUNEO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJhZGFwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBBZGFwdFxuICpcbiAqIENoZWNrIGFuZCBleHRlbmQgdGhlIGVudmlyb25tZW50IGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gKi9cblxuLyoqXG4gKiBNb2RpZnkgdGhlIGNvbnRleHQgYmFzZWQgb24gdGhlIGVudmlyb25tZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVMZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGFwdCAoZWxlbWVudCwgb3B0aW9ucykge1xuXG4gIC8vIGRldGVjdCBlbnZpcm9ubWVudCBzZXR1cFxuICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLmRvY3VtZW50ID0gb3B0aW9ucy5jb250ZXh0IHx8ICgoKSA9PiB7XG4gICAgICB2YXIgcm9vdCA9IGVsZW1lbnRcbiAgICAgIHdoaWxlIChyb290LnBhcmVudCkge1xuICAgICAgICByb290ID0gcm9vdC5wYXJlbnRcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290XG4gICAgfSkoKVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvZG9taGFuZGxlci9ibG9iL21hc3Rlci9pbmRleC5qcyNMNzVcbiAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwuZG9jdW1lbnQpXG5cbiAgLy8gYWx0ZXJuYXRpdmUgZGVzY3JpcHRvciB0byBhY2Nlc3MgZWxlbWVudHMgd2l0aCBmaWx0ZXJpbmcgaW52YWxpZCBlbGVtZW50cyAoZS5nLiB0ZXh0bm9kZXMpXG4gIGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGRUYWdzJykpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkVGFncycsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmI1NS9kb21lbGVtZW50dHlwZS9ibG9iL21hc3Rlci9pbmRleC5qcyNMMTJcbiAgICAgICAgICByZXR1cm4gbm9kZS50eXBlID09PSAndGFnJyB8fCBub2RlLnR5cGUgPT09ICdzY3JpcHQnIHx8IG5vZGUudHlwZSA9PT0gJ3N0eWxlJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudFByb3RvdHlwZSwgJ2F0dHJpYnV0ZXMnKSkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dHJpYnV0ZXNcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTmFtZWROb2RlTWFwXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnRQcm90b3R5cGUsICdhdHRyaWJ1dGVzJywge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIGNvbnN0IHsgYXR0cmlicyB9ID0gdGhpc1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJzKVxuICAgICAgICBjb25zdCBOYW1lZE5vZGVNYXAgPSBhdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChhdHRyaWJ1dGVzLCBhdHRyaWJ1dGVOYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGF0dHJpYnV0ZXNbaW5kZXhdID0ge1xuICAgICAgICAgICAgbmFtZTogYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBhdHRyaWJzW2F0dHJpYnV0ZU5hbWVdXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gICAgICAgIH0sIHsgfSlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5hbWVkTm9kZU1hcCwgJ2xlbmd0aCcsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBhdHRyaWJ1dGVzTmFtZXMubGVuZ3RoXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBOYW1lZE5vZGVNYXBcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmdldEF0dHJpYnV0ZSkge1xuICAgIC8vIGh0dHBzOi8vZG9jcy53ZWJwbGF0Zm9ybS5vcmcvd2lraS9kb20vRWxlbWVudC9nZXRBdHRyaWJ1dGVcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRBdHRyaWJ1dGVcbiAgICBFbGVtZW50UHJvdG90eXBlLmdldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJzW25hbWVdIHx8IG51bGxcbiAgICB9XG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvZG9tL0RvY3VtZW50L2dldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0RWxlbWVudHNCeVRhZ05hbWVcbiAgICBFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lID0gZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgIGNvbnN0IEhUTUxDb2xsZWN0aW9uID0gW11cbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHModGhpcy5jaGlsZFRhZ3MsIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgIGlmIChkZXNjZW5kYW50Lm5hbWUgPT09IHRhZ05hbWUgfHwgdGFnTmFtZSA9PT0gJyonKSB7XG4gICAgICAgICAgSFRNTENvbGxlY3Rpb24ucHVzaChkZXNjZW5kYW50KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIEhUTUxDb2xsZWN0aW9uXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvZG9tL0RvY3VtZW50L2dldEVsZW1lbnRzQnlDbGFzc05hbWVcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRFbGVtZW50c0J5Q2xhc3NOYW1lXG4gICAgRWxlbWVudFByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgY29uc3QgbmFtZXMgPSBjbGFzc05hbWUudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKS5zcGxpdCgnICcpXG4gICAgICBjb25zdCBIVE1MQ29sbGVjdGlvbiA9IFtdXG4gICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFt0aGlzXSwgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudENsYXNzTmFtZSA9IGRlc2NlbmRhbnQuYXR0cmlicy5jbGFzc1xuICAgICAgICBpZiAoZGVzY2VuZGFudENsYXNzTmFtZSAmJiBuYW1lcy5ldmVyeSgobmFtZSkgPT4gZGVzY2VuZGFudENsYXNzTmFtZS5pbmRleE9mKG5hbWUpID4gLTEpKSB7XG4gICAgICAgICAgSFRNTENvbGxlY3Rpb24ucHVzaChkZXNjZW5kYW50KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIEhUTUxDb2xsZWN0aW9uXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvY3NzL3NlbGVjdG9yc19hcGkvcXVlcnlTZWxlY3RvckFsbFxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3F1ZXJ5U2VsZWN0b3JBbGxcbiAgICBFbGVtZW50UHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG4gICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKD4pKFxcUykvZywgJyQxICQyJykudHJpbSgpIC8vIGFkZCBzcGFjZSBmb3IgJz4nIHNlbGVjdG9yXG5cbiAgICAgIC8vIHVzaW5nIHJpZ2h0IHRvIGxlZnQgZXhlY3V0aW9uID0+IGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2Nzcy1zZWxlY3QjaG93LWRvZXMtaXQtd29ya1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZ2V0SW5zdHJ1Y3Rpb25zKHNlbGVjdG9ycylcbiAgICAgIGNvbnN0IGRpc2NvdmVyID0gaW5zdHJ1Y3Rpb25zLnNoaWZ0KClcblxuICAgICAgY29uc3QgdG90YWwgPSBpbnN0cnVjdGlvbnMubGVuZ3RoXG4gICAgICByZXR1cm4gZGlzY292ZXIodGhpcykuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgIHZhciBzdGVwID0gMFxuICAgICAgICB3aGlsZSAoc3RlcCA8IHRvdGFsKSB7XG4gICAgICAgICAgbm9kZSA9IGluc3RydWN0aW9uc1tzdGVwXShub2RlLCB0aGlzKVxuICAgICAgICAgIGlmICghbm9kZSkgeyAvLyBoaWVyYXJjaHkgZG9lc24ndCBtYXRjaFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ZXAgKz0gMVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5jb250YWlucykge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL2NvbnRhaW5zXG4gICAgRWxlbWVudFByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgaW5jbHVzaXZlID0gZmFsc2VcbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW3RoaXNdLCAoZGVzY2VuZGFudCwgZG9uZSkgPT4ge1xuICAgICAgICBpZiAoZGVzY2VuZGFudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIGluY2x1c2l2ZSA9IHRydWVcbiAgICAgICAgICBkb25lKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBpbmNsdXNpdmVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIHRyYW5zZm9ybWF0aW9uIHN0ZXBzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59ICAgc2VsZWN0b3JzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPEZ1bmN0aW9uPn0gICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBnZXRJbnN0cnVjdGlvbnMgKHNlbGVjdG9ycykge1xuICByZXR1cm4gc2VsZWN0b3JzLnNwbGl0KCcgJykucmV2ZXJzZSgpLm1hcCgoc2VsZWN0b3IsIHN0ZXApID0+IHtcbiAgICBjb25zdCBkaXNjb3ZlciA9IHN0ZXAgPT09IDBcbiAgICBjb25zdCBbdHlwZSwgcHNldWRvXSA9IHNlbGVjdG9yLnNwbGl0KCc6JylcblxuICAgIHZhciB2YWxpZGF0ZSA9IG51bGxcbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSBudWxsXG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcblxuICAgICAgLy8gY2hpbGQ6ICc+J1xuICAgICAgY2FzZSAvPi8udGVzdCh0eXBlKTpcbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja1BhcmVudCAobm9kZSkge1xuICAgICAgICAgIHJldHVybiAodmFsaWRhdGUpID0+IHZhbGlkYXRlKG5vZGUucGFyZW50KSAmJiBub2RlLnBhcmVudFxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGNsYXNzOiAnLidcbiAgICAgIGNhc2UgL15cXC4vLnRlc3QodHlwZSk6XG4gICAgICAgIGNvbnN0IG5hbWVzID0gdHlwZS5zdWJzdHIoMSkuc3BsaXQoJy4nKVxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUNsYXNzTmFtZSA9IG5vZGUuYXR0cmlicy5jbGFzc1xuICAgICAgICAgIHJldHVybiBub2RlQ2xhc3NOYW1lICYmIG5hbWVzLmV2ZXJ5KChuYW1lKSA9PiBub2RlQ2xhc3NOYW1lLmluZGV4T2YobmFtZSkgPiAtMSlcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrQ2xhc3MgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZXMuam9pbignICcpKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gYXR0cmlidXRlOiAnW2tleT1cInZhbHVlXCJdJ1xuICAgICAgY2FzZSAvXlxcWy8udGVzdCh0eXBlKTpcbiAgICAgICAgY29uc3QgW2F0dHJpYnV0ZUtleSwgYXR0cmlidXRlVmFsdWVdID0gdHlwZS5yZXBsYWNlKC9cXFt8XFxdfFwiL2csICcnKS5zcGxpdCgnPScpXG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBoYXNBdHRyaWJ1dGUgPSBPYmplY3Qua2V5cyhub2RlLmF0dHJpYnMpLmluZGV4T2YoYXR0cmlidXRlS2V5KSA+IC0xXG4gICAgICAgICAgaWYgKGhhc0F0dHJpYnV0ZSkgeyAvLyByZWdhcmQgb3B0aW9uYWwgYXR0cmlidXRlVmFsdWVcbiAgICAgICAgICAgIGlmICghYXR0cmlidXRlVmFsdWUgfHwgKG5vZGUuYXR0cmlic1thdHRyaWJ1dGVLZXldID09PSBhdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja0F0dHJpYnV0ZSAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgY29uc3QgTm9kZUxpc3QgPSBbXVxuICAgICAgICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbbm9kZV0sIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0ZShkZXNjZW5kYW50KSkge1xuICAgICAgICAgICAgICAgIE5vZGVMaXN0LnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gaWQ6ICcjJ1xuICAgICAgY2FzZSAvXiMvLnRlc3QodHlwZSk6XG4gICAgICAgIGNvbnN0IGlkID0gdHlwZS5zdWJzdHIoMSlcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBub2RlLmF0dHJpYnMuaWQgPT09IGlkXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja0lkIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQsIGRvbmUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlKGRlc2NlbmRhbnQpKSB7XG4gICAgICAgICAgICAgICAgTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KVxuICAgICAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyB1bml2ZXJzYWw6ICcqJ1xuICAgICAgY2FzZSAvXFwqLy50ZXN0KHR5cGUpOlxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB0cnVlXG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tVbml2ZXJzYWwgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IE5vZGVMaXN0ID0gW11cbiAgICAgICAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW25vZGVdLCAoZGVzY2VuZGFudCkgPT4gTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gdGFnOiAnLi4uJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBub2RlLm5hbWUgPT09IHR5cGVcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrVGFnIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlKGRlc2NlbmRhbnQpKSB7XG4gICAgICAgICAgICAgICAgTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcHNldWRvKSB7XG4gICAgICByZXR1cm4gaW5zdHJ1Y3Rpb25cbiAgICB9XG5cbiAgICBjb25zdCBydWxlID0gcHNldWRvLm1hdGNoKC8tKGNoaWxkfHR5cGUpXFwoKFxcZCspXFwpJC8pXG4gICAgY29uc3Qga2luZCA9IHJ1bGVbMV1cbiAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KHJ1bGVbMl0sIDEwKSAtIDFcblxuICAgIGNvbnN0IHZhbGlkYXRlUHNldWRvID0gKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHZhciBjb21wYXJlU2V0ID0gbm9kZS5wYXJlbnQuY2hpbGRUYWdzXG4gICAgICAgIGlmIChraW5kID09PSAndHlwZScpIHtcbiAgICAgICAgICBjb21wYXJlU2V0ID0gY29tcGFyZVNldC5maWx0ZXIodmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gY29tcGFyZVNldC5maW5kSW5kZXgoKGNoaWxkKSA9PiBjaGlsZCA9PT0gbm9kZSlcbiAgICAgICAgaWYgKG5vZGVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZW5oYW5jZUluc3RydWN0aW9uIChub2RlKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGluc3RydWN0aW9uKG5vZGUpXG4gICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlZHVjZSgoTm9kZUxpc3QsIG1hdGNoZWROb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRlUHNldWRvKG1hdGNoZWROb2RlKSkge1xuICAgICAgICAgICAgTm9kZUxpc3QucHVzaChtYXRjaGVkTm9kZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgIH0sIFtdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbGlkYXRlUHNldWRvKG1hdGNoKSAmJiBtYXRjaFxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBXYWxraW5nIHJlY3Vyc2l2ZSB0byBpbnZva2UgY2FsbGJhY2tzXG4gKlxuICogQHBhcmFtIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBub2RlcyAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gICAgICAgICAgICBoYW5kbGVyIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZURlc2NlbmRhbnRzIChub2RlcywgaGFuZGxlcikge1xuICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgdmFyIHByb2dyZXNzID0gdHJ1ZVxuICAgIGhhbmRsZXIobm9kZSwgKCkgPT4gcHJvZ3Jlc3MgPSBmYWxzZSlcbiAgICBpZiAobm9kZS5jaGlsZFRhZ3MgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMobm9kZS5jaGlsZFRhZ3MsIGhhbmRsZXIpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEJ1YmJsZSB1cCBmcm9tIGJvdHRvbSB0byB0b3BcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRUxlbWVudH0gbm9kZSAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRUxlbWVudH0gcm9vdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgdmFsaWRhdGUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtIVE1MRUxlbWVudH0gICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGdldEFuY2VzdG9yIChub2RlLCByb290LCB2YWxpZGF0ZSkge1xuICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRcbiAgICBpZiAodmFsaWRhdGUobm9kZSkpIHtcbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuICAgIGlmIChub2RlID09PSByb290KSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuIl19

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = match;

	var _utilities = __webpack_require__(7);

	var defaultIgnore = {
	  attribute: function attribute(attributeName) {
	    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;
	  }
	};

	/**
	 * Get the path of the element
	 *
	 * @param  {HTMLElement} node    - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	/**
	 * # Match
	 *
	 * Retrieve selector for a node.
	 */

	function match(node, options) {
	  var _options$root = options.root,
	      root = _options$root === undefined ? document : _options$root,
	      _options$skip = options.skip,
	      skip = _options$skip === undefined ? null : _options$skip,
	      _options$priority = options.priority,
	      priority = _options$priority === undefined ? ['id', 'class', 'href', 'src'] : _options$priority,
	      _options$ignore = options.ignore,
	      ignore = _options$ignore === undefined ? {} : _options$ignore;


	  var path = [];
	  var element = node;
	  var length = path.length;
	  var ignoreClass = false;

	  var skipCompare = skip && (Array.isArray(skip) ? skip : [skip]).map(function (entry) {
	    if (typeof entry !== 'function') {
	      return function (element) {
	        return element === entry;
	      };
	    }
	    return entry;
	  });

	  var skipChecks = function skipChecks(element) {
	    return skip && skipCompare.some(function (compare) {
	      return compare(element);
	    });
	  };

	  Object.keys(ignore).forEach(function (type) {
	    if (type === 'class') {
	      ignoreClass = true;
	    }
	    var predicate = ignore[type];
	    if (typeof predicate === 'function') return;
	    if (typeof predicate === 'number') {
	      predicate = predicate.toString();
	    }
	    if (typeof predicate === 'string') {
	      predicate = new RegExp((0, _utilities.escapeValue)(predicate).replace(/\\/g, '\\\\'));
	    }
	    if (typeof predicate === 'boolean') {
	      predicate = predicate ? /(?:)/ : /.^/;
	    }
	    // check class-/attributename for regex
	    ignore[type] = function (name, value) {
	      return predicate.test(value);
	    };
	  });

	  if (ignoreClass) {
	    (function () {
	      var ignoreAttribute = ignore.attribute;
	      ignore.attribute = function (name, value, defaultPredicate) {
	        return ignore.class(value) || ignoreAttribute && ignoreAttribute(name, value, defaultPredicate);
	      };
	    })();
	  }

	  while (element !== root) {
	    if (skipChecks(element) !== true) {
	      // ~ global
	      if (checkAttributes(priority, element, ignore, path, root)) break;
	      if (checkTag(element, ignore, path, root)) break;

	      // ~ local
	      checkAttributes(priority, element, ignore, path);
	      if (path.length === length) {
	        checkTag(element, ignore, path);
	      }

	      // define only one part each iteration
	      if (path.length === length) {
	        checkChilds(priority, element, ignore, path);
	      }
	    }

	    element = element.parentNode;
	    length = path.length;
	  }

	  if (element === root) {
	    var pattern = findPattern(priority, element, ignore);
	    path.unshift(pattern);
	  }

	  return path.join(' ');
	}

	/**
	 * Extend path with attribute identifier
	 *
	 * @param  {Array.<string>} priority - [description]
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Object}         ignore   - [description]
	 * @param  {Array.<string>} path     - [description]
	 * @param  {HTMLElement}    parent   - [description]
	 * @return {boolean}                 - [description]
	 */
	function checkAttributes(priority, element, ignore, path) {
	  var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : element.parentNode;

	  var pattern = findAttributesPattern(priority, element, ignore);
	  if (pattern) {
	    var matches = parent.querySelectorAll(pattern);
	    if (matches.length === 1) {
	      path.unshift(pattern);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Lookup attribute identifier
	 *
	 * @param  {Array.<string>} priority - [description]
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Object}         ignore   - [description]
	 * @return {string?}                 - [description]
	 */
	function findAttributesPattern(priority, element, ignore) {
	  var attributes = element.attributes;
	  var sortedKeys = Object.keys(attributes).sort(function (curr, next) {
	    var currPos = priority.indexOf(attributes[curr].name);
	    var nextPos = priority.indexOf(attributes[next].name);
	    if (nextPos === -1) {
	      if (currPos === -1) {
	        return 0;
	      }
	      return -1;
	    }
	    return currPos - nextPos;
	  });

	  for (var i = 0, l = sortedKeys.length; i < l; i++) {
	    var key = sortedKeys[i];
	    var attribute = attributes[key];
	    var attributeName = attribute.name;
	    var attributeValue = (0, _utilities.escapeValue)(attribute.value);

	    var currentIgnore = ignore[attributeName] || ignore.attribute;
	    var currentDefaultIgnore = defaultIgnore[attributeName] || defaultIgnore.attribute;
	    if (checkIgnore(currentIgnore, attributeName, attributeValue, currentDefaultIgnore)) {
	      continue;
	    }

	    var pattern = '[' + attributeName + '="' + attributeValue + '"]';

	    if (/\b\d/.test(attributeValue) === false) {
	      if (attributeName === 'id') {
	        pattern = '#' + attributeValue;
	      }

	      if (attributeName === 'class') {
	        var className = attributeValue.trim().replace(/\s+/g, '.');
	        pattern = '.' + className;
	      }
	    }

	    return pattern;
	  }
	  return null;
	}

	/**
	 * Extend path with tag identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Object}         ignore  - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTag(element, ignore, path) {
	  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : element.parentNode;

	  var pattern = findTagPattern(element, ignore);
	  if (pattern) {
	    var matches = parent.getElementsByTagName(pattern);
	    if (matches.length === 1) {
	      path.unshift(pattern);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Lookup tag identifier
	 *
	 * @param  {HTMLElement} element - [description]
	 * @param  {Object}      ignore  - [description]
	 * @return {boolean}             - [description]
	 */
	function findTagPattern(element, ignore) {
	  var tagName = element.tagName.toLowerCase();
	  if (checkIgnore(ignore.tag, null, tagName)) {
	    return null;
	  }
	  return tagName;
	}

	/**
	 * Extend path with specific child identifier
	 *
	 * NOTE: 'childTags' is a custom property to use as a view filter for tags using 'adapter.js'
	 *
	 * @param  {Array.<string>} priority - [description]
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Object}         ignore   - [description]
	 * @param  {Array.<string>} path     - [description]
	 * @return {boolean}                 - [description]
	 */
	function checkChilds(priority, element, ignore, path) {
	  var parent = element.parentNode;
	  var children = parent.childTags || parent.children;
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    if (child === element) {
	      var childPattern = findPattern(priority, child, ignore);
	      if (!childPattern) {
	        return console.warn('\n          Element couldn\'t be matched through strict ignore pattern!\n        ', child, ignore, childPattern);
	      }
	      var pattern = '> ' + childPattern + ':nth-child(' + (i + 1) + ')';
	      path.unshift(pattern);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Lookup identifier
	 *
	 * @param  {Array.<string>} priority - [description]
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Object}         ignore   - [description]
	 * @return {string}                  - [description]
	 */
	function findPattern(priority, element, ignore) {
	  var pattern = findAttributesPattern(priority, element, ignore);
	  if (!pattern) {
	    pattern = findTagPattern(element, ignore);
	  }
	  return pattern;
	}

	/**
	 * Validate with custom and default functions
	 *
	 * @param  {Function} predicate        - [description]
	 * @param  {string?}  name             - [description]
	 * @param  {string}   value            - [description]
	 * @param  {Function} defaultPredicate - [description]
	 * @return {boolean}                   - [description]
	 */
	function checkIgnore(predicate, name, value, defaultPredicate) {
	  if (!value) {
	    return true;
	  }
	  var check = predicate || defaultPredicate;
	  if (!check) {
	    return false;
	  }
	  return check(name, value, defaultPredicate);
	}
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGNoLmpzIl0sIm5hbWVzIjpbIm1hdGNoIiwiZGVmYXVsdElnbm9yZSIsImF0dHJpYnV0ZSIsImF0dHJpYnV0ZU5hbWUiLCJpbmRleE9mIiwibm9kZSIsIm9wdGlvbnMiLCJyb290IiwiZG9jdW1lbnQiLCJza2lwIiwicHJpb3JpdHkiLCJpZ25vcmUiLCJwYXRoIiwiZWxlbWVudCIsImxlbmd0aCIsImlnbm9yZUNsYXNzIiwic2tpcENvbXBhcmUiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJlbnRyeSIsInNraXBDaGVja3MiLCJzb21lIiwiY29tcGFyZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwidHlwZSIsInByZWRpY2F0ZSIsInRvU3RyaW5nIiwiUmVnRXhwIiwicmVwbGFjZSIsIm5hbWUiLCJ2YWx1ZSIsInRlc3QiLCJpZ25vcmVBdHRyaWJ1dGUiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2xhc3MiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImNoZWNrQ2hpbGRzIiwicGFyZW50Tm9kZSIsInBhdHRlcm4iLCJmaW5kUGF0dGVybiIsInVuc2hpZnQiLCJqb2luIiwicGFyZW50IiwiZmluZEF0dHJpYnV0ZXNQYXR0ZXJuIiwibWF0Y2hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhdHRyaWJ1dGVzIiwic29ydGVkS2V5cyIsInNvcnQiLCJjdXJyIiwibmV4dCIsImN1cnJQb3MiLCJuZXh0UG9zIiwiaSIsImwiLCJrZXkiLCJhdHRyaWJ1dGVWYWx1ZSIsImN1cnJlbnRJZ25vcmUiLCJjdXJyZW50RGVmYXVsdElnbm9yZSIsImNoZWNrSWdub3JlIiwiY2xhc3NOYW1lIiwidHJpbSIsImZpbmRUYWdQYXR0ZXJuIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJ0YWciLCJjaGlsZHJlbiIsImNoaWxkVGFncyIsImNoaWxkIiwiY2hpbGRQYXR0ZXJuIiwiY29uc29sZSIsIndhcm4iLCJjaGVjayJdLCJt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S2dDLE9BQUwsQ0FBYUYsT0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTQyxXQUFULENBQXNCakMsUUFBdEIsRUFBZ0NHLE9BQWhDLEVBQXlDRixNQUF6QyxFQUFpRDtBQUMvQyxNQUFJK0IsVUFBVUssc0JBQXNCckMsUUFBdEIsRUFBZ0NHLE9BQWhDLEVBQXlDRixNQUF6QyxDQUFkO0FBQ0EsTUFBSSxDQUFDK0IsT0FBTCxFQUFjO0FBQ1pBLGNBQVV3QixlQUFlckQsT0FBZixFQUF3QkYsTUFBeEIsQ0FBVjtBQUNEO0FBQ0QsU0FBTytCLE9BQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU3FCLFdBQVQsQ0FBc0JuQyxTQUF0QixFQUFpQ0ksSUFBakMsRUFBdUNDLEtBQXZDLEVBQThDRyxnQkFBOUMsRUFBZ0U7QUFDOUQsTUFBSSxDQUFDSCxLQUFMLEVBQVk7QUFDVixXQUFPLElBQVA7QUFDRDtBQUNELE1BQU00QyxRQUFRakQsYUFBYVEsZ0JBQTNCO0FBQ0EsTUFBSSxDQUFDeUMsS0FBTCxFQUFZO0FBQ1YsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPQSxNQUFNN0MsSUFBTixFQUFZQyxLQUFaLEVBQW1CRyxnQkFBbkIsQ0FBUDtBQUNEIiwiZmlsZSI6Im1hdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIE1hdGNoXG4gKlxuICogUmV0cmlldmUgc2VsZWN0b3IgZm9yIGEgbm9kZS5cbiAqL1xuXG5pbXBvcnQgeyBlc2NhcGVWYWx1ZSB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG5jb25zdCBkZWZhdWx0SWdub3JlID0ge1xuICBhdHRyaWJ1dGUgKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3N0eWxlJyxcbiAgICAgICdkYXRhLXJlYWN0aWQnLFxuICAgICAgJ2RhdGEtcmVhY3QtY2hlY2tzdW0nXG4gICAgXS5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTFcbiAgfVxufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2ggKG5vZGUsIG9wdGlvbnMpIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50LFxuICAgIHNraXAgPSBudWxsLFxuICAgIHByaW9yaXR5ID0gWydpZCcsICdjbGFzcycsICdocmVmJywgJ3NyYyddLFxuICAgIGlnbm9yZSA9IHt9XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIHZhciBlbGVtZW50ID0gbm9kZVxuICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgdmFyIGlnbm9yZUNsYXNzID0gZmFsc2VcblxuICBjb25zdCBza2lwQ29tcGFyZSA9IHNraXAgJiYgKEFycmF5LmlzQXJyYXkoc2tpcCkgPyBza2lwIDogW3NraXBdKS5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBlbnRyeVxuICAgIH1cbiAgICByZXR1cm4gZW50cnlcbiAgfSlcblxuICBjb25zdCBza2lwQ2hlY2tzID0gKGVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gc2tpcCAmJiBza2lwQ29tcGFyZS5zb21lKChjb21wYXJlKSA9PiBjb21wYXJlKGVsZW1lbnQpKVxuICB9XG5cbiAgT2JqZWN0LmtleXMoaWdub3JlKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09ICdjbGFzcycpIHtcbiAgICAgIGlnbm9yZUNsYXNzID0gdHJ1ZVxuICAgIH1cbiAgICB2YXIgcHJlZGljYXRlID0gaWdub3JlW3R5cGVdXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdmdW5jdGlvbicpIHJldHVyblxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlLnRvU3RyaW5nKClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwcmVkaWNhdGUgPSBuZXcgUmVnRXhwKGVzY2FwZVZhbHVlKHByZWRpY2F0ZSkucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSlcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdib29sZWFuJykge1xuICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlID8gLyg/OikvIDogLy5eL1xuICAgIH1cbiAgICAvLyBjaGVjayBjbGFzcy0vYXR0cmlidXRlbmFtZSBmb3IgcmVnZXhcbiAgICBpZ25vcmVbdHlwZV0gPSAobmFtZSwgdmFsdWUpID0+IHByZWRpY2F0ZS50ZXN0KHZhbHVlKVxuICB9KVxuXG4gIGlmIChpZ25vcmVDbGFzcykge1xuICAgIGNvbnN0IGlnbm9yZUF0dHJpYnV0ZSA9IGlnbm9yZS5hdHRyaWJ1dGVcbiAgICBpZ25vcmUuYXR0cmlidXRlID0gKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSA9PiB7XG4gICAgICByZXR1cm4gaWdub3JlLmNsYXNzKHZhbHVlKSB8fCBpZ25vcmVBdHRyaWJ1dGUgJiYgaWdub3JlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxuICAgIH1cbiAgfVxuXG4gIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgaWYgKHNraXBDaGVja3MoZWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgIC8vIH4gZ2xvYmFsXG4gICAgICBpZiAoY2hlY2tBdHRyaWJ1dGVzKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHJvb3QpKSBicmVha1xuICAgICAgaWYgKGNoZWNrVGFnKGVsZW1lbnQsIGlnbm9yZSwgcGF0aCwgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBwYXRoKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgaWdub3JlLCBwYXRoKVxuICAgICAgfVxuXG4gICAgICAvLyBkZWZpbmUgb25seSBvbmUgcGFydCBlYWNoIGl0ZXJhdGlvblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tDaGlsZHMocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgcGF0aClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbGVtZW50ID09PSByb290KSB7XG4gICAgY29uc3QgcGF0dGVybiA9IGZpbmRQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUpXG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gIH1cblxuICByZXR1cm4gcGF0aC5qb2luKCcgJylcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0F0dHJpYnV0ZXMgKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUpXG4gIGlmIChwYXR0ZXJuKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBhdHRyaWJ1dGUgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZz99ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuIChwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKSB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgY29uc3Qgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLnNvcnQoKGN1cnIsIG5leHQpID0+IHtcbiAgICBjb25zdCBjdXJyUG9zID0gcHJpb3JpdHkuaW5kZXhPZihhdHRyaWJ1dGVzW2N1cnJdLm5hbWUpXG4gICAgY29uc3QgbmV4dFBvcyA9IHByaW9yaXR5LmluZGV4T2YoYXR0cmlidXRlc1tuZXh0XS5uYW1lKVxuICAgIGlmIChuZXh0UG9zID09PSAtMSkge1xuICAgICAgaWYgKGN1cnJQb3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJQb3MgLSBuZXh0UG9zXG4gIH0pXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzb3J0ZWRLZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHNvcnRlZEtleXNbaV1cbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2tleV1cbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSlcblxuICAgIGNvbnN0IGN1cnJlbnRJZ25vcmUgPSBpZ25vcmVbYXR0cmlidXRlTmFtZV0gfHwgaWdub3JlLmF0dHJpYnV0ZVxuICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0SWdub3JlID0gZGVmYXVsdElnbm9yZVthdHRyaWJ1dGVOYW1lXSB8fCBkZWZhdWx0SWdub3JlLmF0dHJpYnV0ZVxuICAgIGlmIChjaGVja0lnbm9yZShjdXJyZW50SWdub3JlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgY3VycmVudERlZmF1bHRJZ25vcmUpKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBwYXR0ZXJuID0gYFske2F0dHJpYnV0ZU5hbWV9PVwiJHthdHRyaWJ1dGVWYWx1ZX1cIl1gXG5cbiAgICBpZiAoKC9cXGJcXGQvKS50ZXN0KGF0dHJpYnV0ZVZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnaWQnKSB7XG4gICAgICAgIHBhdHRlcm4gPSBgIyR7YXR0cmlidXRlVmFsdWV9YFxuICAgICAgfVxuXG4gICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBhdHRyaWJ1dGVWYWx1ZS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLicpXG4gICAgICAgIHBhdHRlcm4gPSBgLiR7Y2xhc3NOYW1lfWBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0dGVyblxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrVGFnIChlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICBpZiAocGF0dGVybikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocGF0dGVybilcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogTG9va3VwIHRhZyBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaW5kVGFnUGF0dGVybiAoZWxlbWVudCwgaWdub3JlKSB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLnRhZywgbnVsbCwgdGFnTmFtZSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJldHVybiB0YWdOYW1lXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBzcGVjaWZpYyBjaGlsZCBpZGVudGlmaWVyXG4gKlxuICogTk9URTogJ2NoaWxkVGFncycgaXMgYSBjdXN0b20gcHJvcGVydHkgdG8gdXNlIGFzIGEgdmlldyBmaWx0ZXIgZm9yIHRhZ3MgdXNpbmcgJ2FkYXB0ZXIuanMnXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0NoaWxkcyAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgcGF0aCkge1xuICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRUYWdzIHx8IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBpZiAoY2hpbGQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkUGF0dGVybiA9IGZpbmRQYXR0ZXJuKHByaW9yaXR5LCBjaGlsZCwgaWdub3JlKVxuICAgICAgaWYgKCFjaGlsZFBhdHRlcm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICAgICAgRWxlbWVudCBjb3VsZG5cXCd0IGJlIG1hdGNoZWQgdGhyb3VnaCBzdHJpY3QgaWdub3JlIHBhdHRlcm4hXG4gICAgICAgIGAsIGNoaWxkLCBpZ25vcmUsIGNoaWxkUGF0dGVybilcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBgPiAke2NoaWxkUGF0dGVybn06bnRoLWNoaWxkKCR7aSsxfSlgXG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHByaW9yaXR5IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaW5kUGF0dGVybiAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSkge1xuICB2YXIgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKVxuICBpZiAoIXBhdHRlcm4pIHtcbiAgICBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICB9XG4gIHJldHVybiBwYXR0ZXJuXG59XG5cbi8qKlxuICogVmFsaWRhdGUgd2l0aCBjdXN0b20gYW5kIGRlZmF1bHQgZnVuY3Rpb25zXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IHByZWRpY2F0ZSAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmc/fSAgbmFtZSAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICB2YWx1ZSAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7RnVuY3Rpb259IGRlZmF1bHRQcmVkaWNhdGUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tJZ25vcmUgKHByZWRpY2F0ZSwgbmFtZSwgdmFsdWUsIGRlZmF1bHRQcmVkaWNhdGUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY29uc3QgY2hlY2sgPSBwcmVkaWNhdGUgfHwgZGVmYXVsdFByZWRpY2F0ZVxuICBpZiAoIWNoZWNrKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxufVxuIl19


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertNodeList = convertNodeList;
	exports.escapeValue = escapeValue;
	/**
	 * # Utilities
	 *
	 * Convenience helpers.
	 */

	/**
	 * Create an array with the DOM nodes of the list
	 *
	 * @param  {NodeList}             nodes - [description]
	 * @return {Array.<HTMLElement>}        - [description]
	 */
	function convertNodeList(nodes) {
	  var length = nodes.length;

	  var arr = new Array(length);
	  for (var i = 0; i < length; i++) {
	    arr[i] = nodes[i];
	  }
	  return arr;
	}

	/**
	 * Escape special characters and line breaks as a simplified version of 'CSS.escape()'
	 *
	 * Description of valid characters: https://mathiasbynens.be/notes/css-escapes
	 *
	 * @param  {String?} value - [description]
	 * @return {String}        - [description]
	 */
	function escapeValue(value) {
	  return value && value.replace(/['"`\\/:\?&!#$%^()[\]{|}*+;,.<=>@~]/g, '\\$&').replace(/\n/g, '\A');
	}
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdGllcy5qcyJdLCJuYW1lcyI6WyJjb252ZXJ0Tm9kZUxpc3QiLCJlc2NhcGVWYWx1ZSIsIm5vZGVzIiwibGVuZ3RoIiwiYXJyIiwiQXJyYXkiLCJpIiwidmFsdWUiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7OztRQVlnQkEsZSxHQUFBQSxlO1FBaUJBQyxXLEdBQUFBLFc7QUE3QmhCOzs7Ozs7QUFNQTs7Ozs7O0FBTU8sU0FBU0QsZUFBVCxDQUEwQkUsS0FBMUIsRUFBaUM7QUFBQSxNQUM5QkMsTUFEOEIsR0FDbkJELEtBRG1CLENBQzlCQyxNQUQ4Qjs7QUFFdEMsTUFBTUMsTUFBTSxJQUFJQyxLQUFKLENBQVVGLE1BQVYsQ0FBWjtBQUNBLE9BQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDL0JGLFFBQUlFLENBQUosSUFBU0osTUFBTUksQ0FBTixDQUFUO0FBQ0Q7QUFDRCxTQUFPRixHQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0gsV0FBVCxDQUFzQk0sS0FBdEIsRUFBNkI7QUFDbEMsU0FBT0EsU0FBU0EsTUFBTUMsT0FBTixDQUFjLHNDQUFkLEVBQXNELE1BQXRELEVBQ01BLE9BRE4sQ0FDYyxLQURkLEVBQ3FCLElBRHJCLENBQWhCO0FBRUQiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIFV0aWxpdGllc1xuICpcbiAqIENvbnZlbmllbmNlIGhlbHBlcnMuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgd2l0aCB0aGUgRE9NIG5vZGVzIG9mIHRoZSBsaXN0XG4gKlxuICogQHBhcmFtICB7Tm9kZUxpc3R9ICAgICAgICAgICAgIG5vZGVzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE5vZGVMaXN0IChub2Rlcykge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUucmVwbGFjZSgvWydcImBcXFxcLzpcXD8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxBJylcbn1cbiJdfQ==


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = optimize;

	var _adapt = __webpack_require__(5);

	var _adapt2 = _interopRequireDefault(_adapt);

	var _utilities = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Apply different optimization techniques
	 *
	 * @param  {string}                          selector - [description]
	 * @param  {HTMLElement|Array.<HTMLElement>} element  - [description]
	 * @param  {Object}                          options  - [description]
	 * @return {string}                                   - [description]
	 */
	/**
	 * # Optimize
	 *
	 * 1.) Improve efficiency through shorter selectors by removing redundancy
	 * 2.) Improve robustness through selector transformation
	 */

	function optimize(selector, elements) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	  // convert single entry and NodeList
	  if (!Array.isArray(elements)) {
	    elements = !elements.length ? [elements] : (0, _utilities.convertNodeList)(elements);
	  }

	  if (!elements.length || elements.some(function (element) {
	    return element.nodeType !== 1;
	  })) {
	    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');
	  }

	  var globalModified = (0, _adapt2.default)(elements[0], options);

	  // chunk parts outside of quotes (http://stackoverflow.com/a/25663729)
	  var path = selector.replace(/> /g, '>').split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);

	  if (path.length < 2) {
	    return optimizePart('', selector, '', elements);
	  }

	  var shortened = [path.pop()];
	  while (path.length > 1) {
	    var current = path.pop();
	    var prePart = path.join(' ');
	    var postPart = shortened.join(' ');

	    var pattern = prePart + ' ' + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length !== elements.length) {
	      shortened.unshift(optimizePart(prePart, current, postPart, elements));
	    }
	  }
	  shortened.unshift(path[0]);
	  path = shortened;

	  // optimize start + end
	  path[0] = optimizePart('', path[0], path.slice(1).join(' '), elements);
	  path[path.length - 1] = optimizePart(path.slice(0, -1).join(' '), path[path.length - 1], '', elements);

	  if (globalModified) {
	    delete global.document;
	  }

	  return path.join(' ').replace(/>/g, '> ').trim();
	}

	/**
	 * Improve a chunk of the selector
	 *
	 * @param  {string}              prePart  - [description]
	 * @param  {string}              current  - [description]
	 * @param  {string}              postPart - [description]
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {string}                       - [description]
	 */
	function optimizePart(prePart, current, postPart, elements) {
	  if (prePart.length) prePart = prePart + ' ';
	  if (postPart.length) postPart = ' ' + postPart;

	  // robustness: attribute without value (generalization)
	  if (/\[*\]/.test(current)) {
	    var key = current.replace(/=.*$/, ']');
	    var pattern = '' + prePart + key + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = key;
	    } else {
	      // robustness: replace specific key-value with base tag (heuristic)
	      var references = document.querySelectorAll('' + prePart + key);

	      var _loop = function _loop() {
	        var reference = references[i];
	        if (elements.some(function (element) {
	          return reference.contains(element);
	        })) {
	          var description = reference.tagName.toLowerCase();
	          pattern = '' + prePart + description + postPart;
	          matches = document.querySelectorAll(pattern);

	          if (compareResults(matches, elements)) {
	            current = description;
	          }
	          return 'break';
	        }
	      };

	      for (var i = 0, l = references.length; i < l; i++) {
	        var pattern;
	        var matches;

	        var _ret = _loop();

	        if (_ret === 'break') break;
	      }
	    }
	  }

	  // robustness: descendant instead child (heuristic)
	  if (/>/.test(current)) {
	    var descendant = current.replace(/>/, '');
	    var pattern = '' + prePart + descendant + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = descendant;
	    }
	  }

	  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)
	  if (/:nth-child/.test(current)) {
	    // TODO: consider complete coverage of 'nth-of-type' replacement
	    var type = current.replace(/nth-child/g, 'nth-of-type');
	    var pattern = '' + prePart + type + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = type;
	    }
	  }

	  // efficiency: combinations of classname (partial permutations)
	  if (/\.\S+\.\S+/.test(current)) {
	    var names = current.trim().split('.').slice(1).map(function (name) {
	      return '.' + name;
	    }).sort(function (curr, next) {
	      return curr.length - next.length;
	    });
	    while (names.length) {
	      var partial = current.replace(names.shift(), '').trim();
	      var pattern = ('' + prePart + partial + postPart).trim();
	      if (!pattern.length || pattern.charAt(0) === '>' || pattern.charAt(pattern.length - 1) === '>') {
	        break;
	      }
	      var matches = document.querySelectorAll(pattern);
	      if (compareResults(matches, elements)) {
	        current = partial;
	      }
	    }

	    // robustness: degrade complex classname (heuristic)
	    names = current && current.match(/\./g);
	    if (names && names.length > 2) {
	      var _references = document.querySelectorAll('' + prePart + current);

	      var _loop2 = function _loop2() {
	        var reference = _references[i];
	        if (elements.some(function (element) {
	          return reference.contains(element);
	        })) {
	          // TODO:
	          // - check using attributes + regard excludes
	          var description = reference.tagName.toLowerCase();
	          pattern = '' + prePart + description + postPart;
	          matches = document.querySelectorAll(pattern);

	          if (compareResults(matches, elements)) {
	            current = description;
	          }
	          return 'break';
	        }
	      };

	      for (var i = 0, l = _references.length; i < l; i++) {
	        var pattern;
	        var matches;

	        var _ret2 = _loop2();

	        if (_ret2 === 'break') break;
	      }
	    }
	  }

	  return current;
	}

	/**
	 * Evaluate matches with expected elements
	 *
	 * @param  {Array.<HTMLElement>} matches  - [description]
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {Boolean}                      - [description]
	 */
	function compareResults(matches, elements) {
	  var length = matches.length;

	  return length === elements.length && elements.every(function (element) {
	    for (var i = 0; i < length; i++) {
	      if (matches[i] === element) {
	        return true;
	      }
	    }
	    return false;
	  });
	}
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGltaXplLmpzIl0sIm5hbWVzIjpbIm9wdGltaXplIiwic2VsZWN0b3IiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzb21lIiwiZWxlbWVudCIsIm5vZGVUeXBlIiwiRXJyb3IiLCJnbG9iYWxNb2RpZmllZCIsInBhdGgiLCJyZXBsYWNlIiwic3BsaXQiLCJvcHRpbWl6ZVBhcnQiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwicHJlUGFydCIsImpvaW4iLCJwb3N0UGFydCIsInBhdHRlcm4iLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidW5zaGlmdCIsInNsaWNlIiwiZ2xvYmFsIiwidHJpbSIsInRlc3QiLCJrZXkiLCJjb21wYXJlUmVzdWx0cyIsInJlZmVyZW5jZXMiLCJyZWZlcmVuY2UiLCJpIiwiY29udGFpbnMiLCJkZXNjcmlwdGlvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImwiLCJkZXNjZW5kYW50IiwidHlwZSIsIm5hbWVzIiwibWFwIiwibmFtZSIsInNvcnQiLCJjdXJyIiwibmV4dCIsInBhcnRpYWwiLCJzaGlmdCIsImNoYXJBdCIsIm1hdGNoIiwiZXZlcnkiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWtCd0JBLFE7O0FBWHhCOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7QUFWQTs7Ozs7OztBQWtCZSxTQUFTQSxRQUFULENBQW1CQyxRQUFuQixFQUE2QkMsUUFBN0IsRUFBcUQ7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLEVBQUk7OztBQUVsRTtBQUNBLE1BQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjSCxRQUFkLENBQUwsRUFBOEI7QUFDNUJBLGVBQVcsQ0FBQ0EsU0FBU0ksTUFBVixHQUFtQixDQUFDSixRQUFELENBQW5CLEdBQWdDLGdDQUFnQkEsUUFBaEIsQ0FBM0M7QUFDRDs7QUFFRCxNQUFJLENBQUNBLFNBQVNJLE1BQVYsSUFBb0JKLFNBQVNLLElBQVQs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NEM7QUFBQSxNQUNsQ0ksTUFEa0MsR0FDdkJpQixPQUR1QixDQUNsQ2pCLE1BRGtDOztBQUUxQyxTQUFPQSxXQUFXSixTQUFTSSxNQUFwQixJQUE4QkosU0FBU21ELEtBQVQsQ0FBZSxVQUFDN0MsT0FBRCxFQUFhO0FBQy9ELFNBQUssSUFBSTJCLElBQUksQ0FBYixFQUFnQkEsSUFBSTdCLE1BQXBCLEVBQTRCNkIsR0FBNUIsRUFBaUM7QUFDL0IsVUFBSVosUUFBUVksQ0FBUixNQUFlM0IsT0FBbkIsRUFBNEI7QUFDMUIsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sS0FBUDtBQUNELEdBUG9DLENBQXJDO0FBUUQiLCJmaWxlIjoib3B0aW1pemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMgT3B0aW1pemVcbiAqXG4gKiAxLikgSW1wcm92ZSBlZmZpY2llbmN5IHRocm91Z2ggc2hvcnRlciBzZWxlY3RvcnMgYnkgcmVtb3ZpbmcgcmVkdW5kYW5jeVxuICogMi4pIEltcHJvdmUgcm9idXN0bmVzcyB0aHJvdWdoIHNlbGVjdG9yIHRyYW5zZm9ybWF0aW9uXG4gKi9cblxuaW1wb3J0IGFkYXB0IGZyb20gJy4vYWRhcHQnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcblxuLyoqXG4gKiBBcHBseSBkaWZmZXJlbnQgb3B0aW1pemF0aW9uIHRlY2huaXF1ZXNcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHNlbGVjdG9yLCBlbGVtZW50cywgb3B0aW9ucyA9IHt9KSB7XG5cbiAgLy8gY29udmVydCBzaW5nbGUgZW50cnkgYW5kIE5vZGVMaXN0XG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9ICFlbGVtZW50cy5sZW5ndGggPyBbZWxlbWVudHNdIDogY29udmVydE5vZGVMaXN0KGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKCFlbGVtZW50cy5sZW5ndGggfHwgZWxlbWVudHMuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSB0byBjb21wYXJlIEhUTUxFbGVtZW50cyBpdHMgbmVjZXNzYXJ5IHRvIHByb3ZpZGUgYSByZWZlcmVuY2Ugb2YgdGhlIHNlbGVjdGVkIG5vZGUocykhIChtaXNzaW5nIFwiZWxlbWVudHNcIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICAvLyBjaHVuayBwYXJ0cyBvdXRzaWRlIG9mIHF1b3RlcyAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjU2NjM3MjkpXG4gIHZhciBwYXRoID0gc2VsZWN0b3IucmVwbGFjZSgvPiAvZywgJz4nKS5zcGxpdCgvXFxzKyg/PSg/Oig/OlteXCJdKlwiKXsyfSkqW15cIl0qJCkvKVxuXG4gIGlmIChwYXRoLmxlbmd0aCA8IDIpIHtcbiAgICByZXR1cm4gb3B0aW1pemVQYXJ0KCcnLCBzZWxlY3RvciwgJycsIGVsZW1lbnRzKVxuICB9XG5cbiAgY29uc3Qgc2hvcnRlbmVkID0gW3BhdGgucG9wKCldXG4gIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpICB7XG4gICAgY29uc3QgY3VycmVudCA9IHBhdGgucG9wKClcbiAgICBjb25zdCBwcmVQYXJ0ID0gcGF0aC5qb2luKCcgJylcbiAgICBjb25zdCBwb3N0UGFydCA9IHNob3J0ZW5lZC5qb2luKCcgJylcblxuICAgIGNvbnN0IHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSAke3Bvc3RQYXJ0fWBcbiAgICBjb25zdCBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICBzaG9ydGVuZWQudW5zaGlmdChvcHRpbWl6ZVBhcnQocHJlUGFydCwgY3VycmVudCwgcG9zdFBhcnQsIGVsZW1lbnRzKSlcbiAgICB9XG4gIH1cbiAgc2hvcnRlbmVkLnVuc2hpZnQocGF0aFswXSlcbiAgcGF0aCA9IHNob3J0ZW5lZFxuXG4gIC8vIG9wdGltaXplIHN0YXJ0ICsgZW5kXG4gIHBhdGhbMF0gPSBvcHRpbWl6ZVBhcnQoJycsIHBhdGhbMF0sIHBhdGguc2xpY2UoMSkuam9pbignICcpLCBlbGVtZW50cylcbiAgcGF0aFtwYXRoLmxlbmd0aC0xXSA9IG9wdGltaXplUGFydChwYXRoLnNsaWNlKDAsIC0xKS5qb2luKCcgJyksIHBhdGhbcGF0aC5sZW5ndGgtMV0sICcnLCBlbGVtZW50cylcblxuICBpZiAoZ2xvYmFsTW9kaWZpZWQpIHtcbiAgICBkZWxldGUgZ2xvYmFsLmRvY3VtZW50XG4gIH1cblxuICByZXR1cm4gcGF0aC5qb2luKCcgJykucmVwbGFjZSgvPi9nLCAnPiAnKS50cmltKClcbn1cblxuLyoqXG4gKiBJbXByb3ZlIGEgY2h1bmsgb2YgdGhlIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgcHJlUGFydCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgIHBvc3RQYXJ0IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gb3B0aW1pemVQYXJ0IChwcmVQYXJ0LCBjdXJyZW50LCBwb3N0UGFydCwgZWxlbWVudHMpIHtcbiAgaWYgKHByZVBhcnQubGVuZ3RoKSBwcmVQYXJ0ID0gYCR7cHJlUGFydH0gYFxuICBpZiAocG9zdFBhcnQubGVuZ3RoKSBwb3N0UGFydCA9IGAgJHtwb3N0UGFydH1gXG5cbiAgLy8gcm9idXN0bmVzczogYXR0cmlidXRlIHdpdGhvdXQgdmFsdWUgKGdlbmVyYWxpemF0aW9uKVxuICBpZiAoL1xcWypcXF0vLnRlc3QoY3VycmVudCkpIHtcbiAgICBjb25zdCBrZXkgPSBjdXJyZW50LnJlcGxhY2UoLz0uKiQvLCAnXScpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7a2V5fSR7cG9zdFBhcnR9YFxuICAgIHZhciBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIGN1cnJlbnQgPSBrZXlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcm9idXN0bmVzczogcmVwbGFjZSBzcGVjaWZpYyBrZXktdmFsdWUgd2l0aCBiYXNlIHRhZyAoaGV1cmlzdGljKVxuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCR7cHJlUGFydH0ke2tleX1gKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWZlcmVuY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkpKSB7XG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSByZWZlcmVuY2UudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY3JpcHRpb259JHtwb3N0UGFydH1gXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyByb2J1c3RuZXNzOiBkZXNjZW5kYW50IGluc3RlYWQgY2hpbGQgKGhldXJpc3RpYylcbiAgaWYgKC8+Ly50ZXN0KGN1cnJlbnQpKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudCA9IGN1cnJlbnQucmVwbGFjZSgvPi8sICcnKVxuICAgIHZhciBwYXR0ZXJuID0gYCR7cHJlUGFydH0ke2Rlc2NlbmRhbnR9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IGRlc2NlbmRhbnRcbiAgICB9XG4gIH1cblxuICAvLyByb2J1c3RuZXNzOiAnbnRoLW9mLXR5cGUnIGluc3RlYWQgJ250aC1jaGlsZCcgKGhldXJpc3RpYylcbiAgaWYgKC86bnRoLWNoaWxkLy50ZXN0KGN1cnJlbnQpKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgY29tcGxldGUgY292ZXJhZ2Ugb2YgJ250aC1vZi10eXBlJyByZXBsYWNlbWVudFxuICAgIGNvbnN0IHR5cGUgPSBjdXJyZW50LnJlcGxhY2UoL250aC1jaGlsZC9nLCAnbnRoLW9mLXR5cGUnKVxuICAgIHZhciBwYXR0ZXJuID0gYCR7cHJlUGFydH0ke3R5cGV9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IHR5cGVcbiAgICB9XG4gIH1cblxuICAvLyBlZmZpY2llbmN5OiBjb21iaW5hdGlvbnMgb2YgY2xhc3NuYW1lIChwYXJ0aWFsIHBlcm11dGF0aW9ucylcbiAgaWYgKC9cXC5cXFMrXFwuXFxTKy8udGVzdChjdXJyZW50KSkge1xuICAgIHZhciBuYW1lcyA9IGN1cnJlbnQudHJpbSgpLnNwbGl0KCcuJykuc2xpY2UoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgobmFtZSkgPT4gYC4ke25hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG4gICAgd2hpbGUgKG5hbWVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgcGFydGlhbCA9IGN1cnJlbnQucmVwbGFjZShuYW1lcy5zaGlmdCgpLCAnJykudHJpbSgpXG4gICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtwYXJ0aWFsfSR7cG9zdFBhcnR9YC50cmltKClcbiAgICAgIGlmICghcGF0dGVybi5sZW5ndGggfHwgcGF0dGVybi5jaGFyQXQoMCkgPT09ICc+JyB8fCBwYXR0ZXJuLmNoYXJBdChwYXR0ZXJuLmxlbmd0aC0xKSA9PT0gJz4nKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgICAgY3VycmVudCA9IHBhcnRpYWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByb2J1c3RuZXNzOiBkZWdyYWRlIGNvbXBsZXggY2xhc3NuYW1lIChoZXVyaXN0aWMpXG4gICAgbmFtZXMgPSBjdXJyZW50ICYmIGN1cnJlbnQubWF0Y2goL1xcLi9nKVxuICAgIGlmIChuYW1lcyAmJiBuYW1lcy5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtwcmVQYXJ0fSR7Y3VycmVudH1gKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWZlcmVuY2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkgKSkge1xuICAgICAgICAgIC8vIFRPRE86XG4gICAgICAgICAgLy8gLSBjaGVjayB1c2luZyBhdHRyaWJ1dGVzICsgcmVnYXJkIGV4Y2x1ZGVzXG4gICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSByZWZlcmVuY2UudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY3JpcHRpb259JHtwb3N0UGFydH1gXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIEV2YWx1YXRlIG1hdGNoZXMgd2l0aCBleHBlY3RlZCBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IG1hdGNoZXMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVJlc3VsdHMgKG1hdGNoZXMsIGVsZW1lbnRzKSB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBtYXRjaGVzXG4gIHJldHVybiBsZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4ge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtYXRjaGVzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuIl19

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCommonAncestor = getCommonAncestor;
	exports.getCommonProperties = getCommonProperties;
	/**
	 * # Common
	 *
	 * Process collections for similarities.
	 */

	/**
	 * Find the last common ancestor of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {HTMLElement}                   - [description]
	 */
	function getCommonAncestor(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var _options$root = options.root,
	      root = _options$root === undefined ? document : _options$root;


	  var ancestors = [];

	  elements.forEach(function (element, index) {
	    var parents = [];
	    while (element !== root) {
	      element = element.parentNode;
	      parents.unshift(element);
	    }
	    ancestors[index] = parents;
	  });

	  ancestors.sort(function (curr, next) {
	    return curr.length - next.length;
	  });

	  var shallowAncestor = ancestors.shift();

	  var ancestor = null;

	  var _loop = function _loop() {
	    var parent = shallowAncestor[i];
	    var missing = ancestors.some(function (otherParents) {
	      return !otherParents.some(function (otherParent) {
	        return otherParent === parent;
	      });
	    });

	    if (missing) {
	      // TODO: find similar sub-parents, not the top root, e.g. sharing a class selector
	      return 'break';
	    }

	    ancestor = parent;
	  };

	  for (var i = 0, l = shallowAncestor.length; i < l; i++) {
	    var _ret = _loop();

	    if (_ret === 'break') break;
	  }

	  return ancestor;
	}

	/**
	 * Get a set of common properties of elements
	 *
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {Object}                       - [description]
	 */
	function getCommonProperties(elements) {

	  var commonProperties = {
	    classes: [],
	    attributes: {},
	    tag: null
	  };

	  elements.forEach(function (element) {
	    var commonClasses = commonProperties.classes,
	        commonAttributes = commonProperties.attributes,
	        commonTag = commonProperties.tag;

	    // ~ classes

	    if (commonClasses !== undefined) {
	      var classes = element.getAttribute('class');
	      if (classes) {
	        classes = classes.trim().split(' ');
	        if (!commonClasses.length) {
	          commonProperties.classes = classes;
	        } else {
	          commonClasses = commonClasses.filter(function (entry) {
	            return classes.some(function (name) {
	              return name === entry;
	            });
	          });
	          if (commonClasses.length) {
	            commonProperties.classes = commonClasses;
	          } else {
	            delete commonProperties.classes;
	          }
	        }
	      } else {
	        // TODO: restructure removal as 2x set / 2x delete, instead of modify always replacing with new collection
	        delete commonProperties.classes;
	      }
	    }

	    // ~ attributes
	    if (commonAttributes !== undefined) {
	      (function () {
	        var elementAttributes = element.attributes;
	        var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
	          var attribute = elementAttributes[key];
	          var attributeName = attribute.name;
	          // NOTE: workaround detection for non-standard phantomjs NamedNodeMap behaviour
	          // (issue: https://github.com/ariya/phantomjs/issues/14634)
	          if (attribute && attributeName !== 'class') {
	            attributes[attributeName] = attribute.value;
	          }
	          return attributes;
	        }, {});

	        var attributesNames = Object.keys(attributes);
	        var commonAttributesNames = Object.keys(commonAttributes);

	        if (attributesNames.length) {
	          if (!commonAttributesNames.length) {
	            commonProperties.attributes = attributes;
	          } else {
	            commonAttributes = commonAttributesNames.reduce(function (nextCommonAttributes, name) {
	              var value = commonAttributes[name];
	              if (value === attributes[name]) {
	                nextCommonAttributes[name] = value;
	              }
	              return nextCommonAttributes;
	            }, {});
	            if (Object.keys(commonAttributes).length) {
	              commonProperties.attributes = commonAttributes;
	            } else {
	              delete commonProperties.attributes;
	            }
	          }
	        } else {
	          delete commonProperties.attributes;
	        }
	      })();
	    }

	    // ~ tag
	    if (commonTag !== undefined) {
	      var tag = element.tagName.toLowerCase();
	      if (!commonTag) {
	        commonProperties.tag = tag;
	      } else if (tag !== commonTag) {
	        delete commonProperties.tag;
	      }
	    }
	  });

	  return commonProperties;
	}
	//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJnZXRDb21tb25BbmNlc3RvciIsImdldENvbW1vblByb3BlcnRpZXMiLCJlbGVtZW50cyIsIm9wdGlvbnMiLCJyb290IiwiZG9jdW1lbnQiLCJhbmNlc3RvcnMiLCJmb3JFYWNoIiwiZWxlbWVudCIsImluZGV4IiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0IiwibGVuZ3RoIiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsInBhcmVudCIsImkiLCJtaXNzaW5nIiwic29tZSIsIm90aGVyUGFyZW50cyIsIm90aGVyUGFyZW50IiwibCIsImNvbW1vblByb3BlcnRpZXMiLCJjbGFzc2VzIiwiYXR0cmlidXRlcyIsInRhZyIsImNvbW1vbkNsYXNzZXMiLCJjb21tb25BdHRyaWJ1dGVzIiwiY29tbW9uVGFnIiwidW5kZWZpbmVkIiwiZ2V0QXR0cmlidXRlIiwidHJpbSIsInNwbGl0IiwiZmlsdGVyIiwiZW50cnkiLCJuYW1lIiwiZWxlbWVudEF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwia2V5IiwiYXR0cmlidXRlIiwiYXR0cmlidXRlTmFtZSIsInZhbHVlIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWdCQSxpQixHQUFBQSxpQjtRQThDQUMsbUIsR0FBQUEsbUI7QUExRGhCOzs7Ozs7QUFNQTs7Ozs7O0FBTU8sU0FBU0QsaUJBQVQsQ0FBNEJFLFFBQTVCLEVBQW9EO0FBQUEsTUFBZEMsT0FBYyx1RUFBSixFQUFJO0FBQUEsc0JBSXJEQSxPQUpxRCxDQUd2REMsSUFIdUQ7QUFBQSxNQUd2REEsSUFIdUQsaUNBR2hEQyxRQUhnRDs7O0FBTXpELE1BQU1DLFlBQVksRUFBbEI7O0FBRUFKLFdBQVNLLE9BQVQsQ0FBaUIsVUFBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQW9CO0FBQ25DLFFBQU1DLFVBQVUsRUFBaEI7QUFDQSxXQUFPRixZQUFZSixJQUFuQixFQUF5QjtBQUN2QkksZ0JBQVVBLFFBQVFHLFVBQWxCO0FBQ0FELGNBQVFFLE9BQVIsQ0FBZ0JKLE9BQWhCO0FBQ0Q7QUFDREYsY0FBVUcsS0FBVixJQUFtQkMsT0FBbkI7QUFDRCxHQVBEOztBQVNBSixZQUFVTyxJQUFWLENBQWUsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQO0FBQUEsV0FBZ0JELEtBQUtFLE1BQUwsR0FBY0QsS0FBS0MsTUFBbkM7QUFBQSxHQUFmOztBQUVBLE1BQU1DLGtCQUFrQlgsVUFBVVksS0FBVixFQUF4Qjs7QUFFQSxNQUFJQyxXQUFXLElBQWY7O0FBckJ5RDtBQXdCdkQsUUFBTUMsU0FBU0gsZ0JBQWdCSSxDQUFoQixDQUFmO0FBQ0EsUUFBTUMsVUFBVWhCLFVBQVVpQixJQUFWLENBQWUsVUFBQ0MsWUFBRCxFQUFrQjtBQUMvQyxhQUFPLENBQUNBLGFBQWFELElBQWIsQ0FBa0IsVUFBQ0UsV0FBRDtBQUFBLGVBQWlCQSxnQkFBZ0JMLE1BQWpDO0FBQUEsT0FBbEIsQ0FBUjtBQUNELEtBRmUsQ0FBaEI7O0FBSUEsUUFBSUUsT0FBSixFQUFhO0FBQ1g7QUFDQTtBQUNEOztBQUVESCxlQUFXQyxNQUFYO0FBbEN1RDs7QUF1QnpELE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdLLElBQUlULGdCQUFnQkQsTUFBcEMsRUFBNENLLElBQUlLLENBQWhELEVBQW1ETCxHQUFuRCxFQUF3RDtBQUFBOztBQUFBLDBCQVFwRDtBQUlIOztBQUVELFNBQU9GLFFBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTU8sU0FBU2xCLG1CQUFULENBQThCQyxRQUE5QixFQUF3Qzs7QUFFN0MsTUFBTXlCLG1CQUFtQjtBQUN2QkMsYUFBUyxFQURjO0FBRXZCQyxnQkFBWSxFQUZXO0FBR3ZCQyxTQUFLO0FBSGtCLEdBQXpCOztBQU1BNUIsV0FBU0ssT0FBVCxDQUFpQixVQUFDQyxPQUFELEVBQWE7QUFBQSxRQUdqQnVCLGFBSGlCLEdBTXhCSixnQkFOd0IsQ0FHMUJDLE9BSDBCO0FBQUEsUUFJZEksZ0JBSmMsR0FNeEJMLGdCQU53QixDQUkxQkUsVUFKMEI7QUFBQSxRQUtyQkksU0FMcUIsR0FNeEJOLGdCQU53QixDQUsxQkcsR0FMMEI7O0FBUTVCOztBQUNBLFFBQUlDLGtCQUFrQkcsU0FBdEIsRUFBaUM7QUFDL0IsVUFBSU4sVUFBVXBCLFFBQVEyQixZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFJUCxPQUFKLEVBQWE7QUFDWEEsa0JBQVVBLFFBQVFRLElBQVIsR0FBZUMsS0FBZixDQUFxQixHQUFyQixDQUFWO0FBQ0EsWUFBSSxDQUFDTixjQUFjZixNQUFuQixFQUEyQjtBQUN6QlcsMkJBQWlCQyxPQUFqQixHQUEyQkEsT0FBM0I7QUFDRCxTQUZELE1BRU87QUFDTEcsMEJBQWdCQSxjQUFjTyxNQUFkLENBQXFCLFVBQUNDLEtBQUQ7QUFBQSxtQkFBV1gsUUFBUUwsSUFBUixDQUFhLFVBQUNpQixJQUFEO0FBQUEscUJBQVVBLFNBQVNELEtBQW5CO0FBQUEsYUFBYixDQUFYO0FBQUEsV0FBckIsQ0FBaEI7QUFDQSxjQUFJUixjQUFjZixNQUFsQixFQUEwQjtBQUN4QlcsNkJBQWlCQyxPQUFqQixHQUEyQkcsYUFBM0I7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT0osaUJBQWlCQyxPQUF4QjtBQUNEO0FBQ0Y7QUFDRixPQVpELE1BWU87QUFDTDtBQUNBLGVBQU9ELGlCQUFpQkMsT0FBeEI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsUUFBSUkscUJBQXFCRSxTQUF6QixFQUFvQztBQUFBO0FBQ2xDLFlBQU1PLG9CQUFvQmpDLFFBQVFxQixVQUFsQztBQUNBLFlBQU1BLGFBQWFhLE9BQU9DLElBQVAsQ0FBWUYsaUJBQVosRUFBK0JHLE1BQS9CLENBQXNDLFVBQUNmLFVBQUQsRUFBYWdCLEdBQWIsRUFBcUI7QUFDNUUsY0FBTUMsWUFBWUwsa0JBQWtCSSxHQUFsQixDQUFsQjtBQUNBLGNBQU1FLGdCQUFnQkQsVUFBVU4sSUFBaEM7QUFDQTtBQUNBO0FBQ0EsY0FBSU0sYUFBYUMsa0JBQWtCLE9BQW5DLEVBQTRDO0FBQzFDbEIsdUJBQVdrQixhQUFYLElBQTRCRCxVQUFVRSxLQUF0QztBQUNEO0FBQ0QsaUJBQU9uQixVQUFQO0FBQ0QsU0FUa0IsRUFTaEIsRUFUZ0IsQ0FBbkI7O0FBV0EsWUFBTW9CLGtCQUFrQlAsT0FBT0MsSUFBUCxDQUFZZCxVQUFaLENBQXhCO0FBQ0EsWUFBTXFCLHdCQUF3QlIsT0FBT0MsSUFBUCxDQUFZWCxnQkFBWixDQUE5Qjs7QUFFQSxZQUFJaUIsZ0JBQWdCakMsTUFBcEIsRUFBNEI7QUFDMUIsY0FBSSxDQUFDa0Msc0JBQXNCbEMsTUFBM0IsRUFBbUM7QUFDakNXLDZCQUFpQkUsVUFBakIsR0FBOEJBLFVBQTlCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xHLCtCQUFtQmtCLHNCQUFzQk4sTUFBdEIsQ0FBNkIsVUFBQ08sb0JBQUQsRUFBdUJYLElBQXZCLEVBQWdDO0FBQzlFLGtCQUFNUSxRQUFRaEIsaUJBQWlCUSxJQUFqQixDQUFkO0FBQ0Esa0JBQUlRLFVBQVVuQixXQUFXVyxJQUFYLENBQWQsRUFBZ0M7QUFDOUJXLHFDQUFxQlgsSUFBckIsSUFBNkJRLEtBQTdCO0FBQ0Q7QUFDRCxxQkFBT0csb0JBQVA7QUFDRCxhQU5rQixFQU1oQixFQU5nQixDQUFuQjtBQU9BLGdCQUFJVCxPQUFPQyxJQUFQLENBQVlYLGdCQUFaLEVBQThCaEIsTUFBbEMsRUFBMEM7QUFDeENXLCtCQUFpQkUsVUFBakIsR0FBOEJHLGdCQUE5QjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPTCxpQkFBaUJFLFVBQXhCO0FBQ0Q7QUFDRjtBQUNGLFNBakJELE1BaUJPO0FBQ0wsaUJBQU9GLGlCQUFpQkUsVUFBeEI7QUFDRDtBQW5DaUM7QUFvQ25DOztBQUVEO0FBQ0EsUUFBSUksY0FBY0MsU0FBbEIsRUFBNkI7QUFDM0IsVUFBTUosTUFBTXRCLFFBQVE0QyxPQUFSLENBQWdCQyxXQUFoQixFQUFaO0FBQ0EsVUFBSSxDQUFDcEIsU0FBTCxFQUFnQjtBQUNkTix5QkFBaUJHLEdBQWpCLEdBQXVCQSxHQUF2QjtBQUNELE9BRkQsTUFFTyxJQUFJQSxRQUFRRyxTQUFaLEVBQXVCO0FBQzVCLGVBQU9OLGlCQUFpQkcsR0FBeEI7QUFDRDtBQUNGO0FBQ0YsR0E3RUQ7O0FBK0VBLFNBQU9ILGdCQUFQO0FBQ0QiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbW1vblxuICpcbiAqIFByb2Nlc3MgY29sbGVjdGlvbnMgZm9yIHNpbWlsYXJpdGllcy5cbiAqL1xuXG4vKipcbiAqIEZpbmQgdGhlIGxhc3QgY29tbW9uIGFuY2VzdG9yIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50cz59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uQW5jZXN0b3IgKGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uUHJvcGVydGllcyAoZWxlbWVudHMpIHtcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJylcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogcmVzdHJ1Y3R1cmUgcmVtb3ZhbCBhcyAyeCBzZXQgLyAyeCBkZWxldGUsIGluc3RlYWQgb2YgbW9kaWZ5IGFsd2F5cyByZXBsYWNpbmcgd2l0aCBuZXcgY29sbGVjdGlvblxuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiBhdHRyaWJ1dGVzXG4gICAgaWYgKGNvbW1vbkF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZWxlbWVudEF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbGVtZW50QXR0cmlidXRlcykucmVkdWNlKChhdHRyaWJ1dGVzLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudEF0dHJpYnV0ZXNba2V5XVxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICAgICAgLy8gTk9URTogd29ya2Fyb3VuZCBkZXRlY3Rpb24gZm9yIG5vbi1zdGFuZGFyZCBwaGFudG9tanMgTmFtZWROb2RlTWFwIGJlaGF2aW91clxuICAgICAgICAvLyAoaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzE0NjM0KVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cbiJdfQ==


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _domElements = __webpack_require__(2);

	var _domElements2 = _interopRequireDefault(_domElements);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var handleScroll = {

	    scrolldata: [],
	    isScrolling: false,
	    isActiveOnPage: true,
	    isIdleOnPageBeyondThreshold: false,
	    ALLOWED_IDLE_TIME: 1000,
	    MIN_SCROLL_TIME_DIFF: 1000,
	    visibilityChangeEventName: undefined,
	    hiddenPropName: undefined,
	    checkstateTimeoutInMS: 250,
	    idleTimeoutThresholdInMS: 30 * 60 * 1000,

	    init: function init() {

	        handleScroll.lastrecordpos = null;
	        handleScroll.lastrecordtime = 0;
	        handleScroll.idleAt = {};
	        handleScroll.idleSince = 0;
	        handleScroll.currentIdleTime = 0;
	        handleScroll.initCheckForVisibility();
	        handleScroll.initTrack();
	    },
	    initData: function initData() {
	        handleScroll.scrolldata = [];
	    },
	    initTrack: function initTrack() {

	        handleScroll.track_pos = {};
	        handleScroll.track_start_time = 0;
	        handleScroll.track_end_time = 0;
	    },
	    getScrollPosition: function getScrollPosition(e) {
	        var evt = e || window;
	        return {
	            top: evt.pageYOffset,
	            left: evt.pageXOffset,
	            height: evt.innerHeight,
	            width: evt.innerWidth
	        };
	    },
	    onScroll: function onScroll(evt) {

	        handleScroll.isScrolling = true;
	        window.setInterval(function (e) {
	            handleScroll.isScrolling = false;
	        }, 100);
	    },
	    isPosMatch: function isPosMatch(pos1, pos2) {

	        if (pos1 == null || pos2 == null) {
	            return !1;
	        }

	        if (pos1.top == pos2.top && pos1.height == pos2.height) {
	            return !0;
	        }
	        return !1;
	    },
	    isScrollCriteriaSatisfied: function isScrollCriteriaSatisfied(currPos) {
	        var currtime = +new Date();
	        var height = currPos.height;

	        if (handleScroll.isIdleOnPageBeyondThreshold) {

	            if (handleScroll.track_start_time && handleScroll.track_end_time && handleScroll.track_pos) {

	                var timespent = handleScroll.track_end_time - handleScroll.track_start_time - handleScroll.idleTimeoutThresholdInMS;
	                handleScroll.pushToScrollData(handleScroll.track_pos, timespent);
	                handleScroll.initTrack();
	            }
	            return !1;
	        }

	        if (handleScroll.isPosMatch(currPos, handleScroll.idleAt) && !handleScroll.track_start_time && handleScroll.isActiveOnPage) {

	            if (!ZAB.zab.exists(handleScroll.lastrecordpos) || Math.abs(currPos.top - handleScroll.lastrecordpos.top) >= height / 2 && currtime - handleScroll.lastrecordtime >= handleScroll.MIN_SCROLL_TIME_DIFF || currtime - handleScroll.idleSince >= handleScroll.ALLOWED_IDLE_TIME) {

	                handleScroll.track_start_time = new Date();
	                handleScroll.track_pos = currPos;
	                return !1;
	            }
	        } else if (!handleScroll.isPosMatch(currPos, handleScroll.idleAt) || !handleScroll.isActiveOnPage) {

	            handleScroll.track_end_time = new Date();
	            handleScroll.idleAt = currPos;
	            handleScroll.idleSince = currtime;

	            if (handleScroll.track_start_time && handleScroll.track_end_time && handleScroll.track_pos) {

	                handleScroll.lastrecordpos = currPos;
	                handleScroll.lastrecordtime = currtime;
	                return !0;
	            }
	        }

	        return !1;
	    },
	    pushToScrollData: function pushToScrollData(_ref, timespent) {
	        var top = _ref.top,
	            height = _ref.height;


	        if (timespent > 0) {
	            handleScroll.scrolldata.push({

	                y1: Math.floor(top),
	                y2: Math.floor(top) + Math.floor(height),
	                h: Math.floor(height),
	                t: timespent
	            });
	        }
	    },
	    trackScroll: function trackScroll() {

	        var sPos = handleScroll.getScrollPosition();

	        if (!handleScroll.isScrolling && handleScroll.isScrollCriteriaSatisfied(sPos)) {

	            var timespent = handleScroll.track_end_time - handleScroll.track_start_time;
	            var trackpos = handleScroll.track_pos;

	            handleScroll.pushToScrollData(trackpos, timespent);
	            handleScroll.initTrack();
	        }
	    },
	    userHasLeftPage: function userHasLeftPage() {
	        handleScroll.isActiveOnPage = false;
	    },
	    userHasReturned: function userHasReturned() {
	        handleScroll.isActiveOnPage = true;
	    },
	    resetIdleTimeout: function resetIdleTimeout() {

	        if (handleScroll.isIdleOnPageBeyondThreshold) {
	            handleScroll.userHasReturned();
	        }

	        handleScroll.isIdleOnPageBeyondThreshold = false;
	        handleScroll.currentIdleTime = 0;
	    },
	    checkVisibilityState: function checkVisibilityState() {

	        if (!handleScroll.isIdleOnPageBeyondThreshold && handleScroll.currentIdleTime > handleScroll.idleTimeoutThresholdInMS) {

	            handleScroll.isIdleOnPageBeyondThreshold = true;
	            handleScroll.userHasLeftPage();
	        } else {
	            handleScroll.currentIdleTime += handleScroll.checkstateTimeoutInMS;
	        }
	    },
	    initCheckForVisibility: function initCheckForVisibility() {

	        if (typeof document.hidden !== "undefined") {
	            handleScroll.hiddenPropName = "hidden"; // NO I18N
	            handleScroll.visibilityChangeEventName = "visibilitychange"; // NO I18N
	        } else if (typeof document.mozHidden !== "undefined") {
	            handleScroll.hiddenPropName = "mozHidden"; // NO I18N
	            handleScroll.visibilityChangeEventName = "mozvisibilitychange"; // NO I18N
	        } else if (typeof document.msHidden !== "undefined") {
	            // NO I18N
	            handleScroll.hiddenPropName = "msHidden"; // NO I18N
	            handleScroll.visibilityChangeEventName = "msvisibilitychange"; // NO I18N
	        } else if (typeof document.webkitHidden !== "undefined") {
	            handleScroll.hiddenPropName = "webkitHidden"; // NO I18N
	            handleScroll.visibilityChangeEventName = "webkitvisibilitychange"; // NO I18N
	        }

	        document.addEventListener(handleScroll.visibilityChangeEventName, function () {
	            if (document[handleScroll.hiddenPropName]) {
	                handleScroll.userHasLeftPage();
	            } else {
	                handleScroll.userHasReturned();
	            }
	        }, false);

	        window.addEventListener('blur', function () {
	            handleScroll.userHasLeftPage();
	        });

	        window.addEventListener('focus', function () {
	            handleScroll.resetIdleTimeout();
	            handleScroll.userHasReturned();
	        });

	        document.addEventListener("keyup", handleScroll.resetIdleTimeout);
	        document.addEventListener("touchstart", handleScroll.resetIdleTimeout);
	        document.addEventListener("mousemove", handleScroll.resetIdleTimeout);
	        document.addEventListener("scroll", handleScroll.resetIdleTimeout);

	        setInterval(function () {
	            handleScroll.checkVisibilityState();
	        }, handleScroll.checkstateTimeoutInMS);
	    },
	    setUserAsInactive: function setUserAsInactive() {

	        if (handleScroll.isActiveOnPage) {

	            handleScroll.userHasLeftPage();
	            handleScroll.trackScroll();
	        }
	    },
	    cleanup: function cleanup() {
	        window.clearInterval(handleScroll.scrollInterval);
	    }
	};

	exports.default = handleScroll;

/***/ })
/******/ ]);