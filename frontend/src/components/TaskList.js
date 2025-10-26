import React, { useState, useEffect } from "react";
import "./TaskList.css";
import Calendar from "react-calendar";
import { Pie } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksOnDate, setTasksOnDate] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update tasks for selected date
  useEffect(() => {
    const filtered = tasks.filter(
      (t) => new Date(t.dueDate).toDateString() === selectedDate.toDateString()
    );
    setTasksOnDate(filtered);
  }, [selectedDate, tasks]);

  const formatTaskCardClass = (task) => {
    if (task.completed) return "task-card completed";
    if (new Date(task.dueDate) < new Date()) return "task-card overdue";
    return "task-card";
  };

  // Filter tasks based on search
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && !t.completed
  ).length;

  // Pie chart data
  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#4CAF50", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="tasklist-container">
      {/* Left Column */}
      <div className="tasklist-left">
        <h2>Tasks Dashboard</h2>

        {/* Dashboard Panel: Stats + Pie Chart */}
        <div className="dashboard-panel">
          <div className="task-stats">
            <span className="stat total">🗂 Total: {totalTasks}</span>
            <span className="stat completed">✅ Completed: {completedTasks}</span>
            <span className="stat pending">⏳ Pending: {pendingTasks}</span>
            <span className="stat overdue">⚠️ Overdue: {overdueTasks}</span>
          </div>

          <div className="pie-section">
            <h3>Progress</h3>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="task-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Task List */}
        {filteredTasks.length === 0 && <p className="empty">No tasks found.</p>}
        {filteredTasks.map((task) => (
          <div key={task._id} className={formatTaskCardClass(task)}>
            <div className="task-info">
              <h3>
                {task.title}
                {task.priority && <span className={`priority ${task.priority}`}></span>}
              </h3>
              <p>{task.subject}</p>
              <p>{task.description}</p>
              <p className="due-date">{task.dueDate?.split("T")[0]}</p>
            </div>
            <div className="task-actions">
              <button className="complete-btn" onClick={() => onToggleComplete(task)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(task)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Calendar */}
      <div className="tasklist-right">
        <h3>📅 Calendar</h3>
        <Calendar onChange={setSelectedDate} value={selectedDate} />

        {tasksOnDate.length > 0 && (
          <div className="tasks-popup">
            <h4>Tasks on {selectedDate.toDateString()}:</h4>
            {tasksOnDate.map((task) => (
              <div key={task._id} className="popup-task">
                <strong>{task.title}</strong> - {task.subject}
                {task.priority && <span className={`priority ${task.priority}`}></span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
