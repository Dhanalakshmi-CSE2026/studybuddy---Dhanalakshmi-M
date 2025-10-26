import React from 'react';
import './TaskCard.css';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—';

  return (
    <div className={`task-card ${task.completed ? 'done' : ''} ${new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : ''}`}>
      <div className="card-top">
        <h4>{task.title}</h4>
        <div className="meta">
          {task.pomodoroEstimate && <span className="pom">🍅 {task.pomodoroEstimate}</span>}
          <span className="due">Due: {due}</span>
        </div>
      </div>

      {task.priority && <div className={`priority-tag ${task.priority}`}>{task.priority}</div>}

      <p className="desc">{task.description}</p>

      <div className="card-actions">
        <button className="complete-btn" onClick={() => onToggleComplete(task)}>
          <FaCheck /> {task.completed ? 'Undo' : 'Done'}
        </button>
        <button className="edit-btn" onClick={() => onEdit(task)}>
          <FaEdit /> Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
