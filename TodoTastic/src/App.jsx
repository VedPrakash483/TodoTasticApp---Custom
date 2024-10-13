import { useEffect, useState } from 'react';
import { CreateTodo } from "./components/CreateTodo";
import Todo from './components/TODO.JSX';
// In index.js or App.jsx
import './index.css';
import './App.css';


const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:3000/todos');
                const data = await response.json();
                setTodos(data.todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
        
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

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
            }
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    };

    return (
        <div className="app-container">
            <h1>Todo App</h1>
            <CreateTodo onAdd={addTodo} />
            <div className="todos-list">
                {todos.map(todo => (
                    <Todo 
                        key={todo._id} 
                        title={todo.title} 
                        description={todo.description} 
                        completed={todo.completed} 
                        onComplete={() => completeTodo(todo._id)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
