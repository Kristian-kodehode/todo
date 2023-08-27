import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const storedTasks = localStorage.getItem("tasks");
  const storedTaskStatus = localStorage.getItem("taskStatus");

  useEffect(() => {
    try {
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

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        status: "Active",
      };
      setTasks([...tasks, newTaskObject]);
      setTaskStatus([...taskStatus, "Active"]);
      setNewTask("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleToggleStatus = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      setTaskStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === taskIndex ? (status === "Active" ? "Done" : "Active") : status
        )
      );
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskTextChange = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setTaskStatus((prevStatus) =>
      prevStatus.filter((status, index) => tasks[index]?.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  }, [tasks, taskStatus]);

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
            onKeyDown={handleKeyPress}
            placeholder="max 50 characters..."
          />

          <input
            className="button-submit"
            onClick={handleSubmit}
            type="submit"
            value="+"
          />
        </div>
        {tasks.length > 0 ? (
          <h3>Memories active: {tasks.length}</h3>
        ) : (
          <h3>Memory empty..</h3>
        )}

        {tasks.map((task) => {
          const taskIndex = tasks.findIndex((t) => t.id === task.id);
          return (
            <div key={task.id} className="task-container">
              <textarea
                className="task-text"
                id=""
                maxLength="50"
                defaultValue={task.text}
                onChange={(event) =>
                  handleTaskTextChange(task.id, event.target.value)
                }
              ></textarea>
              <button
                className={`button-edit ${
                  taskStatus[taskIndex] === "Done" ? "done" : ""
                }`}
                onClick={() => handleToggleStatus(task.id)}
              >
                {taskStatus[taskIndex] === "Active" ? "Active" : "Done"}
              </button>
              {taskStatus[taskIndex] === "Done" && (
                <button
                  className="button-delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
