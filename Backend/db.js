const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vedp7952:Ved32803@cluster0.x9dxn.mongodb.net/")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo: todo
}