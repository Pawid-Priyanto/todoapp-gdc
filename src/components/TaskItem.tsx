import React, { useState } from 'react';
import type { Task } from '../types';
import { useTasks } from '../context/TaskContext';
import { Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask, filter } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isToggleDisabled = filter === 'pending';

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`task-item ${task.completed ? 'completed' : ''}`}
      >
        <button 
          className="toggle-btn" 
          onClick={() => toggleTask(task.id)}
          disabled={isToggleDisabled}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          <div className={`checkbox ${task.completed ? 'checked' : ''} ${isToggleDisabled ? 'disabled' : ''}`}>
            {task.completed && <CheckCircle size={16} />}
          </div>
        </button>
        
        <div className="task-content">
          <span className="task-title">{task.title}</span>
          <span className={`task-badge ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        <button 
          className="delete-btn" 
          onClick={() => setIsModalOpen(true)}
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </motion.div>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteTask(task.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default TaskItem;
