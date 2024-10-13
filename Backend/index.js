const express =require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {createTodo, updateTodo } = require('./types')


app.use(express.json())

app.get("/todos", (req, res)=> {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        req.status(411).json({
            msg: "You sent the wrong inputs"
        })

        return;
    }
})

app.post("/todos", (req, res)=> {
    
})

app.put("/completed", (req, res)=> {
    const createPayload = req.body;
    const parsePayload = updateTodo.safeParse(createPayload);
    if(!parsePayload.success){
        req.status(411).json({
            msg: "You sent the wrong inputs"
        })

        return;
    }
})