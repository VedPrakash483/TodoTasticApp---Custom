import { useState } from 'react';
import '../App.css'; // Ensure you import the CSS file

export function CreateTodo({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json" // Corrected header
                }
            });

            const json = await response.json();
            if (response.ok) {
                onAdd({ _id: json._id, title, description, completed: false });
                alert("Todo Created");
                setTitle(""); // Clear title input
                setDescription(""); // Clear description input
            } else {
                alert(json.msg || "Error creating todo");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the todo.");
        }
    };

    return (
        <div className="create-todo-container">
            <h2 className="create-todo-title">Create a New Todo</h2>
            <input
                className="todo-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br />
            <input
                className="todo-input"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br /><br />
            <button className="create-todo-button" onClick={handleSubmit}>Create Todo</button>
        </div>
    );
}
