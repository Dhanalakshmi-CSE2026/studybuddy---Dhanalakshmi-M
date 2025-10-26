const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, default: 'General' },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  pomodoroEstimate: { type: Number, default: 1 }, // estimated pomodoro sessions
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  // small analytics: actual sessions done
  sessionsDone: { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', TaskSchema);
