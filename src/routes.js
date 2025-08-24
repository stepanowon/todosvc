import { 
  addTodo, 
  deleteTodo, 
  updateTodo, 
  toggleDone, 
  getTodoItem, 
  getTodoList, 
  createNewOwner 
} from "./tododao.js";
import sleep from "sleep-promise";

// 공통 핸들러 함수들
const createAsyncHandler = (handler, delay = 0) => {
  return delay > 0 
    ? (req, res) => sleep(delay).then(() => handler(req, res))
    : handler;
};

const logRequest = (method, path) => {
  console.log(`### ${method} ${path}`);
};

// 라우터 함수
export default (app) => {
  // 홈 페이지
  app.get("/", (req, res) => {
    logRequest('GET', '/');
    res.render("index", {
      title: "todolist 서비스 v1.0",
      subtitle: "(node.js + express + lokijs)",
    });
  });

  // 사용자 정보 조회 (예제용)
  const getUserHandler = (req, res) => {
    logRequest('GET', '/users/:id');
    const { id } = req.params;
    res.json({ id, userid: "gdhong", username: "홍길동" });
  };

  app.get("/users/:id", createAsyncHandler(getUserHandler, 3000));

  // 새 오너 생성
  app.get("/todolist/:owner/create", (req, res) => {
    logRequest('GET', '/todolist/:owner/create');
    const { owner } = req.params;
    const result = createNewOwner({ owner });
    res.json(result);
  });

  // 할일 목록 조회
  const getTodoListHandler = (req, res) => {
    const { owner } = req.params;
    const todolist = getTodoList({ owner });
    res.json(todolist);
  };

  app.get("/todolist/:owner", (req, res) => {
    logRequest('GET', '/todolist/:owner');
    getTodoListHandler(req, res);
  });

  app.get("/todolist_long/:owner", (req, res) => {
    logRequest('GET', '/todolist_long/:owner');
    createAsyncHandler(getTodoListHandler, 1000)(req, res);
  });

  // 할일 항목 조회
  const getTodoItemHandler = (req, res) => {
    const { owner, id } = req.params;
    const todoitem = getTodoItem({ owner, id });
    res.json(todoitem);
  };

  app.get("/todolist/:owner/:id", (req, res) => {
    logRequest('GET', '/todolist/:owner/:id');
    getTodoItemHandler(req, res);
  });

  app.get("/todolist_long/:owner/:id", (req, res) => {
    logRequest('GET', '/todolist_long/:owner/:id');
    createAsyncHandler(getTodoItemHandler, 1000)(req, res);
  });

  // 할일 추가
  const addTodoHandler = (req, res) => {
    const { owner } = req.params;
    const { todo, desc } = req.body;
    const result = addTodo({ owner, todo, desc });
    res.json(result);
  };

  app.post("/todolist/:owner", (req, res) => {
    logRequest('POST', '/todolist/:owner');
    addTodoHandler(req, res);
  });

  app.post("/todolist_long/:owner", (req, res) => {
    logRequest('POST', '/todolist_long/:owner');
    createAsyncHandler(addTodoHandler, 1000)(req, res);
  });

  // 할일 수정
  const updateTodoHandler = (req, res) => {
    const { owner, id } = req.params;
    const { todo, done, desc } = req.body;
    const result = updateTodo({ owner, id, todo, done, desc });
    res.json(result);
  };

  app.put("/todolist/:owner/:id", (req, res) => {
    logRequest('PUT', '/todolist/:owner/:id');
    updateTodoHandler(req, res);
  });

  app.put("/todolist_long/:owner/:id", (req, res) => {
    logRequest('PUT', '/todolist_long/:owner/:id');
    createAsyncHandler(updateTodoHandler, 1000)(req, res);
  });

  // 할일 완료 상태 토글
  const toggleDoneHandler = (req, res) => {
    const { owner, id } = req.params;
    const result = toggleDone({ owner, id });
    res.json(result);
  };

  app.put("/todolist/:owner/:id/done", (req, res) => {
    logRequest('PUT', '/todolist/:owner/:id/done');
    toggleDoneHandler(req, res);
  });

  app.put("/todolist_long/:owner/:id/done", (req, res) => {
    logRequest('PUT', '/todolist_long/:owner/:id/done');
    createAsyncHandler(toggleDoneHandler, 1000)(req, res);
  });

  // 할일 삭제
  const deleteTodoHandler = (req, res) => {
    const { owner, id } = req.params;
    const result = deleteTodo({ owner, id });
    res.json(result);
  };

  app.delete("/todolist/:owner/:id", (req, res) => {
    logRequest('DELETE', '/todolist/:owner/:id');
    deleteTodoHandler(req, res);
  });

  app.delete("/todolist_long/:owner/:id", (req, res) => {
    logRequest('DELETE', '/todolist_long/:owner/:id');
    createAsyncHandler(deleteTodoHandler, 1000)(req, res);
  });

  // 에러 처리 미들웨어
  app.use((err, req, res, next) => {
    console.log("### ERROR!!");
    
    const errorResponses = {
      404: { status: 404, message: "잘못된 URI 요청" },
      500: { status: 500, message: "내부 서버 오류" }
    };
    
    const response = errorResponses[err.status] || 
      { status: "fail", message: err.message };
    
    res.status(err.status || 500).json(response);
  });
};