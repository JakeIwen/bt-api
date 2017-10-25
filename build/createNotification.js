'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var type = _ref2.type,
        forId = _ref2.forId,
        byId = _ref2.byId,
        extra = _ref2.extra;
    var simple;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            simple = 'https://api.graph.cool/simple/v1/bt-api';
            return _context.abrupt('return', (0, _nodeFetch2.default)(simple, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                query: '\n        mutation {\n          createNotification (\n            type: ' + type + '\n            notificationForId: "' + forId + '"\n            triggeredById: "' + byId + '"\n            ' + (extra ? extra : '') + '\n          ) {\n            id\n          }\n        }\n      '
              })
            }).then(function (response) {
              return response.json();
            }).then(function (json) {
              console.log("json", json);
            }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function createNotification(_x) {
    return _ref.apply(this, arguments);
  }

  return createNotification;
}();