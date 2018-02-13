webpackJsonp([0],{

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(132);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(228);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(557);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fetch = __webpack_require__(558);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, options) {
    var headers, newOptions, response, data, ret;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = new Headers({
              'Content-Type': 'application/json'
            });
            newOptions = (0, _assign2.default)({}, options, { headers: headers });
            _context.next = 4;
            return (0, _fetch2.default)(url, newOptions);

          case 4:
            response = _context.sent;


            checkStatus(response);

            _context.next = 8;
            return response.json();

          case 8:
            data = _context.sent;
            ret = {
              data: data,
              headers: {}
            };


            if (response.headers.get('x-total-count')) {
              ret.headers['x-total-count'] = response.headers.get('x-total-count');
            }

            return _context.abrupt('return', ret);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function request(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return request;
}();

module.exports = exports['default'];

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(134);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(559);


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(560);
module.exports = self.fetch.bind(self);


/***/ }),

/***/ 560:
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(704);
var objectAssign = __webpack_require__(5);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(706);

var _stringify2 = _interopRequireDefault(_stringify);

exports.sync = sync;
exports.login = login;
exports.checkLogin = checkLogin;
exports.getTags = getTags;
exports.search = search;
exports.send = send;
exports.fetch = fetch;
exports.remove = remove;
exports.patch = patch;
exports.create = create;

var _request = __webpack_require__(556);

var _request2 = _interopRequireDefault(_request);

var _constants = __webpack_require__(708);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sync() {
  return (0, _request2.default)('/api/users', {
    method: 'POST'
  });
}
function login(params) {
  return (0, _request2.default)('/api/login', {
    method: 'POST',
    body: (0, _stringify2.default)(params),
    credentials: 'include'
  });
}
function checkLogin(params) {
  return (0, _request2.default)('/api/checklogin', {
    method: 'get',
    credentials: 'include'
  });
}
function getTags() {
  return (0, _request2.default)('/api/tags', {
    method: 'GET'
  });
}
function search(_ref) {
  var query = _ref.query;

  return (0, _request2.default)('/api/users?search=' + query);
}
function send(_ref2) {
  var to = _ref2.to,
      totag = _ref2.totag,
      message = _ref2.message;

  console.info('send__', { to: to, totag: totag, message: message });
  return (0, _request2.default)('/api/send', {
    method: 'POST',
    body: (0, _stringify2.default)({ to: to, totag: totag, message: message })
  });
}
function fetch(_ref3) {
  var page = _ref3.page;

  return (0, _request2.default)('/api/users?_page=' + page + '&_limit=' + _constants.PAGE_SIZE);
}

function remove(id) {
  return (0, _request2.default)('/api/users/' + id, {
    method: 'DELETE'
  });
}

function patch(id, values) {
  return (0, _request2.default)('/api/users/' + id, {
    method: 'PATCH',
    body: (0, _stringify2.default)(values)
  });
}

function create(values) {
  return (0, _request2.default)('/api/users', {
    method: 'POST',
    body: (0, _stringify2.default)(values)
  });
}

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(707), __esModule: true };

/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(10);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PAGE_SIZE = exports.PAGE_SIZE = 3;

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(710);
var wrapper = util.wrapper;
var postJSON = util.postJSON;
/**
 * 创建标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.createTag(callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "tag": [
 *    "id": 134, // 标签id
 *    "name": "广东"
 *  ]
 * }
 * ```
 * @param {String} name tag name
 * @param {Function} callback 回调函数
 */
exports.createTag = function (name, callback) {
  this.preRequest(this._createTag, arguments);
};

/*!
 * 创建标签的未封装版本
 */
exports._createTag = function (name, callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/create?access_token=ACCESS_TOKEN
  var url = this.endpoint + '/cgi-bin/tags/create?access_token=' + this.token.accessToken;
  var data = {
    'tag': {
      'name': name
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取公众号已创建的标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.getTags(callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "tags":[{
 *    'id':1,
 *    'name': '黑名单',
 *    'count': 0  // 此标签下粉丝数
 *  },{
 *    'id':2,
 *    'name': '星标组',
 *    'count':0
 *  }]
 * }
 * ```
 * @param {String} openid Open ID
 * @param {Function} callback 回调函数
 */
exports.getTags = function (callback) {
  this.preRequest(this._getTags, arguments);
};

/*!
 * 获取公众号已创建的标签的未封装版本
 */
exports._getTags = function (callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/get?access_token=ACCESS_TOKEN
  var url = this.endpoint + '/cgi-bin/tags/get?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 编辑标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.editTag(id, name, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}}
 * ```
 * @param {Number} id 标签ID
 * @param {String} name 标签新名字
 * @param {Function} callback 回调函数
 */
exports.editTag = function (id, name, callback) {
  this.preRequest(this._editTag, arguments);
};

/*!
 * 编辑标签的未封装版本
 */
exports._editTag = function (id, name, callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tag":{"id":134, "name":"test"}}
  var url = this.endpoint + '/cgi-bin/tags/update?access_token=' + this.token.accessToken;
  var data = {
    'tag': {
      'id': id,
      'name': name
    }
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 删除标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.deleteTag(id, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {Number} id 标签ID
 * @param {Function} callback 回调函数
 */
exports.deleteTag = function (id, callback) {
  this.preRequest(this._deleteTag, arguments);
};

/*!
 * 删除标签的未封装版本
 */
exports._deleteTag = function (id, callback) {
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tag":{"id":108}}
  var url = this.endpoint + '/cgi-bin/tags/delete?access_token=' + this.token.accessToken;
  var data = {
    'tag': {'id': id}
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取标签下粉丝列表
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.getTagUsers(tagid, openid, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *   "count": 2,
 *   "data":{
 *     "openid":[
 *       ...
 *     ]
 *   },
 *   "next_openid": "..."
 * }
 * ```
 * @param {Number} tagId 标签ID
 * @param {String} openid 分页起始openid
 * @param {Function} callback 回调函数
 */
exports.getTagUsers = function (tagId, openid, callback) {
  this.preRequest(this._getTagUsers, arguments);
};

/*!
 * 获取标签下粉丝列表的未封装版本
 */
exports._getTagUsers = function (tagId, openid, callback) {
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"tagid":108, "next_openid":"oDF3iYx0ro3_7jD4HFRDfrjdCM58"}
  var url = this.endpoint + '/cgi-bin/user/tag/get?access_token=' + this.token.accessToken;
  var data = {
    'tagid': tagId,
    'next_openid': openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 批量为用户打标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.memberBatchtagging(tagId, openList, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {Number} tagId 标签ID
 * @param {Array} openList 用户openids
 * @param {Function} callback 回调函数
 */
exports.membersBatchtagging = function (tagId, openList, callback) {
  this.preRequest(this._membersBatchtagging, arguments);
};

/*!
 * 批量为用户打标签的未封装版本
 */
exports._membersBatchtagging = function (tagId, openList, callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=ACCESS_TOKEN
  var url = this.endpoint + '/cgi-bin/tags/members/batchtagging?access_token=' + this.token.accessToken;
  var data = {
    'openid_list':openList,
    'tagid': tagId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 批量为用户取消标签
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.memberBatchuntagging(tagId, openList, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {Number} tagId 标签ID
 * @param {Array} openList 用户openids
 * @param {Function} callback 回调函数
 */
exports.membersBatchuntagging = function (tagId, openList, callback) {
  this.preRequest(this._membersBatchuntagging, arguments);
};

/*!
 * 批量为用户取消标签的未封装版本
 */
exports._membersBatchuntagging = function (tagId, openList, callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=ACCESS_TOKEN
  var url = this.endpoint + '/cgi-bin/tags/members/batchuntagging?access_token=' + this.token.accessToken;
  var data = {
    'openid_list':openList,
    'tagid': tagId
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取用户身上的标签列表
 * 详情请见：<http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN>
 * Examples:
 * ```
 * api.getUserTags(openid, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"tagid_list": [134, 2]}
 * ```
 * @param {openid} 用户openid
 * @param {Function} callback 回调函数
 */
exports.getUserTags = function (openid, callback) {
  this.preRequest(this._getUserTags, arguments);
};

/*!
 * 获取用户身上的标签列表的未封装版本
 */
exports._getUserTags = function (openid, callback) {
  // https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=ACCESS_TOKEN
  var url = this.endpoint + '/cgi-bin/tags/getidlist?access_token=' + this.token.accessToken;
  var data = {
    'openid':openid
  };
  this.request(url, postJSON(data), wrapper(callback));
};



/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 * 参见：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
 */
exports.wrapper = function (callback) {
  return function (err, data, res) {
    callback = callback || function () {};
    if (err) {
      err.name = 'WeChatAPI' + err.name;
      return callback(err, data, res);
    }
    if (data && data.errcode) {
      err = new Error(data.errmsg);
      err.name = 'WeChatAPIError';
      err.code = data.errcode;
      return callback(err, data, res);
    }
    if (data == null) {
      err = new Error('No data received.');
      err.name = 'WeChatAPIError';
      err.code = -1;
      return callback(err, data, res);
    }
    callback(null, data, res);
  };
};

/*!
 * 对提交参数一层封装，当POST JSON，并且结果也为JSON时使用
 */
exports.postJSON = function (data) {
  return {
    dataType: 'json',
    type: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

exports.make = function (host, name, fn) {
  host[name] = function () {
    this.preRequest(this['_' + name], arguments);
  };
  host['_' + name] = fn;
};


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(132);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectDestructuringEmpty2 = __webpack_require__(702);

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _extends2 = __webpack_require__(17);

var _extends3 = _interopRequireDefault(_extends2);

var _queryString = __webpack_require__(703);

var _queryString2 = _interopRequireDefault(_queryString);

var _users = __webpack_require__(705);

var usersService = _interopRequireWildcard(_users);

var _api_tag = __webpack_require__(709);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'users',
  state: {
    list: [],
    tags: [],
    total: null,
    page: null,
    login: null
  },
  reducers: {
    save: function save(state, _ref) {
      var _ref$payload = _ref.payload,
          list = _ref$payload.data,
          total = _ref$payload.total,
          page = _ref$payload.page,
          tags = _ref$payload.tags;

      return (0, _extends3.default)({}, state, { list: list, total: total, page: page, tags: tags });
    }
  },
  effects: {
    sync: /*#__PURE__*/_regenerator2.default.mark(function sync(_ref2, _ref3) {
      var call = _ref3.call,
          put = _ref3.put;

      var _ref4, data, headers;

      return _regenerator2.default.wrap(function sync$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _objectDestructuringEmpty3.default)(_ref2);
              _context.next = 3;
              return call(usersService.sync);

            case 3:
              _ref4 = _context.sent;
              data = _ref4.data;
              headers = _ref4.headers;
              _context.next = 8;
              return put({
                type: 'save',
                payload: {
                  data: data
                }
              });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, sync, this);
    }),
    login: /*#__PURE__*/_regenerator2.default.mark(function login(_ref5, _ref6) {
      var _ref5$payload = _ref5.payload,
          username = _ref5$payload.username,
          password = _ref5$payload.password;
      var call = _ref6.call,
          put = _ref6.put;

      var _ref7, data, headers;

      return _regenerator2.default.wrap(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(usersService.login, { username: username, password: password });

            case 2:
              _ref7 = _context2.sent;
              data = _ref7.data;
              headers = _ref7.headers;

              if (!data.err) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', data);

            case 7:
              _context2.next = 9;
              return put({
                type: 'save',
                payload: {
                  login: data
                }
              });

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, login, this);
    }),
    checkLogin: /*#__PURE__*/_regenerator2.default.mark(function checkLogin(_ref8, _ref9) {
      var call = _ref9.call,
          put = _ref9.put;

      var _ref10, data, headers;

      return _regenerator2.default.wrap(function checkLogin$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _objectDestructuringEmpty3.default)(_ref8);
              _context3.next = 3;
              return call(usersService.checkLogin);

            case 3:
              _ref10 = _context3.sent;
              data = _ref10.data;
              headers = _ref10.headers;

              console.info('checkLogin__', data, headers);
              return _context3.abrupt('return', data);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, checkLogin, this);
    }),
    getTags: /*#__PURE__*/_regenerator2.default.mark(function getTags(_ref11, _ref12) {
      var call = _ref12.call,
          put = _ref12.put;

      var _ref13, data, headers;

      return _regenerator2.default.wrap(function getTags$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _objectDestructuringEmpty3.default)(_ref11);
              _context4.next = 3;
              return call(usersService.getTags);

            case 3:
              _ref13 = _context4.sent;
              data = _ref13.data;
              headers = _ref13.headers;
              _context4.next = 8;
              return put({
                type: 'save',
                payload: {
                  tags: data
                }
              });

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _api_tag.getTags, this);
    }),
    send: /*#__PURE__*/_regenerator2.default.mark(function send(_ref14, _ref15) {
      var _ref14$payload = _ref14.payload,
          to = _ref14$payload.to,
          totag = _ref14$payload.totag,
          message = _ref14$payload.message;
      var call = _ref15.call,
          put = _ref15.put;

      var _ref16, data, headers;

      return _regenerator2.default.wrap(function send$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.info('*send', to, totag, message);
              _context5.next = 3;
              return call(usersService.send, { to: to, totag: totag, message: message });

            case 3:
              _ref16 = _context5.sent;
              data = _ref16.data;
              headers = _ref16.headers;

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, send, this);
    }),
    search: /*#__PURE__*/_regenerator2.default.mark(function search(_ref17, _ref18) {
      var _ref17$payload$query = _ref17.payload.query,
          query = _ref17$payload$query === undefined ? '' : _ref17$payload$query;
      var call = _ref18.call,
          put = _ref18.put;

      var _ref19, data, headers;

      return _regenerator2.default.wrap(function search$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return call(usersService.search, { query: query });

            case 2:
              _ref19 = _context6.sent;
              data = _ref19.data;
              headers = _ref19.headers;
              _context6.next = 7;
              return put({
                type: 'save',
                payload: {
                  data: data
                }
              });

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, search, this);
    }),
    fetch: /*#__PURE__*/_regenerator2.default.mark(function fetch(_ref20, _ref21) {
      var _ref20$payload$page = _ref20.payload.page,
          page = _ref20$payload$page === undefined ? 1 : _ref20$payload$page;
      var call = _ref21.call,
          put = _ref21.put;

      var _ref22, data, headers;

      return _regenerator2.default.wrap(function fetch$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return call(usersService.fetch, { page: page });

            case 2:
              _ref22 = _context7.sent;
              data = _ref22.data;
              headers = _ref22.headers;
              _context7.next = 7;
              return put({
                type: 'save',
                payload: {
                  data: data,
                  total: parseInt(headers['x-total-count'], 10),
                  page: parseInt(page, 10)
                }
              });

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, fetch, this);
    }),
    remove: /*#__PURE__*/_regenerator2.default.mark(function remove(_ref23, _ref24) {
      var id = _ref23.payload;
      var call = _ref24.call,
          put = _ref24.put;
      return _regenerator2.default.wrap(function remove$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return call(usersService.remove, id);

            case 2:
              _context8.next = 4;
              return put({ type: 'reload' });

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, remove, this);
    }),
    patch: /*#__PURE__*/_regenerator2.default.mark(function patch(_ref25, _ref26) {
      var _ref25$payload = _ref25.payload,
          id = _ref25$payload.id,
          values = _ref25$payload.values;
      var call = _ref26.call,
          put = _ref26.put;
      return _regenerator2.default.wrap(function patch$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return call(usersService.patch, id, values);

            case 2:
              _context9.next = 4;
              return put({ type: 'reload' });

            case 4:
            case 'end':
              return _context9.stop();
          }
        }
      }, patch, this);
    }),
    create: /*#__PURE__*/_regenerator2.default.mark(function create(_ref27, _ref28) {
      var values = _ref27.payload;
      var call = _ref28.call,
          put = _ref28.put;
      return _regenerator2.default.wrap(function create$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return call(usersService.create, values);

            case 2:
              _context10.next = 4;
              return put({ type: 'reload' });

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, create, this);
    }),
    reload: /*#__PURE__*/_regenerator2.default.mark(function reload(action, _ref29) {
      var put = _ref29.put,
          select = _ref29.select;
      var page;
      return _regenerator2.default.wrap(function reload$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return select(function (state) {
                return state.users.page;
              });

            case 2:
              page = _context11.sent;
              _context11.next = 5;
              return put({ type: 'fetch', payload: { page: page } });

            case 5:
            case 'end':
              return _context11.stop();
          }
        }
      }, reload, this);
    })
  },
  subscriptions: {
    setup: function setup(_ref30) {
      var dispatch = _ref30.dispatch,
          history = _ref30.history;

      return history.listen(function (_ref31) {
        var pathname = _ref31.pathname,
            search = _ref31.search;

        var query = _queryString2.default.parse(search);
        if (pathname !== '/login') {
          dispatch({ type: 'checkLogin' }).then(function (res) {
            if (!res.login) {
              history.push('/login');
            }
          });
        }
        if (query.type === 'tags') {
          dispatch({ type: 'getTags', payload: query });
        }
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  }
};
module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=0.js.map