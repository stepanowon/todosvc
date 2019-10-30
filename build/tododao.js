"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDone = exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodoItem = exports.getTodoList = exports.createNewOwner = void 0;

var _lokijs = _interopRequireDefault(require("lokijs"));

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var todolist;
var no = new Date().getTime();

var databaseInitialize = function databaseInitialize() {
  todolist = db.getCollection("todolist");

  if (todolist === null) {
    todolist = db.addCollection('todolist', {
      indices: ['owner', 'no']
    }); //샘플 데이터

    todolist.insert({
      owner: 'gdhong',
      no: 123456789,
      todo: "ES6 공부",
      desc: "ES6공부를 해야 합니다",
      done: true
    });
    todolist.insert({
      owner: 'gdhong',
      no: no++,
      todo: "Vue 학습",
      desc: "Vue 학습을 해야 합니다",
      done: false
    });
    todolist.insert({
      owner: 'gdhong',
      no: no++,
      todo: "놀기",
      desc: "노는 것도 중요합니다.",
      done: true
    });
    todolist.insert({
      owner: 'gdhong',
      no: no++,
      todo: "야구장",
      desc: "프로야구 경기도 봐야합니다.",
      done: false
    });
    todolist.insert({
      owner: 'mrlee',
      no: no++,
      todo: "남원구경",
      desc: "고향집에 가봐야합니다.",
      done: true
    });
    todolist.insert({
      owner: 'mrlee',
      no: no++,
      todo: "저녁약속(10.11)",
      desc: "지인과의 중요한 저녁 약속입니다.",
      done: false
    });
    todolist.insert({
      owner: 'mrlee',
      no: no++,
      todo: "AWS 밋업",
      desc: "AWS 밋업에 반드시 참석해야 합니다.",
      done: false
    });
    todolist.insert({
      owner: 'mrlee',
      no: no++,
      todo: "AAI 모임",
      desc: "공인강사들 모임이 있습니다.",
      done: true
    });
  }
};

var db = new _lokijs["default"]('sample.db', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 60000
});

var createNewOwner = function createNewOwner(_ref) {
  var owner = _ref.owner;

  try {
    var queryResult = todolist.find({
      owner: owner
    });

    if (queryResult.length === 0) {
      todolist.insert({
        owner: owner,
        no: 123456787,
        todo: "ES6 공부",
        desc: "ES6공부를 해야 합니다",
        done: true
      });
      todolist.insert({
        owner: owner,
        no: 123456788,
        todo: "Vue 학습",
        desc: "Vue 학습을 해야 합니다",
        done: false
      });
      todolist.insert({
        owner: owner,
        no: 123456789,
        todo: "야구장",
        desc: "프로야구 경기도 봐야합니다.",
        done: false
      });
      return {
        status: "success",
        message: "샘플 데이터 생성 성공!"
      };
    } else {
      return {
        status: "fail",
        message: "생성 실패 : 이미 존재하는 owner입니다."
      };
    }
  } catch (ex) {
    return {
      status: "fail",
      message: "생성 실패 : " + ex
    };
  }
};

exports.createNewOwner = createNewOwner;

var getTodoList = function getTodoList(_ref2) {
  var owner = _ref2.owner;

  try {
    var result = [];
    var queryResult = todolist.find({
      owner: owner
    });

    for (var i = 0; i < queryResult.length; i++) {
      var item = _objectSpread({}, queryResult[i]);

      delete item.meta;
      delete item['$loki'];
      delete item.owner;
      result.push(item);
    }

    return result;
  } catch (ex) {
    return {
      status: "fail",
      message: "조회 실패 : " + ex
    };
  }
};

exports.getTodoList = getTodoList;

var getTodoItem = function getTodoItem(_ref3) {
  var owner = _ref3.owner,
      no = _ref3.no;

  try {
    no = parseInt(no);
    var one = todolist.findOne({
      owner: owner,
      no: no
    });

    var item = _objectSpread({}, one);

    delete item.meta;
    delete item['$loki'];
    delete item.owner;
    return item;
  } catch (ex) {
    return {
      status: "fail",
      message: "조회 실패 : " + ex
    };
  }
};

exports.getTodoItem = getTodoItem;

var addTodo = function addTodo(_ref4) {
  var owner = _ref4.owner,
      todo = _ref4.todo,
      desc = _ref4.desc;

  try {
    if (todo === null || todo.trim() === "") {
      throw new Error("할일을 입력하셔야 합니다.");
    }

    var item = {
      owner: owner,
      no: new Date().getTime(),
      todo: todo,
      desc: desc,
      done: false
    };
    todolist.insert(item);
    return {
      status: "success",
      message: "추가 성공",
      item: {
        no: item.no,
        todo: item.todo,
        desc: item.desc
      }
    };
  } catch (ex) {
    return {
      status: "fail",
      message: "추가 실패 : " + ex
    };
  }
};

exports.addTodo = addTodo;

var deleteTodo = function deleteTodo(_ref5) {
  var owner = _ref5.owner,
      no = _ref5.no;

  try {
    no = parseInt(no);
    var one = todolist.findOne({
      owner: owner,
      no: no
    });

    if (one !== null) {
      todolist.remove(one);
      return {
        status: "success",
        message: "삭제 성공",
        item: {
          no: one.no,
          todo: one.todo
        }
      };
    } else {
      return {
        status: "fail",
        message: "삭제 실패 : 삭제하려는 데이터가 존재하지 않음"
      };
    }
  } catch (ex) {
    return {
      status: "fail",
      message: "삭제 실패 : " + ex
    };
  }
};

exports.deleteTodo = deleteTodo;

var updateTodo = function updateTodo(_ref6) {
  var owner = _ref6.owner,
      no = _ref6.no,
      todo = _ref6.todo,
      desc = _ref6.desc,
      done = _ref6.done;

  try {
    no = parseInt(no);
    var one = todolist.findOne({
      owner: owner,
      no: no
    });

    if (one !== null) {
      one.done = done;
      one.todo = todo;
      one.desc = desc;
      todolist.update(one);
      return {
        status: "success",
        message: "할일 변경 성공",
        item: {
          no: one.no,
          todo: one.todo,
          desc: one.desc,
          done: one.done
        }
      };
    } else {
      return {
        status: "fail",
        message: "할일 변경 실패 : 변경하려는 데이터가 존재하지 않음"
      };
    }
  } catch (ex) {
    return {
      status: "fail",
      message: "할일 변경 실패 : " + ex
    };
  }
};

exports.updateTodo = updateTodo;

var toggleDone = function toggleDone(_ref7) {
  var owner = _ref7.owner,
      no = _ref7.no;

  try {
    no = parseInt(no);
    var one = todolist.findOne({
      owner: owner,
      no: no
    });

    if (one !== null) {
      one.done = !one.done;
      todolist.update(one);
      return {
        status: "success",
        message: "완료 변경 성공",
        item: {
          no: one.no,
          todo: one.todo,
          done: one.done
        }
      };
    } else {
      return {
        status: "fail",
        message: "완료 변경 실패 : 변경하려는 데이터가 존재하지 않음"
      };
    }
  } catch (ex) {
    return {
      status: "fail",
      message: "완료 변경 실패 : " + ex
    };
  }
};

exports.toggleDone = toggleDone;