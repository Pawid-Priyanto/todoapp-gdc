export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type FilterType = 'all' | 'completed' | 'pending';

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>;
}
