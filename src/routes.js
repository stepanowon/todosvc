import { addTodo,deleteTodo,updateTodo,toggleDone,getTodoItem, getTodoList,createNewOwner } from './tododao';
import sleep from 'system-sleep';

export default (app) => { 

    app.get('/', (req, res) => {
        console.log("### GET /");
        res.render('index', {
             title: 'todolist 서비스 v1.0',
             subtitle : '(node.js + express + lokijs)'
        })
    });

    app.get('/todolist/:owner/create', (req, res) => {
        console.log("### GET /todolist/:owner/create");
        const { owner } = req.params;
        const result = createNewOwner({ owner });
        res.json(result)
    });

    app.get('/todolist/:owner', (req, res) => {
        console.log("### GET /todolist/:owner");
        const owner = req.params.owner;
        const todolist = getTodoList({ owner });
        res.json(todolist)
    });
    app.get('/todolist_long/:owner', (req, res) => {
        console.log("### GET /todolist_long/:owner");
        sleep(1000);
        const owner = req.params.owner;
        const todolist = getTodoList({ owner });
        res.json(todolist)
    });

    app.get('/todolist/:owner/:no', (req, res) => {
        console.log("### GET /todolist/:owner/:no");
        const { owner, no } = req.params;
        const todoitem = getTodoItem({ owner, no });
        res.json(todoitem)
    });
    app.get('/todolist_long/:owner/:no', (req, res) => {
        console.log("### GET /todolist_long/:owner/:no");
        sleep(1000);
        const { owner, no } = req.params;
        const todoitem = getTodoItem({ owner, no });
        res.json(todoitem)
    });

    app.post('/todolist/:owner', (req,res)=>{
        console.log("### POST /todolist/:owner");
        const { owner } = req.params;
        let { todo, desc } = req.body;
        const result = addTodo({ owner, todo, desc });
        res.json(result);
    })

    app.post('/todolist_long/:owner', (req,res)=>{
        console.log("### POST /todolist_long/:owner");
        sleep(1000);
        const { owner } = req.params;
        let { todo, desc } = req.body;
        const result = addTodo({ owner, todo, desc });
        res.json(result);
    })

    app.put('/todolist/:owner/:no', (req,res)=>{
        console.log("### PUT /todolist/:owner/:no");
        const { owner, no } = req.params;
        let { todo, done, desc } = req.body;
        const result = updateTodo({ owner, no, todo, done, desc });
        res.json(result);
    })

    app.put('/todolist_long/:owner/:no', (req,res)=>{
        console.log("### PUT /todolist_long/:owner/:no");
        sleep(1000);
        const { owner, no } = req.params;
        let { todo, done, desc } = req.body;
        const result = updateTodo({ owner, no, todo, done, desc });
        res.json(result);
    })

    app.put('/todolist/:owner/:no/done', (req,res)=>{
        console.log("### PUT /todolist/:owner/:no/done");
        const { owner, no } = req.params;
        const result = toggleDone({ owner, no });
        res.json(result);
    })

    app.put('/todolist_long/:owner/:no/done', (req,res)=>{
        console.log("### PUT /todolist_long/:owner/:no/done");
        sleep(1000);
        const { owner, no } = req.params;
        const result = toggleDone({ owner, no });
        res.json(result);
    })

    app.delete('/todolist/:owner/:no', (req,res)=>{
        console.log("### DELETE /todolist/:owner/:no");
        const { owner, no } = req.params;
        const result = deleteTodo({ owner, no });
        res.json(result);
    })

    app.delete('/todolist_long/:owner/:no', (req,res)=>{
        console.log("### DELETE /todolist_long/:owner/:no");
        sleep(1000);
        const { owner, no } = req.params;
        const result = deleteTodo({ owner, no });
        res.json(result);
    })
    
    //----에러 처리 시작
    app.get('*', (req, res, next) => {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        console.log("### ERROR!!")
        if(err.status === 404) {
            res.status(404).json({ status:404, message:"잘못된 URI 요청"});
        } else if (err.status === 500) {
            res.status(500).json({ status:500, message:"내부 서버 오류"});
        } else {
            res.status(err.status).jsonp({ status:"fail", message:err.message });
        }
    });
}
