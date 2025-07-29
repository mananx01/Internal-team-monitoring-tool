// /src/redux/slices/roleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'Team Lead',
    currentUser: 'NA', // you can change this later
  },
  reducers: {
    switchRole: (state) => {
      state.currentRole = state.currentRole === 'Team Lead' ? 'Team Member' : 'Team Lead';
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;
