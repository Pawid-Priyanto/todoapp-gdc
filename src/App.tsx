
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <main className="glass-card">
        <Header />
        <TaskForm />
        <FilterBar />
        <TaskList />
      </main>
      <footer className="author-footer">
        <p>Built with ❤️ by Your Candidate</p>
      </footer>
    </TaskProvider>
  );
}

export default App;
