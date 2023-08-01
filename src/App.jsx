import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/todoList";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);

  const handleToggleStatus = (index) => {
    setTaskStatus((prevStatus) =>
      prevStatus.map((status, i) =>
        i === index ? (status === "Active" ? "Done" : "Active") : status
      )
    );
  };

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setTaskStatus([...taskStatus, "Active"]);
      setNewTask("");
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    const updatedStatus = [...taskStatus];
    updatedStatus.splice(index, 1);
    setTaskStatus(updatedStatus);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="language-icons">
          <i class="fa-brands fa-html5"></i>
          <i class="fa-brands fa-css3-alt"></i>
          <i class="fa-brands fa-square-js"></i>
          <i class="fa-brands fa-react"></i>
        </div>
        <h5>my notes app</h5>
      </nav>
      <div className="app-container">
        <h1>Notes in 50</h1>
        <div className="input-container">
          <input
            className="input-text"
            type="text"
            maxLength="50"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter a new task, max 50 characters"
          />
          <input
            className="button-submit"
            onClick={handleSubmit}
            type="submit"
            value="+"
          />
        </div>

        <TodoList
          tasks={tasks}
          handleDelete={handleDelete}
          handleToggleStatus={handleToggleStatus}
          taskStatus={taskStatus}
        />
      </div>
    </div>
  );
}

export default App;
