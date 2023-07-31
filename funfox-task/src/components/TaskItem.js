import React from "react";
import { useTaskContext } from "../context/TaskContext";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/TaskItem.css";

const TaskItem = ({ task, index }) => {
  const { toggleComplete, deleteTask, tasks, setTasks } = useTaskContext();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "TASK",
    hover: draggedItem => {
      if (draggedItem.index === index) {
        return;
      }

      const newTasks = Array.from(tasks);
      const [removed] = newTasks.splice(draggedItem.index, 1);
      newTasks.splice(index, 0, removed);

      setTasks(newTasks);
    },
  }));

  const handleComplete = () => {
    toggleComplete(task.id);
    // Complete task
    toast.info(
      `Task marked as ${task.completed ? "incomplete" : "completed"}!`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      }
    );
  };

  const handleDelete = () => {
    deleteTask(task.id);
    toast.error("Task deleted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      ref={node => drag(drop(node))}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="button-container">
        <button onClick={handleComplete}>
          {task.completed ? "Incomplete" : "Complete"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
