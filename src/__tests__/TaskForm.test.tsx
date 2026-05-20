import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { TaskProvider } from '../context/TaskContext';

// We wrap with TaskProvider to provide context
const renderWithProvider = () => {
  return render(
    <TaskProvider>
      <TaskForm />
    </TaskProvider>
  );
};

describe('TaskForm Validation', () => {
  it('shows error message when task title is empty', async () => {
    renderWithProvider();
    
    const submitBtn = screen.getByLabelText('Add task');
    fireEvent.click(submitBtn);

    const errorMsg = await screen.findByText('Task title cannot be empty');
    expect(errorMsg).toBeDefined();
    expect(errorMsg.getAttribute('role')).toBe('alert');
  });

  it('shows error message when task title is too short', async () => {
    renderWithProvider();
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const submitBtn = screen.getByLabelText('Add task');

    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.click(submitBtn);

    const errorMsg = await screen.findByText('Task title must be at least 3 characters');
    expect(errorMsg).toBeDefined();
  });

  it('clears error message when user starts typing', async () => {
    renderWithProvider();
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const submitBtn = screen.getByLabelText('Add task');

    // Trigger error
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Task title cannot be empty')).toBeDefined();

    // Start typing
    fireEvent.change(input, { target: { value: 'a' } });

    // Error should be gone
    expect(screen.queryByText('Task title cannot be empty')).toBeNull();
  });
});
