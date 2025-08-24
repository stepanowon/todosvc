"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = exports.toggleDone = exports.getTodoList = exports.getTodoItem = exports.deleteTodo = exports.createNewOwner = exports.addTodo = void 0;
var _lokijs = _interopRequireDefault(require("lokijs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var todolist;
var id = new Date().getTime();

// let databaseInitialize= () => {
//     todolist = db.getCollection("todolist");
//     if (todolist === null) {
//         todolist = db.addCollection('todolist', { indices: ['owner','no'] });
//         //샘플 데이터
//         todolist.insert( { owner:'gdhong', no:123456789, todo:"ES6 공부", desc:"ES6공부를 해야 합니다", done:true });
//         todolist.insert( { owner:'gdhong', no:no++, todo:"Vue 학습", desc:"Vue 학습을 해야 합니다", done:false });
//         todolist.insert( { owner:'gdhong', no:no++, todo:"놀기", desc:"노는 것도 중요합니다.", done:true });
//         todolist.insert( { owner:'gdhong', no:no++, todo:"야구장", desc:"프로야구 경기도 봐야합니다.", done:false });

//         todolist.insert( { owner:'mrlee', no:no++, todo:"남원구경", desc:"고향집에 가봐야합니다.", done:true });
//         todolist.insert( { owner:'mrlee', no:no++, todo:"저녁약속(10.11)", desc:"지인과의 중요한 저녁 약속입니다.", done:false });
//         todolist.insert( { owner:'mrlee', no:no++, todo:"AWS 밋업", desc:"AWS 밋업에 반드시 참석해야 합니다.", done:false });
//         todolist.insert( { owner:'mrlee', no:no++, todo:"AAI 모임", desc:"공인강사들 모임이 있습니다.", done:true });
//     }
// }

// var db = new loki('sample.db', {
// 	autoload: true,
// 	autoloadCallback : databaseInitialize,
// 	autosave: true,
// 	autosaveInterval: 60000
// });

var cleanTodoItem = function cleanTodoItem(item) {
  var cleanItem = _objectSpread({}, item);
  delete cleanItem.meta;
  delete cleanItem["$loki"];
  delete cleanItem.owner;
  return cleanItem;
};
var db = new _lokijs["default"]();
todolist = db.getCollection("todolist");
if (todolist === null) {
  todolist = db.addCollection("todolist", {
    indices: ["owner", "id"]
  });
}
var initializeDatabase = function initializeDatabase() {
  var sampleData = [{
    owner: "gdhong",
    id: 123456789,
    todo: "ES6 공부",
    desc: "ES6공부를 해야 합니다",
    done: true
  }, {
    owner: "gdhong",
    id: ++id,
    todo: "Vue 학습",
    desc: "Vue 학습을 해야 합니다",
    done: false
  }, {
    owner: "gdhong",
    id: ++id,
    todo: "놀기",
    desc: "노는 것도 중요합니다.",
    done: true
  }, {
    owner: "gdhong",
    id: ++id,
    todo: "야구장",
    desc: "프로야구 경기도 봐야합니다.",
    done: false
  }, {
    owner: "mrlee",
    id: ++id,
    todo: "남원구경",
    desc: "고향집에 가봐야합니다.",
    done: true
  }, {
    owner: "mrlee",
    id: ++id,
    todo: "저녁약속(10.11)",
    desc: "지인과의 중요한 저녁 약속입니다.",
    done: false
  }, {
    owner: "mrlee",
    id: ++id,
    todo: "AWS 밋업",
    desc: "AWS 밋업에 반드시 참석해야 합니다.",
    done: false
  }, {
    owner: "mrlee",
    id: ++id,
    todo: "AAI 모임",
    desc: "공인강사들 모임이 있습니다.",
    done: true
  }];
  sampleData.forEach(function (data) {
    return todolist.insert(data);
  });
};
initializeDatabase();
var createNewOwner = exports.createNewOwner = function createNewOwner(_ref) {
  var owner = _ref.owner;
  try {
    var queryResult = todolist.find({
      owner: owner
    });
    var localId = new Date().getTime();
    if (queryResult.length === 0) {
      todolist.insert({
        owner: owner,
        id: localId,
        todo: "ES6 공부",
        desc: "ES6공부를 해야 합니다",
        done: true
      });
      todolist.insert({
        owner: owner,
        id: localId + 1,
        todo: "Vue 학습",
        desc: "React 학습을 해야 합니다",
        done: false
      });
      todolist.insert({
        owner: owner,
        id: localId + 2,
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
var getTodoList = exports.getTodoList = function getTodoList(_ref2) {
  var owner = _ref2.owner;
  try {
    var queryResult = todolist.chain().find({
      owner: owner
    }).simplesort("id").data();
    return queryResult.map(cleanTodoItem);
  } catch (ex) {
    return {
      status: "fail",
      message: "조회 실패 : " + ex
    };
  }
};
var getTodoItem = exports.getTodoItem = function getTodoItem(_ref3) {
  var owner = _ref3.owner,
    id = _ref3.id;
  try {
    var parsedId = parseInt(id, 10);
    var one = todolist.findOne({
      owner: owner,
      id: parsedId
    });
    if (!one) {
      return {
        status: "fail",
        message: "조회 실패 : 데이터가 존재하지 않음"
      };
    }
    return cleanTodoItem(one);
  } catch (ex) {
    return {
      status: "fail",
      message: "조회 실패 : " + ex
    };
  }
};
var addTodo = exports.addTodo = function addTodo(_ref4) {
  var owner = _ref4.owner,
    todo = _ref4.todo,
    desc = _ref4.desc;
  try {
    if (!todo || todo.trim() === "") {
      throw new Error("할일을 입력하셔야 합니다.");
    }
    var item = {
      owner: owner,
      id: new Date().getTime(),
      todo: todo.trim(),
      desc: desc || "",
      done: false
    };
    todolist.insert(item);
    return {
      status: "success",
      message: "추가 성공",
      item: {
        id: item.id,
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
var deleteTodo = exports.deleteTodo = function deleteTodo(_ref5) {
  var owner = _ref5.owner,
    id = _ref5.id;
  try {
    var parsedId = parseInt(id, 10);
    var one = todolist.findOne({
      owner: owner,
      id: parsedId
    });
    if (!one) {
      return {
        status: "fail",
        message: "삭제 실패 : 삭제하려는 데이터가 존재하지 않음"
      };
    }
    todolist.remove(one);
    return {
      status: "success",
      message: "삭제 성공",
      item: {
        id: one.id,
        todo: one.todo
      }
    };
  } catch (ex) {
    return {
      status: "fail",
      message: "삭제 실패 : " + ex
    };
  }
};
var updateTodo = exports.updateTodo = function updateTodo(_ref6) {
  var owner = _ref6.owner,
    id = _ref6.id,
    todo = _ref6.todo,
    desc = _ref6.desc,
    done = _ref6.done;
  try {
    var parsedId = parseInt(id, 10);
    var one = todolist.findOne({
      owner: owner,
      id: parsedId
    });
    if (!one) {
      return {
        status: "fail",
        message: "할일 변경 실패 : 변경하려는 데이터가 존재하지 않음"
      };
    }
    if (todo !== undefined) one.todo = todo.trim();
    if (desc !== undefined) one.desc = desc;
    if (done !== undefined) one.done = done;
    todolist.update(one);
    return {
      status: "success",
      message: "할일 변경 성공",
      item: {
        id: one.id,
        todo: one.todo,
        desc: one.desc,
        done: one.done
      }
    };
  } catch (ex) {
    return {
      status: "fail",
      message: "할일 변경 실패 : " + ex
    };
  }
};
var toggleDone = exports.toggleDone = function toggleDone(_ref7) {
  var owner = _ref7.owner,
    id = _ref7.id;
  try {
    var parsedId = parseInt(id, 10);
    var one = todolist.findOne({
      owner: owner,
      id: parsedId
    });
    if (!one) {
      return {
        status: "fail",
        message: "완료 변경 실패 : 변경하려는 데이터가 존재하지 않음"
      };
    }
    one.done = !one.done;
    todolist.update(one);
    return {
      status: "success",
      message: "완료 변경 성공",
      item: {
        id: one.id,
        todo: one.todo,
        done: one.done
      }
    };
  } catch (ex) {
    return {
      status: "fail",
      message: "완료 변경 실패 : " + ex
    };
  }
};