'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryType = undefined;

var _graphql = require('graphql');

var _s = require('./s3');

var _dummy = require('./dummy');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var orderByType = new _graphql.GraphQLEnumType({
  name: 'orderBy',
  values: {
    failedLoginsTotal_ASC: {
      value: 'failedLoginsTotal_ASC'
    },
    failedLoginsTotal_DESC: {
      value: 'failedLoginsTotal_DESC'
    }
  }
});

var rangeType = new _graphql.GraphQLInputObjectType({
  name: 'Range',
  fields: {
    start: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
    },
    end: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
    }
  }
});

var failedLoginsType = new _graphql.GraphQLObjectType({
  name: 'FailedLogins',
  fields: {
    total: {
      type: _graphql.GraphQLInt
    },
    password: {
      type: _graphql.GraphQLInt
    },
    username: {
      type: _graphql.GraphQLInt
    }
  }
});

var userType = new _graphql.GraphQLObjectType({
  name: 'user',
  fields: {
    id: {
      type: _graphql.GraphQLString
    },
    name: {
      type: _graphql.GraphQLString
    },
    email: {
      type: _graphql.GraphQLString
    },
    failedLogins: {
      type: failedLoginsType
    },
    logins: {
      type: _graphql.GraphQLInt
    },
    urlDashboard: {
      type: _graphql.GraphQLString
    }
  }
});

var queryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    // user: {
    //   type: userType,
    //   args: {
    //     name: {
    //       type: GraphQLString
    //     }
    //   },
    //   resolve: async (src, {name}) => {
    //     try {
    //       let users = await compileReports()
    //       let user = users.find( (user) => {
    //         return user.name === name
    //       })
    //       if (!user) {throw new Error("User doesn't exist!")}
    //       return user
    //     } catch (e) {
    //       console.log("user query error", e)
    //       return `Error: ${e}`
    //     }
    //
    //   }
    // },
    allUsers: {
      type: new _graphql.GraphQLList(userType),
      args: {
        orderBy: {
          type: orderByType
        },
        number: {
          type: _graphql.GraphQLInt
        },
        range: {
          type: rangeType
        }
      },
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref2) {
          var orderBy = _ref2.orderBy,
              number = _ref2.number,
              range = _ref2.range;
          var users;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  users = void 0;

                  if (!range) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 5;
                  return (0, _dummy.generateDummyRange)(range.start, range.end);

                case 5:
                  users = _context.sent;
                  _context.next = 11;
                  break;

                case 8:
                  _context.next = 10;
                  return (0, _dummy.generateDummyHour)();

                case 10:
                  users = _context.sent;

                case 11:
                  users.sort(function (a, b) {
                    if (orderBy === 'failedLoginsTotal_DESC') {
                      return a.failedLogins.total - b.failedLogins.total;
                    } else {
                      return b.failedLogins.total - a.failedLogins.total;
                    }
                  });
                  if (number) {
                    users = users.slice(0, number);
                  }

                  return _context.abrupt('return', users);

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context['catch'](0);

                  console.log("allUser query error", _context.t0);

                case 19:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[0, 16]]);
        }));

        return function resolve(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    mostRecentSummary: {
      type: _graphql.GraphQLString,
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(src, args) {
          var summary;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return (0, _s.fetchSummary)();

                case 3:
                  summary = _context2.sent;
                  return _context2.abrupt('return', summary);

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2['catch'](0);

                  console.log("summary query error", _context2.t0);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined, [[0, 7]]);
        }));

        return function resolve(_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }()
    }
  }
});

exports.queryType = queryType;