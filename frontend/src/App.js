import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import Confetti from 'react-confetti';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css';

Chart.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [coins, setCoins] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
      const completed = res.data.filter((t) => t.completed).length;
      setCoins(completed * 10); // 10 coins per completed task
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (payload) => {
    try {
      await createTask(payload);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateTask(id, payload);
      setEditing(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

const handleDelete = async (task) => {
  if (!window.confirm(`Delete task "${task.title}"?`)) return;
  try {
    await deleteTask(task._id);
    fetchTasks();
  } catch (err) {
    console.error(err);
  }
};


  const handleToggleComplete = async (task) => {
    const updated = { ...task, completed: !task.completed };
    await handleUpdate(task._id, updated);

    if (updated.completed) {
      setShowConfetti(true);
      setMessage(`🎉 Congratulations! You earned 10 coins for completing "${task.title}"!`);
      setTimeout(() => {
        setShowConfetti(false);
        setMessage('');
      }, 3000);
    }
  };

  // Chart data
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedCount, pendingCount],
        backgroundColor: ['#4CAF50', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      {showConfetti && <Confetti />}
      <Header coins={coins} />
      {message && <div className="motivation">{message}</div>}
      <main>
        <div className="left">
          <TaskForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            editing={editing}
            cancelEdit={() => setEditing(null)}
          />
          <Dashboard tasks={tasks} />
        </div>

        <div className="right">
          <TaskList
            tasks={tasks}
            onEdit={(t) => setEditing(t)}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />


        </div>
      </main>
    </div>
  );
}
