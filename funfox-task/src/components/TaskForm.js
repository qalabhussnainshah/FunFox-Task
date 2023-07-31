import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("Group A");
  const { addTask, userGroup, handleLogin, handleLogout } = useTaskContext();

  const handleLoginClick = () => {
    if (!email.trim() || !group) {
      toast.error("Please enter an email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    handleLogin(email, group);
    toast.success(`Logged in to ${group} successfully!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleLogoutClick = () => {
    handleLogout();
    setGroup("Group A");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    const newTask = { title, description };
    addTask(newTask);

    toast.success("Task added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form-container">
      {!userGroup ? (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginClick}>
            <input
              className="input-field"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <select
              className="select-group"
              required
              value={group}
              onChange={e => setGroup(e.target.value)}
            >
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Group C">Group C</option>
            </select>
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="add-task-form">
          <h2 className="welcome-text">{`Welcome to ${userGroup}`}</h2>
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button type="submit" className="login-button">
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
