import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Task } from '../../interfaces/Task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/tasks', {
        headers: { Authorization: token }
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm setTasks={setTasks} />
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default TaskList;
