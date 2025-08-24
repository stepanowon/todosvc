"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());

// Cache control middleware
app.use(function (_req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
var baseDir = _path["default"].resolve('.');
var PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.use(_express["default"]["static"](_path["default"].join(baseDir, 'public')));
app.set('views', _path["default"].join(baseDir, 'views'));
app.set('view engine', 'ejs');
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _routes["default"])(app);

// Error handling middleware
app.use(function (err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!'
  });
});
app.listen(PORT, function () {
  console.log("\uD560\uC77C \uBAA9\uB85D \uC11C\uBE44\uC2A4\uAC00 ".concat(PORT, "\uBC88 \uD3EC\uD2B8\uC5D0\uC11C \uC2DC\uC791\uB418\uC5C8\uC2B5\uB2C8\uB2E4!"));
});