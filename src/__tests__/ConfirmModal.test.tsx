import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../components/ConfirmModal';

describe('ConfirmModal', () => {
  it('renders title and message when open', () => {
    render(
      <ConfirmModal 
        isOpen={true} 
        onClose={() => {}} 
        onConfirm={() => {}} 
        title="Delete Test" 
        message="Are you sure?" 
      />
    );

    expect(screen.getByText('Delete Test')).toBeDefined();
    expect(screen.getByText('Are you sure?')).toBeDefined();
  });

  it('calls onConfirm and close when confirm button is clicked', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <ConfirmModal 
        isOpen={true} 
        onClose={onClose} 
        onConfirm={onConfirm} 
        title="Delete Test" 
        message="Are you sure?" 
      />
    );

    const confirmBtn = screen.getByText('Delete Task');
    fireEvent.click(confirmBtn);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = vi.fn();

    render(
      <ConfirmModal 
        isOpen={true} 
        onClose={onClose} 
        onConfirm={() => {}} 
        title="Delete Test" 
        message="Are you sure?" 
      />
    );

    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
