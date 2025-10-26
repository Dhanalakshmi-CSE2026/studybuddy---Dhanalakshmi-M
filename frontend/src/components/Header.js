import React from 'react';
import './Header.css';

export default function Header({ coins = 0 }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>StudyBuddy</h1>
        <p className="sub">Plan your study, estimate Pomodoro sessions, and track progress.</p>
      </div>
      <div className="header-right">
        <div className="coins">
          🏅 <span>{coins}</span> Coins
        </div>
      </div>
    </header>
  );
}
