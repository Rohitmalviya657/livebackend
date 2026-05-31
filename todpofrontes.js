import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/todos");
            setTodos(res.data);
        } catch (err) {
            alert("Error fetching tasks");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/todos/${editId}`, { task });
                setEditId(null);
            } else {
                await axios.post("http://localhost:5000/api/todos", { task });
            }
            setTask("");
            fetchTodos();
        } catch (err) {
            alert("Error saving task");
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            fetchTodos();
        } catch (err) {
            alert("Error deleting task");
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/todos/${id}`, { status: !currentStatus });
            fetchTodos();
        } catch (err) {
            alert("Error updating status");
        }
    };

    const startEdit = (todo) => {
        setTask(todo.task);
        setEditId(todo._id);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Todo List</h2>
            <input
                type="text"
                placeholder="Enter Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span
                            style={{
                                textDecoration: todo.status ? "line-through" : "none",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleStatus(todo._id, todo.status)}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => startEdit(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
