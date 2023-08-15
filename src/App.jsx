import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/todoList";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const storedTaskStatus = localStorage.getItem("taskStatus");

      console.log("Retrieved tasks:", storedTasks);
      console.log("Retrieved taskStatus:", storedTaskStatus);

      if (storedTasks && storedTaskStatus) {
        setTasks(JSON.parse(storedTasks));
        setTaskStatus(JSON.parse(storedTaskStatus));
      }
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
    }
  }, []);

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
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });

    setTaskStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus.splice(index, 1);
      return updatedStatus;
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  }, [tasks, taskStatus]);
  // console.log(storedTaskStatus);

  return (
    <div>
      <nav className="navbar">
        <div className="language-icons">
          <i className="fa-brands fa-html5"></i>
          <i className="fa-brands fa-css3-alt"></i>
          <i className="fa-brands fa-square-js"></i>
          <i className="fa-brands fa-react fa-spin"></i>
        </div>
        <h5>my notes app</h5>
      </nav>
      <div className="app-container">
        <h1>Add to memory..</h1>
        <div className="input-container">
          <input
            className="input-text"
            type="text"
            maxLength="50"
            value={newTask}
            onChange={handleInputChange}
            placeholder="max 50 characters..."
          />

          <input
            className="button-submit"
            onClick={handleSubmit}
            type="submit"
            value="+"
          />
        </div>
        <h3>Memory..</h3>

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
