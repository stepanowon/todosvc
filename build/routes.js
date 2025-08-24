"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _tododao = require("./tododao.js");
var _sleepPromise = _interopRequireDefault(require("sleep-promise"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// 공통 핸들러 함수들
var createAsyncHandler = function createAsyncHandler(handler) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return delay > 0 ? function (req, res) {
    return (0, _sleepPromise["default"])(delay).then(function () {
      return handler(req, res);
    });
  } : handler;
};
var logRequest = function logRequest(method, path) {
  console.log("### ".concat(method, " ").concat(path));
};

// 라우터 함수
var _default = exports["default"] = function _default(app) {
  // 홈 페이지
  app.get("/", function (req, res) {
    logRequest('GET', '/');
    res.render("index", {
      title: "todolist 서비스 v1.0",
      subtitle: "(node.js + express + lokijs)"
    });
  });

  // 사용자 정보 조회 (예제용)
  var getUserHandler = function getUserHandler(req, res) {
    logRequest('GET', '/users/:id');
    var id = req.params.id;
    res.json({
      id: id,
      userid: "gdhong",
      username: "홍길동"
    });
  };
  app.get("/users/:id", createAsyncHandler(getUserHandler, 3000));

  // 새 오너 생성
  app.get("/todolist/:owner/create", function (req, res) {
    logRequest('GET', '/todolist/:owner/create');
    var owner = req.params.owner;
    var result = (0, _tododao.createNewOwner)({
      owner: owner
    });
    res.json(result);
  });

  // 할일 목록 조회
  var getTodoListHandler = function getTodoListHandler(req, res) {
    var owner = req.params.owner;
    var todolist = (0, _tododao.getTodoList)({
      owner: owner
    });
    res.json(todolist);
  };
  app.get("/todolist/:owner", function (req, res) {
    logRequest('GET', '/todolist/:owner');
    getTodoListHandler(req, res);
  });
  app.get("/todolist_long/:owner", function (req, res) {
    logRequest('GET', '/todolist_long/:owner');
    createAsyncHandler(getTodoListHandler, 1000)(req, res);
  });

  // 할일 항목 조회
  var getTodoItemHandler = function getTodoItemHandler(req, res) {
    var _req$params = req.params,
      owner = _req$params.owner,
      id = _req$params.id;
    var todoitem = (0, _tododao.getTodoItem)({
      owner: owner,
      id: id
    });
    res.json(todoitem);
  };
  app.get("/todolist/:owner/:id", function (req, res) {
    logRequest('GET', '/todolist/:owner/:id');
    getTodoItemHandler(req, res);
  });
  app.get("/todolist_long/:owner/:id", function (req, res) {
    logRequest('GET', '/todolist_long/:owner/:id');
    createAsyncHandler(getTodoItemHandler, 1000)(req, res);
  });

  // 할일 추가
  var addTodoHandler = function addTodoHandler(req, res) {
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
  };
  app.post("/todolist/:owner", function (req, res) {
    logRequest('POST', '/todolist/:owner');
    addTodoHandler(req, res);
  });
  app.post("/todolist_long/:owner", function (req, res) {
    logRequest('POST', '/todolist_long/:owner');
    createAsyncHandler(addTodoHandler, 1000)(req, res);
  });

  // 할일 수정
  var updateTodoHandler = function updateTodoHandler(req, res) {
    var _req$params2 = req.params,
      owner = _req$params2.owner,
      id = _req$params2.id;
    var _req$body2 = req.body,
      todo = _req$body2.todo,
      done = _req$body2.done,
      desc = _req$body2.desc;
    var result = (0, _tododao.updateTodo)({
      owner: owner,
      id: id,
      todo: todo,
      done: done,
      desc: desc
    });
    res.json(result);
  };
  app.put("/todolist/:owner/:id", function (req, res) {
    logRequest('PUT', '/todolist/:owner/:id');
    updateTodoHandler(req, res);
  });
  app.put("/todolist_long/:owner/:id", function (req, res) {
    logRequest('PUT', '/todolist_long/:owner/:id');
    createAsyncHandler(updateTodoHandler, 1000)(req, res);
  });

  // 할일 완료 상태 토글
  var toggleDoneHandler = function toggleDoneHandler(req, res) {
    var _req$params3 = req.params,
      owner = _req$params3.owner,
      id = _req$params3.id;
    var result = (0, _tododao.toggleDone)({
      owner: owner,
      id: id
    });
    res.json(result);
  };
  app.put("/todolist/:owner/:id/done", function (req, res) {
    logRequest('PUT', '/todolist/:owner/:id/done');
    toggleDoneHandler(req, res);
  });
  app.put("/todolist_long/:owner/:id/done", function (req, res) {
    logRequest('PUT', '/todolist_long/:owner/:id/done');
    createAsyncHandler(toggleDoneHandler, 1000)(req, res);
  });

  // 할일 삭제
  var deleteTodoHandler = function deleteTodoHandler(req, res) {
    var _req$params4 = req.params,
      owner = _req$params4.owner,
      id = _req$params4.id;
    var result = (0, _tododao.deleteTodo)({
      owner: owner,
      id: id
    });
    res.json(result);
  };
  app["delete"]("/todolist/:owner/:id", function (req, res) {
    logRequest('DELETE', '/todolist/:owner/:id');
    deleteTodoHandler(req, res);
  });
  app["delete"]("/todolist_long/:owner/:id", function (req, res) {
    logRequest('DELETE', '/todolist_long/:owner/:id');
    createAsyncHandler(deleteTodoHandler, 1000)(req, res);
  });

  // 에러 처리 미들웨어
  app.use(function (err, req, res, next) {
    console.log("### ERROR!!");
    var errorResponses = {
      404: {
        status: 404,
        message: "잘못된 URI 요청"
      },
      500: {
        status: 500,
        message: "내부 서버 오류"
      }
    };
    var response = errorResponses[err.status] || {
      status: "fail",
      message: err.message
    };
    res.status(err.status || 500).json(response);
  });
};