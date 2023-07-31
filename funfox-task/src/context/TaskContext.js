import React, { createContext, useState, useEffect, useContext } from "react";
const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    // Simulate user login and set the user's group
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserGroup(currentUser.group);
    }
  }, []);

  const getGroupTasks = group => {
    // Simulate API call with delay
    return new Promise(resolve => {
      setTimeout(() => {
        const groupTasks = JSON.parse(
          localStorage.getItem(`groupTasks_${group}`)
        );
        resolve(groupTasks || []);
      }, 500); // Delay of 500ms to simulate API response time
    });
  };

  const saveGroupTasks = (group, tasks) => {
    // Simulate API call with delay
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem(`groupTasks_${group}`, JSON.stringify(tasks));
        resolve(true);
      }, 500); // Delay of 500ms to simulate API response time
    });
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from the API whenever the userGroup changes
    if (userGroup) {
      getGroupTasks(userGroup).then(groupTasks => {
        setTasks(groupTasks);
      });
    }
  }, [userGroup]);

  const addTask = newTask => {
    // Add task locally
    const updatedTasks = [
      ...tasks,
      { ...newTask, id: tasks.length + 1, completed: false },
    ];
    setTasks(updatedTasks);

    // Save tasks to the API
    saveGroupTasks(userGroup, updatedTasks);
  };

  const toggleComplete = taskId => {
    // Toggle task completion locally
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Save tasks to the API
    saveGroupTasks(userGroup, updatedTasks);
  };

  const deleteTask = taskId => {
    // Delete task locally
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);

    // Save tasks to the API
    saveGroupTasks(userGroup, updatedTasks);
  };

  const handleLogin =( email,group) => {
    // Simulate user login and save the group in localStorage
    localStorage.setItem("currentUser", JSON.stringify({email, group }));
    setUserGroup(group);
  };

  const handleLogout = () => {
    // Simulate user logout and remove group data from localStorage
    localStorage.removeItem("currentUser");
    setUserGroup(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleComplete,
        deleteTask,
        userGroup,
        setTasks,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
