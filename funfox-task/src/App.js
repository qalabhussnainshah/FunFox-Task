import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify"; // Imported the ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Imported the CSS for toast notifications
import "./App.css";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        <div className="app">
          <h1 className="title">FunFox Task</h1>
          <TaskForm />
          <TaskList />
          <ToastContainer position="top-right" />{" "}
        </div>
      </TaskProvider>
    </DndProvider>
  );
};

export default App;
