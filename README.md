# FocusFlow - Task Management App

A premium, high-performance Task Management application built with React, TypeScript, and Vite. Designed as a technical demonstration of modern front-end development best practices.

## 🚀 Features

- **Task Management**: Create, toggle, and delete tasks.
- **Delete Confirmation**: Custom animated modal to prevent accidental task deletion via React Portals.
- **Smart Pagination**: Efficiently managed list with navigation controls for larger task sets.
- **Dynamic Filtering**: Filter tasks by "All", "Pending", and "Completed" status.
- **Progress Tracking**: Real-time progress bar reflecting daily task completion.
- **Optimistic Updates**: Immediate UI feedback for status toggles and deletions, with automatic rollback on API failure.
- **Form Validation**: Clean input handling with comprehensive error messages.
- **Premium UI/UX**:
  - Advanced Glassmorphism design aesthetics.
  - Smooth micro-animations using **Framer Motion**.
  - Fully responsive layout (Mobile, Tablet, Desktop).
  - Vertical efficiency with compact task items and nested list scrolling.
  - Modern typography with Inter and Outfit Google Fonts.
- **API Integration**: Consumes JSONPlaceholder API with Axios.
- **Automated Testing**: Unit tests implemented with **Vitest** and **React Testing Library**.

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **State Management**: React Context API
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Testing**: Vitest & React Testing Library

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## 🏗️ Architecture

The project follows a clean, modular architecture:

- `src/components`: Presentational and container components with scoped styles.
- `src/context`: State management layer using the Context API to provide a single source of truth for tasks.
- `src/services`: API abstraction layer using Axios for clean data fetching.
- `src/types`: Centralized TypeScript interfaces for type safety across the app.
- `src/styles`: Global design tokens and base styles.

## 💙 Flutter-Inspired Patterns

For developers familiar with **Flutter**, you will notice familiar patterns:
- **Provider Pattern**: The `TaskProvider` (using React Context) works similarly to Flutter's `Provider`, offering a clean "Lifting State Up" approach for global access.
- **Component-as-Widget**: Components are highly modular and reusable, similar to Flutter's "Everything is a Widget" philosophy.
- **State Feedback**: Explicit handling of loading, empty, and error states mirrors the best practices often seen in high-quality Flutter apps.

## 🔗 API Endpoints (Mock)

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demonstration:
- `GET /todos`: Fetch initial tasks.
- `POST /todos`: Create a new task.
- `PATCH /todos/:id`: Update task status.
- `DELETE /todos/:id`: Remove a task.

---
Built with ❤️ for Technical Test.
