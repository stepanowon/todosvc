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
app.set('port', process.env.PORT || 3000);
app.use(_express["default"]["static"](baseDir + '/public'));
app.set('views', baseDir + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
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
app.listen(app.get('port'), function () {
  console.log("할일 목록 서비스가 " + app.get('port') + "번 포트에서 시작되었습니다!");
});