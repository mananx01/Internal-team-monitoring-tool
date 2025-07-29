import { createSlice } from '@reduxjs/toolkit';

const generateId = () => Math.random().toString(36).substr(2, 9);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      {
        id: '1',
        title: 'Complete Dashboard UI',
        assignedTo: 1,
        assignedBy: 'Team Lead',
        dueDate: '2025-08-15',
        progress: 60,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Review Code Documentation',
        assignedTo: 2,
        assignedBy: 'Team Lead',
        dueDate: '2025-08-10',
        progress: 30,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: generateId(),
        ...action.payload,
        progress: 0,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTaskProgress: (state, action) => {
      const { taskId, progress } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.progress = Math.max(0, Math.min(100, progress));
        task.completed = task.progress === 100;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    markTaskComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.progress = 100;
        task.completed = true;
      }
    },
  },
});

export const {
  addTask,
  updateTaskProgress,
  deleteTask,
  markTaskComplete,
} = tasksSlice.actions;

export default tasksSlice.reducer;