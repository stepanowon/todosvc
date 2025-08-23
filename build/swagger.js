"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specs = void 0;
Object.defineProperty(exports, "swaggerUi", {
  enumerable: true,
  get: function get() {
    return _swaggerUiExpress["default"];
  }
});
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// 환경에 따른 API 파일 경로 결정
var getApiPaths = function getApiPaths() {
  var paths = [];

  // 개발환경 (src/routes.js 확인)
  if (_fs["default"].existsSync('./src/routes.js')) {
    paths.push('./src/routes.js');
  }

  // 빌드환경 (build/routes.js 또는 현재 디렉토리의 routes.js 확인)
  if (_fs["default"].existsSync('./build/routes.js')) {
    paths.push('./build/routes.js');
  }
  if (_fs["default"].existsSync('./routes.js')) {
    paths.push('./routes.js');
  }
  return paths;
};
var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'A simple Todo List API'
    },
    servers: [{
      url: 'https://todosvc.bmaster.kro.kr',
      description: 'Production server'
    }, {
      url: 'http://localhost:3000',
      description: 'Development server'
    }]
  },
  apis: getApiPaths() // 동적으로 존재하는 파일 경로 찾기
};
console.log('Swagger API paths:', options.apis);
var specs = exports.specs = (0, _swaggerJsdoc["default"])(options);
console.log('Generated specs paths:', specs.paths ? Object.keys(specs.paths) : 'No paths found');
console.log('Specs components:', specs.components ? 'Components found' : 'No components');