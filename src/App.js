import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  getAllToDos,
  createToDo,
  deleteToDo,
  clearAllToDos,
  upDateToDos,
} from "../TooDolist";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchToDos() {
      const todos = await getAllToDos();
      setTasks(todos);
    }
    fetchToDos();
  }, []);

  const addTask = async () => {
    if (input.trim()) {
      const newTask = { label: input, done: false };
      const createdTask = await createToDo("chriskeith01", newTask);
      setTasks([...tasks, { ...createdTask, isCompleted: createdTask.done }]);
      setInput("");
    }
  };

  const toggleCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, done: !task.done };
    await upDateToDos(task.id, updatedTask);
    const newTasks = [...tasks];
    newTasks[index].isCompleted = updatedTask.done;
    setTasks(newTasks);
  };

  const deleteTask = async (index) => {
    const task = tasks[index];
    await deleteToDo(task.id);
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="ToDoList" style={{ position: "relative" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.isCompleted ? "completed" : ""}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.label}
            <button onClick={() => toggleCompletion(index)}>
              {task.isCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="counter">
        Total Tasks: {tasks.length} | Completed: {completedTasksCount}
      </div>
    </div>
  );
}

export default ToDoList;
