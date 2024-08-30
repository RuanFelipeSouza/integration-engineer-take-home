import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { baseUrl } from "../constants";
import api from "../config/axiosConfig";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`${baseUrl}/tasks`);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const handleCreateTask = async () => {
    if (!title || !description) {
      let errorMessage = "The following fields are required: ";
      if (!title) errorMessage += "Title";
      if (!description) errorMessage += (!title ? " and " : "") + "Description";
      setError(errorMessage);
      return;
    }

    try {
      const response = await api.post(`${baseUrl}/tasks`, {
        title,
        description,
      });
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
      setError(null);
    } catch (error: any) {
      console.error("Error creating task:", error);
      setError(
        "Failed to create task: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`${baseUrl}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      setExpandedTaskIds(expandedTaskIds.filter((taskId) => taskId !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
  };

  const handleUpdateTask = async () => {
    if (!title || !description) {
      let errorMessage = "The following fields are required: ";
      if (!title) errorMessage += "Title";
      if (!description) errorMessage += (!title ? " and " : "") + "Description";
      setError(errorMessage);
      return;
    }

    try {
      const response = await api.put(`${baseUrl}/tasks/${editTaskId}`, {
        title,
        description,
      });
      setTasks(
        tasks.map((task) => (task.id === editTaskId ? response.data : task))
      );
      setTitle("");
      setDescription("");
      setEditTaskId(null);
      setError(null);
    } catch (error: any) {
      console.error("Error updating task:", error);
      setError(
        "Failed to update task: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  const handleShowMore = (id: number) => {
    setExpandedTaskIds(
      expandedTaskIds.includes(id)
        ? expandedTaskIds.filter((taskId) => taskId !== id)
        : [...expandedTaskIds, id]
    );
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };

  return (
    <div className="container">
      <h1>Task Management App</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-form">
        <h2>{editTaskId ? "Edit Task" : "Create Task"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={editTaskId ? handleUpdateTask : handleCreateTask}>
          {editTaskId ? "Update Task" : "Create Task"}
        </button>
      </div>
      <div className="task-list">
        <h2>Existing Tasks</h2>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                <div className="task-item">
                  <h3>{task.title}</h3>
                  <p>
                    {expandedTaskIds.includes(task.id)
                      ? task.description
                      : truncateText(task.description, 100)}
                  </p>
                  <div className="task-buttons">
                    <button onClick={() => handleShowMore(task.id)}>
                      {expandedTaskIds.includes(task.id)
                        ? "Show Less"
                        : "Show More"}
                    </button>
                    <button onClick={() => handleEditTask(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
