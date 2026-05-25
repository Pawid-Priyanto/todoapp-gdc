import React from 'react';
import { useTasks } from '../context/useTask';
import { ListTodo } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const { tasks } = useTasks();
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo">
          <div className="icon-bg">
            <ListTodo size={24} color="#fff" />
          </div>
          <h1>FocusFlow</h1>
        </div>
        <div className="stats">
          <span className="stats-label">Daily Progress</span>
          <span className="stats-value">{percentage}%</span>
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="header-info">
        <p>
          {completedCount === totalCount && totalCount > 0 
            ? "All caught up! 🎉" 
            : `You have ${totalCount - completedCount} tasks pending`}
        </p>
      </div>
    </header>
  );
};

export default Header;
