import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';
import { TaskProvider } from '../context/TaskContext';
import {  useTasks } from '../context/useTask';

// Mock the context or use the provider
const TestComponent = () => {
  const { filter } = useTasks();
  return <div data-testid="current-filter">{filter}</div>;
};

describe('FilterBar', () => {
  it('changes filter when buttons are clicked', () => {
    render(
      <TaskProvider>
        <FilterBar />
        <TestComponent />
      </TaskProvider>
    );

    const pendingBtn = screen.getByText('Pending');
    fireEvent.click(pendingBtn);

    expect(screen.getByTestId('current-filter').textContent).toBe('pending');

    const completedBtn = screen.getByText('Completed');
    fireEvent.click(completedBtn);

    expect(screen.getByTestId('current-filter').textContent).toBe('completed');
  });
});
