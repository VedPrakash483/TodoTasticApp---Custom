const express =require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {createTodo, updateTodo } = require('./types')
const { todo } = require('./db')
const cors = require('cors')
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.get("/todos", async (req, res)=> {          
    const todos = await todo.find();
    res.status(200).json({
        todos
    })
})

app.post("/todos", async (req, res)=> {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
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
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })

        return;
    }
    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })
    setTimeout( async () => {
        await todo.deleteOne({
            _id: req.body.id
        })
    }, 1000)
    res.json({
        msg: "Todo Updated!"
    })
})
app.delete("/todos/:id", async (req, res)=> {

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});