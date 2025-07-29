// /src/redux/slices/membersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const res = await axios.get('https://randomuser.me/api/?results=5');
  return res.data.results.map((user, index) => ({
    id: user.login.uuid || index,
    name: `${user.name.first} ${user.name.last}`,
    status: 'Offline',
    lastActive: Date.now(),
    tasks: [],
  }));
});

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { id, status } = action.payload;
      const member = state.list.find(m => m.id === id);
      if (member) {
        member.status = status;
        member.lastActive = Date.now(); // for inactivity tracking
      }
    },
    autoSetOffline: (state) => {
      const now = Date.now();
      state.list.forEach(member => {
        if (now - member.lastActive > 10 * 60 * 1000) {
          member.status = 'Offline';
        }
      });
    },
    incrementTaskProgress: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.list.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task && task.progress < 100) {
          task.progress += 10;
          if (task.progress >= 100) {
            task.completed = true;
          }
        }
      }
    },
    decrementTaskProgress: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.list.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task && task.progress > 0) {
          task.progress -= 10;
          if (task.progress < 100) {
            task.completed = false;
          }
        }
      }
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.list.find(m => m.id === memberId);
      if (member) {
        member.tasks.push(task);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { 
  updateMemberStatus, 
  autoSetOffline, 
  assignTask,
  incrementTaskProgress,
  decrementTaskProgress 
} = membersSlice.actions;
export default membersSlice.reducer;
