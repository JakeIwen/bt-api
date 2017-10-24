"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authMiddleware;
function authMiddleware(req, res, next) {
  console.log("req", req);
  next();
}