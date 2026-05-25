import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/useTask';
import TaskItem from './TaskItem';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './TaskList.css';

const ITEMS_PER_PAGE = 8;

const TaskList: React.FC = () => {
  const { tasks, loading, error, filter, refreshTasks } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Reset to page 1 when filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading && tasks.length === 0) {
    return (
      <div className="state-container">
        <Loader2 className="spinner" size={40} color="#6366f1" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="state-container">
        <AlertCircle size={40} color="#ef4444" />
        <p>{error}</p>
        <button className="retry-btn" onClick={refreshTasks}>Retry</button>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="state-container"
      >
        <div className="empty-icon-bg">
          <ClipboardList size={32} color="#64748b" />
        </div>
        <h3>No tasks found</h3>
        <p>You don't have any tasks in the "{filter}" category.</p>
      </motion.div>
    );
  }

  return (
    <div className="task-list-wrapper">
      <div className="task-list-container">
        <div className="task-list">
          <AnimatePresence mode="popLayout">
            {paginatedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pag-btn" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="pag-info">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          <button 
            className="pag-btn" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
