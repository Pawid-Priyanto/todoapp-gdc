import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../context/useTask';

vi.mock('../context/useTask', () => ({
  useTasks: vi.fn(),
}));

const mockTask = {
  id: 1,
  title: 'Test Task',
  completed: false,
  userId: 1,
};

describe('TaskItem', () => {
  it('disables the toggle button when filter is pending', () => {
    vi.mocked(useTasks).mockReturnValue({
      tasks: [mockTask],
      loading: false,
      error: null,
      filter: 'pending',
      setFilter: vi.fn(),
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      deleteTask: vi.fn(),
      refreshTasks: vi.fn(),
    });

    render(<TaskItem task={mockTask} />);

    const toggleBtn = screen.getByLabelText('Mark as completed');
    expect(toggleBtn).toBeDisabled();
    
    // Check that checkbox div has the disabled class
    const checkbox = toggleBtn.querySelector('.checkbox');
    expect(checkbox?.className).toContain('disabled');
  });

  it('enables the toggle button when filter is not pending (e.g., all)', () => {
    vi.mocked(useTasks).mockReturnValue({
      tasks: [mockTask],
      loading: false,
      error: null,
      filter: 'all',
      setFilter: vi.fn(),
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      deleteTask: vi.fn(),
      refreshTasks: vi.fn(),
    });

    render(<TaskItem task={mockTask} />);

    const toggleBtn = screen.getByLabelText('Mark as completed');
    expect(toggleBtn).not.toBeDisabled();

    const checkbox = toggleBtn.querySelector('.checkbox');
    expect(checkbox?.className).not.toContain('disabled');
  });
});
