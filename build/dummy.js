'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.generateDummyHour = generateDummyHour;
exports.generateDummyRange = generateDummyRange;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var users = [];

for (var i = 0; i < 200; i++) {
  var name = _faker2.default.name.findName();
  var id = (0, _uuid.v4)();
  users.push({
    name: name,
    email: name + '@gmail.com',
    id: 'auth|' + id,
    urlDashboard: 'https://manage.auth0.com/#/users/' + id
  });
}

function rando(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateDummyHour() {
  var data = [];
  users.forEach(function (user) {

    var logins = rando(0, 15);
    var password = rando(0, 10);
    var username = rando(0, 10);
    data.push(_extends({}, user, {
      logins: logins,
      failedLogins: {
        total: password + username,
        password: password,
        username: username
      }
    }));
  });
  return data;
}

function generateDummyRange(start, end) {
  var hours = new Date(start - end).getHours();
  var raw = [];
  for (var _i = 0; _i < hours; _i++) {
    raw.push.apply(raw, _toConsumableArray(generateDummyHour()));
  }
  var unique = [];
  raw.forEach(function (report) {
    var index = void 0;
    var found = unique.find(function (user, i) {
      index = i;
      return report.id === user.id;
    });
    if (found) {
      unique[index] = _extends({}, report, {
        logins: report.logins + found.logins,
        failedLogins: {
          total: report.failedLogins.total + found.failedLogins.total,
          username: report.failedLogins.username + found.failedLogins.username,
          password: report.failedLogins.password + found.failedLogins.password
        }
      });
    } else {
      unique.push(report);
    }
  });
  return unique;
}