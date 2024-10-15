import { useEffect, useState } from 'react';
import { CreateTodo } from "./components/CreateTodo";
import Todo from './components/Todo.jsx'; // Ensure correct file casing
import './index.css';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);

    // Fetch todos on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:3000/todos');
                const data = await response.json();
                setTodos(data.todos || []); // Ensure todos is an array
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
        
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    // Add new todo
    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]); // Append new todo
    };

    // Mark todo as completed
    const completeTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/completed`, {
                method: "PUT",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                setTodos((prevTodos) => 
                    prevTodos.map(todo => 
                        todo._id === id ? { ...todo, completed: true } : todo
                    )
                );
                deleteTodo(id);
            }
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    };

    // Delete todo with a delay after marking it complete
    const deleteTodo = async (id) => {
        try {
            // Delay deletion by 5 seconds
            setTimeout(() => {
                setTodos((prevTodos) => 
                    prevTodos.filter(todo => todo._id !== id)
                );
            }, 5000); // 5-second delay before deletion
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="app-container">
            <h1>Todo App</h1>
            <CreateTodo onAdd={addTodo} />
            <div className="todos-list">
                {todos.map(todo => (
                    <Todo 
                        key={todo._id} // Ensure unique key
                        title={todo.title} 
                        description={todo.description} 
                        completed={todo.completed} 
                        onComplete={() => completeTodo(todo._id)} // Mark as complete
                        // onDelete={() => deleteTodo(todo._id)} // Delete after 5 seconds
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
