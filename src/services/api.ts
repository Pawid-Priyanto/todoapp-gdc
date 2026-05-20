import axios from 'axios';
import type { Task } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}?_limit=30`);
  return response.data;
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, {
    title,
    completed: false,
    userId: 1,
  });
  return response.data;
};

export const updateTaskStatus = async (id: number, completed: boolean): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}/${id}`, {
    completed,
  });
  return response.data;
};

export const deleteTaskRequest = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
