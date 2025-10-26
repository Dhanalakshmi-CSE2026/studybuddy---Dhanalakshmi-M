import React, { useEffect, useState } from 'react';
import './TaskForm.css';

const empty = { title: '', subject: '', description: '', dueDate: '', pomodoroEstimate: 1 };

export default function TaskForm({ onCreate, onUpdate, editing, cancelEdit }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        subject: editing.subject || '',
        description: editing.description || '',
        dueDate: editing.dueDate ? editing.dueDate.split('T')[0] : '',
        pomodoroEstimate: editing.pomodoroEstimate || 1,
        _id: editing._id
      });
    } else setForm(empty);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      subject: form.subject,
      description: form.description,
      dueDate: form.dueDate || null,
      pomodoroEstimate: Number(form.pomodoroEstimate) || 1,
    };

    if (form._id) {
      onUpdate(form._id, payload); // send ID separately, payload clean
    } else {
      onCreate(payload);
    }

    setForm(empty);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{form._id ? 'Edit Task' : 'Add Task'}</h2>

      <input
        required
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Subject (e.g., Math)"
        value={form.subject}
        onChange={e => setForm({ ...form, subject: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <div className="row">
        <input
          type="date"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
        />
        <input
          type="number"
          min="1"
          value={form.pomodoroEstimate}
          onChange={e => setForm({ ...form, pomodoroEstimate: Number(e.target.value) })}
        />
      </div>

      <div className="actions">
        <button type="submit" className="primary">{form._id ? 'Update' : 'Create'}</button>
        {form._id && (
          <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
    </form>
  );
}
