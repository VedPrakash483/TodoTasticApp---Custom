import './Todo.css'; // Optional: Create a CSS file for styling

const Todo = ({ title, description, completed, onComplete}) => {
    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onComplete} disabled={completed}>
                {completed ? 'Completed' : 'Complete'}
            </button>
        </div>
    );
};

export default Todo;
