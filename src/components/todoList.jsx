import { useState } from "react";

const TodoList = ({ tasks, handleDelete, handleToggleStatus, taskStatus }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index} className="task-container">
          <textarea className="task-text" id="" maxLength="50">
            {task}
          </textarea>
          <button
            className={`button-edit ${
              taskStatus[index] === "Done" ? "done" : ""
            }`}
            onClick={() => handleToggleStatus(index)}
          >
            {taskStatus[index] === "Active" ? "Active" : "Done"}
          </button>
          <button className="button-delete" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
