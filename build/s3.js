'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileReports = exports.getAllReports = exports.fetchReport = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fetchReport = exports.fetchReport = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var rows = [];
              (0, _csvtojson2.default)().fromFile('./src/data/' + file + '.csv').on('json', function (json) {
                rows.push(json);
              }).on('done', function (error) {
                if (error) {
                  reject(error);
                }
                resolve(rows);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchReport(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAllReports = exports.getAllReports = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var passwordFail, topLogins, usernameFail;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetchReport('passwordFail');

          case 3:
            passwordFail = _context2.sent;
            _context2.next = 6;
            return fetchReport('topLogins');

          case 6:
            topLogins = _context2.sent;
            _context2.next = 9;
            return fetchReport('usernameFail');

          case 9:
            usernameFail = _context2.sent;
            return _context2.abrupt('return', [].concat(_toConsumableArray(passwordFail), _toConsumableArray(topLogins), _toConsumableArray(usernameFail)));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](0);

            console.log("getAllReports error", _context2.t0);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 13]]);
  }));

  return function getAllReports() {
    return _ref2.apply(this, arguments);
  };
}();

var compileReports = exports.compileReports = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var compiled, allReports, final;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            compiled = [];
            _context3.next = 4;
            return getAllReports();

          case 4:
            allReports = _context3.sent;

            allReports.forEach(function (report) {
              var index = void 0;
              var found = compiled.find(function (row, i) {
                index = i;
                return report['user_name'] === row['user_name'];
              });
              if (found) {
                compiled[i] = _extends({}, report, found);
              } else {
                compiled.push(report);
              }
            });
            final = [];

            compiled.forEach(function (user) {
              console.log("user", user);
              var newUser = {
                name: user['user_name'],
                id: user['user_id'],
                email: user.email,
                logins: user.logins,
                urlDashboard: user['url_dashboard'],
                failedLogins: {
                  total: 0,
                  password: 0,
                  username: 0
                }
              };
              if (user['failed_pass']) {
                newUser.failedLogins.password = parseInt(user['failed_pass']);
              }
              if (user['failed_user']) {
                newUser.failedLogins.username = parseInt(user['failed_user']);
              }
              newUser.failedLogins.total = newUser.failedLogins.password + newUser.failedLogins.username;
              final.push(newUser);
            });
            return _context3.abrupt('return', final);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](0);

            console.log("compileReports error", _context3.t0);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 11]]);
  }));

  return function compileReports() {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchSummary = fetchSummary;

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function fetchSummary() {
  return _fs2.default.readFileSync(_path2.default.join(__dirname, './data/Summary.txt'), 'utf8', function (err, source) {
    if (err) {
      throw err;
    }
    return source;
  });
}