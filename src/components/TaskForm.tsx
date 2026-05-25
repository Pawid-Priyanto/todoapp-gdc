import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Plus, Loader2 } from 'lucide-react';
import './TaskForm.css';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setValidationError('Task title cannot be empty');
      return;
    }

    if (title.length < 3) {
      setValidationError('Task title must be at least 3 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationError(null);
      await addTask(title);
      setTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
      setValidationError('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationError) setValidationError(null);
          }}
          disabled={isSubmitting}
          aria-label="New task title"
        />
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
          aria-label="Add task"
        >
          {isSubmitting ? (
            <Loader2 className="spinner" size={20} />
          ) : (
            <Plus size={20} />
          )}
        </button>
      </div>
      {validationError && (
        <p className="error-text" role="alert">{validationError}</p>
      )}
    </form>
  );
};

export default TaskForm;
