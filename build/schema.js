'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _types = require('./types');

var schema = new _graphql.GraphQLSchema({
  query: _types.queryType
});

exports.default = schema;