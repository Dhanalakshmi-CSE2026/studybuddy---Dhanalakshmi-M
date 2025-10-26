import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ tasks }) {
  // Count tasks per subject
  const subjects = {};
  tasks.forEach(t => {
    const s = t.subject || 'General';
    subjects[s] = (subjects[s] || 0) + 1;
  });

  const labels = Object.keys(subjects);
  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks per Subject',
        data: labels.map(l => subjects[l]),
        backgroundColor: [
          '#4caf50',
          '#ff9800',
          '#2196f3',
          '#9c27b0',
          '#f44336',
          '#00bcd4',
        ],
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  // Progress stats
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <aside className="dashboard">
      <h3>📊 Dashboard</h3>

      <div className="stats">
        <div className="stat">
          <strong>{total}</strong>
          <span>Total Tasks</span>
        </div>
        <div className="stat">
          <strong>{completed}</strong>
          <span>Completed</span>
        </div>
        <div className="stat">
          <strong>{progress}%</strong>
          <span>Progress</span>
        </div>
      </div>

      <div className="chart">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: 'easeOutQuart',
            },
            plugins: {
              title: { display: true, text: 'Tasks by Subject', font: { size: 16 } },
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
            },
          }}
        />
      </div>
    </aside>
  );
}
