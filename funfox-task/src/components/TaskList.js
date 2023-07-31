import React, { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = () => {
  const { tasks, userGroup } = useTaskContext();

  useEffect(() => {
    // Added a class for fade-in animation on task addition
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item) => {
      item.classList.add('entering');
      setTimeout(() => item.classList.remove('entering'), 500);
    });
  }, [tasks]);

  return (
    <div className="task-list">
      {userGroup&&tasks.map((task, index) => (
        <div key={task?.id}>
          <TaskItem task={task} index={index} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;

