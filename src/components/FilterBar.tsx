import React from 'react';
import { useTasks } from '../context/useTask';
import type { FilterType } from '../types';
import './FilterBar.css';

const FilterBar: React.FC = () => {
  const { filter, setFilter } = useTasks();

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
