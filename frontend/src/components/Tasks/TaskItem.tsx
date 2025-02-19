import React from 'react';
import axios from 'axios';
import { Task } from '../../interfaces/Task';

interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3001/tasks/${task.id}`, {
      headers: { Authorization: token }
    });
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
  };

  const handleToggleComplete = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3001/tasks/${task.id}`, 
      { ...task, completed: !task.completed }, 
      { headers: { Authorization: token } });
    setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? { ...task, completed: !task.completed } : t)));
  };

  return (
    <div>
      <input type="checkbox" checked={task.completed} onChange={handleToggleComplete} />
      {task.title}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
