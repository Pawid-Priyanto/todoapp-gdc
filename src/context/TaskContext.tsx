import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Task, FilterType, TaskContextType } from '../types';
import * as api from '../services/api';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const addTask = async (title: string) => {
    try {
      // Simulate API call and update local state
      const newTask = await api.createTask(title);
      // JSONPlaceholder always returns id 201 for new items, 
      // so we use timestamp for unique local id if needed
      const taskWithActualId = { ...newTask, id: Date.now() };
      setTasks((prev) => [taskWithActualId, ...prev]);
    } catch (err) {
      setError('Failed to add task.');
      throw err;
    }
  };

  const toggleTask = async (id: number) => {
    const taskToToggle = tasks.find((t) => t.id === id);
    if (!taskToToggle) return;

    if (filter === 'pending' && !taskToToggle.completed) {
      return;
    }

    try {
      // Optimistic Update
      const originalTasks = [...tasks];
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );

      try {
        await api.updateTaskStatus(id, !taskToToggle.completed);
      } catch (err) {
        // Rollback on failure
        console.error('Error updating task status:', err);
        setTasks(originalTasks);
        setError('Failed to update task status.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      // Optimistic Update
      const originalTasks = [...tasks];
      setTasks((prev) => prev.filter((t) => t.id !== id));

      try {
        await api.deleteTaskRequest(id);
      } catch (err) {
        // Rollback
        console.error('Error deleting task:', err);
        setTasks(originalTasks);
        setError('Failed to delete task.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filter,
        setFilter,
        addTask,
        toggleTask,
        deleteTask,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
