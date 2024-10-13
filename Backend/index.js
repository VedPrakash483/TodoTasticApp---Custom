const express =require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {createTodo, updateTodo } = require('./types')
const { todo } = require('./db')


app.use(express.json())

app.get("/todos", async (req, res)=> {          
    const todo = await todo.find();
    res.status(200).json({
        todos: todo
    })
})

app.post("/todos", async (req, res)=> {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        req.status(411).json({
            msg: "You sent the wrong inputs"
        })

        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo Created!"
    })
})

app.put("/completed", async (req, res)=> {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        req.status(411).json({
            msg: "You sent the wrong inputs"
        })

        return;
    }
    await todo.update({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "Todo Updated!"
    })
})