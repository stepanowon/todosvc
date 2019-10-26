"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tododao = require("./tododao");

var _systemSleep = _interopRequireDefault(require("system-sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.get('/', function (req, res) {
    console.log("### GET /");
    res.render('index', {
      title: 'todolist 서비스 v1.0',
      subtitle: '(node.js + express + lokijs)'
    });
  });
  app.get('/todolist/:owner/create', function (req, res) {
    console.log("### GET /todolist/:owner/create");
    var owner = req.params.owner;
    var result = (0, _tododao.createNewOwner)({
      owner: owner
    });
    res.json(result);
  });
  app.get('/todolist/:owner', function (req, res) {
    console.log("### GET /todolist/:owner");
    var owner = req.params.owner;
    var todolist = (0, _tododao.getTodoList)({
      owner: owner
    });
    res.json(todolist);
  });
  app.get('/todolist/:owner/:no', function (req, res) {
    console.log("### GET /todolist/:owner/:no");
    var _req$params = req.params,
        owner = _req$params.owner,
        no = _req$params.no;
    var todoitem = (0, _tododao.getTodoItem)({
      owner: owner,
      no: no
    });
    res.json(todoitem);
  });
  app.post('/todolist/:owner', function (req, res) {
    console.log("### POST /todolist/:owner");
    var owner = req.params.owner;
    var _req$body = req.body,
        todo = _req$body.todo,
        desc = _req$body.desc;
    var result = (0, _tododao.addTodo)({
      owner: owner,
      todo: todo,
      desc: desc
    });
    res.json(result);
  });
  app.put('/todolist/:owner/:no', function (req, res) {
    console.log("### PUT /todolist/:owner/:no");
    var _req$params2 = req.params,
        owner = _req$params2.owner,
        no = _req$params2.no;
    var _req$body2 = req.body,
        todo = _req$body2.todo,
        done = _req$body2.done,
        desc = _req$body2.desc;
    var result = (0, _tododao.updateTodo)({
      owner: owner,
      no: no,
      todo: todo,
      done: done,
      desc: desc
    });
    res.json(result);
  });
  app.put('/todolist/:owner/:no/done', function (req, res) {
    console.log("### PUT /todolist/:owner/:no");
    var _req$params3 = req.params,
        owner = _req$params3.owner,
        no = _req$params3.no;
    var result = (0, _tododao.toggleDone)({
      owner: owner,
      no: no
    });
    res.json(result);
  });
  app["delete"]('/todolist/:owner/:no', function (req, res) {
    console.log("### DELETE /todolist/:owner/:no");
    var _req$params4 = req.params,
        owner = _req$params4.owner,
        no = _req$params4.no;
    var result = (0, _tododao.deleteTodo)({
      owner: owner,
      no: no
    });
    res.json(result);
  });
  app.get('/todolist_long/:owner', function (req, res) {
    console.log("### GET /todolist_long/:owner");
    (0, _systemSleep["default"])(1000);
    var owner = req.params.owner;
    var todolist = (0, _tododao.getTodoList)({
      owner: owner
    });
    res.json(todolist);
  });
  app.get('/todolist_long/:owner/:no', function (req, res) {
    console.log("### GET /todolist_long/:owner/:no");
    (0, _systemSleep["default"])(1000);
    var _req$params5 = req.params,
        owner = _req$params5.owner,
        no = _req$params5.no;
    var todoitem = (0, _tododao.getTodoItem)({
      owner: owner,
      no: no
    });
    res.json(todoitem);
  }); //----에러 처리 시작

  app.get('*', function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
  });
  app.use(function (err, req, res, next) {
    console.log("### ERROR!!");

    if (err.status === 404) {
      res.status(404).json({
        status: 404,
        message: "잘못된 URI 요청"
      });
    } else if (err.status === 500) {
      res.status(500).json({
        status: 500,
        message: "내부 서버 오류"
      });
    } else {
      res.status(err.status).jsonp({
        status: "fail",
        message: err.message
      });
    }
  });
};

exports["default"] = _default;