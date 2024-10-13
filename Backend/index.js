const express =require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {createTodo, updateTodo } = require('../types.js')


app.use(express.json())

app.get("/todos", (req, res)=> {

})

app.post("/todos", (req, res)=> {
    
})

app.post("/completed", (req, res)=> {
    
})